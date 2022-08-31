(() => ({
  name: 'DataCount',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['DATATABLE_COLUMN'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      env,
      getProperty,
      useAllQuery,
      useFilter,
      useRelation,
      useText,
    } = B;
    const { Typography } = window.MaterialUI.Core;
    const isDev = env === 'dev';
    const {
      model,
      filter,
      searchProperty,
      showError,
      dataComponentAttribute,
    } = options;
    const displayError = showError === 'built-in';
    const [page, setPage] = useState(0);

    const skipAppend = useRef(false);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [interactionSearchTerm, setInteractionSearchTerm] = useState('');
    const [interactionSearchProperty, setInteractionSearchProperty] =
      useState('');
    const [previousInteractionSearchTerm, setPreviousInteractionSearchTerm] =
      useState('');
    const [
      previousInteractionSearchProperty,
      setPreviousInteractionSearchProperty,
    ] = useState('');

    const [interactionFilter, setInteractionFilter] = useState({});

    const { label: searchPropertyLabel = '{property}', kind } =
      getProperty(searchProperty) || {};

    const [results, setResults] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [newSearch, setNewSearch] = useState(false);
    const fetchingNextSet = useRef(false);
    const history = isDev ? null : useHistory();

    const toolbarRef = React.createRef();
    const paginationRef = React.createRef();
    const [stylesProps, setStylesProps] = useState(null);

    const deepMerge = (...objects) => {
      const isObject = (item) =>
        item && typeof item === 'object' && !Array.isArray(item);

      return objects.reduce((accumulator, object) => {
        Object.keys(object).forEach((key) => {
          const accumulatorValue = accumulator[key];
          const value = object[key];

          if (Array.isArray(accumulatorValue) && Array.isArray(value)) {
            accumulator[key] = accumulatorValue.concat(value);
          } else if (isObject(accumulatorValue) && isObject(value)) {
            accumulator[key] = deepMerge(accumulatorValue, value);
          } else {
            accumulator[key] = value;
          }
        });
        return accumulator;
      }, {});
    };

    let path = [searchProperty].flat();
    if (typeof searchProperty.id !== 'undefined') {
      path = [searchProperty.id].flat();
    }

    const transformValue = (value) => {
      if (value instanceof Date) {
        return value.toISOString();
      }

      return value;
    };

    /**
     * @name Filter
     * @param {Property} property
     * @returns {Void}
     */
    B.defineFunction('Filter', ({ event, property, interactionId }) => {
      if (typeof event === 'undefined') return;
      setInteractionFilter({
        ...interactionFilter,
        [interactionId]: {
          property,
          value: event.target ? event.target.value : transformValue(event),
        },
      });
      setInteractionSearchTerm(
        event.target ? event.target.value : transformValue(event),
      );
      setInteractionSearchProperty(property ? property.id : '');
      setPage(0);
    });

    B.defineFunction('ResetFilter', () => {
      setInteractionFilter({});
      setInteractionSearchTerm('');
      setInteractionSearchProperty('');
      setPage(0);
    });

    let interactionFilters = {};

    const isEmptyValue = (value) =>
      !value || (Array.isArray(value) && value.length === 0);

    const clauses = Object.entries(interactionFilter)
      .filter(([, { value }]) => !isEmptyValue(value))
      .map(([, { property, value }]) =>
        property.id.reduceRight((acc, field, index, arr) => {
          const isLast = index === arr.length - 1;
          if (isLast) {
            return Array.isArray(value)
              ? {
                  _or: value.map((el) => ({
                    [field]: { [property.operator]: el },
                  })),
                }
              : { [field]: { [property.operator]: value } };
          }

          return { [field]: acc };
        }, {}),
      );

    interactionFilters =
      clauses.length > 1 ? { _and: clauses } : clauses[0] || {};

    const searchOperator =
      kind === 'serial' || kind === 'integer' ? 'eq' : 'matches';

    const searchFilter = searchProperty
      ? path.reduceRight(
          (acc, property, index) =>
            index === path.length - 1
              ? { [property]: { [searchOperator]: searchTerm } }
              : { [property]: acc },
          {},
        )
      : {};

    const newFilter =
      searchProperty && searchTerm !== ''
        ? deepMerge(filter, searchFilter)
        : filter;

    const completeFilter = deepMerge(newFilter, interactionFilters);

    const where = useFilter(completeFilter);

    // TODO: move model to skip
    const {
      loading: queryLoading,
      error,
      data: queryData,
      refetch,
    } = useAllQuery(
      model,
      {
        rawFilter: where,
        onCompleted(res) {
          const hasResult = res && res.results && res.results.length > 0;
          if (hasResult) {
            B.triggerEvent('onSuccess', res.results);
          } else {
            B.triggerEvent('onNoResults');
          }
        },
        onError(err) {
          if (!displayError) {
            B.triggerEvent('onError', err);
          }
        },
      },
      !model,
    );

    const { hasResults, data: relationData } = useRelation(
      model,
      {},
      typeof model === 'string' || !model,
    );
    const data = hasResults ? relationData : queryData;
    const loading = hasResults ? false : queryLoading;

    useEffect(() => {
      if (!isDev && data) {
        if (
          searchTerm !== previousSearchTerm ||
          interactionSearchTerm !== previousInteractionSearchTerm ||
          interactionSearchProperty !== previousInteractionSearchProperty
        ) {
          setSkip(0);
          setPreviousSearchTerm(searchTerm);
          setPreviousInteractionSearchTerm(interactionSearchTerm);
          setPreviousInteractionSearchProperty(interactionSearchProperty);
          setNewSearch(true);
        } else {
          fetchingNextSet.current = false;
          setNewSearch(false);
        }
        skipAppend.current = false;
        setTotalCount(data.totalCount);
      }
    }, [data, searchTerm, interactionSearchTerm, interactionSearchProperty]);

    useEffect(() => {
      const handler = setTimeout(() => {
        setSearchTerm(search);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [search]);

    function clearResults() {
      setTimeout(() => {
        setSkip(0);
      }, 0);
    }

    B.defineFunction('Refetch', () => {
      refetch();
    });

    const mounted = useRef(false);

    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    useEffect(() => {
      if (mounted.current && loading) {
        B.triggerEvent('onLoad', loading);
      }
    }, [loading]);

    const isRelation = !isDev && typeof model !== 'string';

    return (
      <div
        className={classes.root}
        data-component={useText(dataComponentAttribute) || 'DataTable'}
      >
        <Typography variant="caption" display="block" gutterBottom>
          {totalCount}
        </Typography>
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
      },
      '@keyframes loading': {
        to: {
          backgroundPositionX: '-150%',
        },
      },
      [`@media ${mediaMinWidth(600)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${mediaMinWidth(960)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${mediaMinWidth(1280)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
