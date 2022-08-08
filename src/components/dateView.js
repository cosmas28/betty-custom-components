(() => ({
  name: 'Date view',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { value, useInnerHtml, dataComponentAttribute, dateFormat } = options;
    const { env, useText } = B;
    const { DateFnsUtils } = window.MaterialUI;
    const DateFns = new DateFnsUtils();
    const isEmpty = value === '' || value.length === 0;
    const isDev = env === 'dev';
    const isPristine = isEmpty && isDev;

    const isValidDate = (date) => date instanceof Date && !isNaN(date);
    const VALID_DATE_FORMATS = ['MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd'];
    const isValidDateFormat = (format) => VALID_DATE_FORMATS.includes(format)

    const [selectedDate, setSelectedDate] = useState(null);

    const Tag = useInnerHtml
      ? 'div'
      : {
          Title1: 'h1',
          Title2: 'h2',
          Title3: 'h3',
          Title4: 'h4',
          Title5: 'h5',
          Title6: 'h6',
          Body1: 'p',
          Body2: 'p',
        }[options.type || 'Body1'];

    const parsedValue = useText(value);

    useEffect(() => {
      if (parsedValue) {
        setSelectedDate(parsedValue);
      }
    }, [parsedValue]);

    const parsedDateFormat = useText(dateFormat);
    const convertedDate = new Date(selectedDate);
    const formattedDate = isValidDate(convertedDate)
      ? DateFns.format(
          convertedDate || new Date(),
          isValidDateFormat(parsedDateFormat) ? parsedDateFormat : 'MM/dd/yyyy',
        )
      : parsedValue;

    return useInnerHtml && !isDev ? (
      <Tag
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: parsedValue }}
        data-component={useText(dataComponentAttribute) || 'Text'}
      />
    ) : (
      <Tag
        className={classes.content}
        data-component={useText(dataComponentAttribute) || 'Text'}
      >
        {!isEmpty && formattedDate}
        {isPristine && (
          <span className={classes.placeholder}>Empty content</span>
        )}
      </Tag>
    );
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
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
      content: {
        display: 'block',
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
        whiteSpace: 'pre-wrap',
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
        [`@media ${mediaMinWidth(600)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Portrait'),
        },
        [`@media ${mediaMinWidth(960)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Landscape'),
        },
        [`@media ${mediaMinWidth(1280)}`]: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
          fontSize: ({ options: { type } }) =>
            style.getFontSize(type, 'Desktop'),
        },
      },
      link: {
        textDecoration: ['none', '!important'],
        color: ['inherit', '!important'],
      },
      placeholder: {
        color: '#dadde4',
      },
    };
  },
}))();
