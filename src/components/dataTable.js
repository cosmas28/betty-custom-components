(() => ({
  name: 'DataCount',
  type: 'CONTENT_COMPONENT',
  allowedTypes: ['DATATABLE_COLUMN'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      env,
      useAllQuery,
      useFilter,
      useRelation,
      useText,
    } = B;
    const isDev = env === 'dev';
    const {
      model,
      filter,
      showError,
      dataComponentAttribute,
    } = options;
    const displayError = showError === 'built-in';

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

    const [totalCount, setTotalCount] = useState(0);
    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const fetchingNextSet = useRef(false);

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
    });

    B.defineFunction('ResetFilter', () => {
      setInteractionFilter({});
      setInteractionSearchTerm('');
      setInteractionSearchProperty('');
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

    const newFilter = filter;

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
        } else {
          fetchingNextSet.current = false;
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

    return (
      <div
        className={classes.root}
        data-component={useText(dataComponentAttribute) || 'DataCount'}
      >
        {totalCount}
      </div>
    );
  })(),
  styles: (B) => (theme) => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    const getPath = (path, data) =>
      path.reduce((acc, next) => {
        if (acc === undefined || acc[next] === undefined) {
          return undefined;
        }
        return acc[next];
      }, data);

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
        textAlign: ({ options: { textAlignment } }) => textAlignment,
        padding: 0,
        color: ({ options: { textColor, type, styles } }) =>
          styles
            ? style.getColor(textColor)
            : getPath(['theme', 'typography', type, 'color'], style),
        fontFamily: ({ options: { type } }) => style.getFontFamily(type),
        fontSize: ({ options: { type } }) => style.getFontSize(type),
        fontWeight: ({ options: { fontWeight, type, styles } }) =>
          styles
            ? fontWeight
            : getPath(['theme', 'typography', type, 'fontWeight'], style),
        textTransform: ({ options: { type } }) => style.getTextTransform(type),
        letterSpacing: ({ options: { type } }) => style.getLetterSpacing(type),
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
