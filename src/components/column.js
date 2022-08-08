(() => ({
	name: 'Column',
	type: 'LAYOUT_COMPONENT',
	allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
	orientation: 'VERTICAL',
	jsx: (() => {
		const { visible } = options
		const {env } = B
		const isDev = env === 'dev'
		const isEmpty = children.length === 0;
		const isPristine = isEmpty && isDev
		const [isVisible, setIsVisible] = useState(true);
		useEffect(() => {
			setIsVisible(visible)
		}, [])

		useEffect(() => {
			B.defineFunction('Hide', () => setIsVisible(false));
			B.defineFunction('Show', () => setIsVisible(true));
			B.defineFunction('Show/Hide', () => setIsVisible((s) => !s))
		}, [])
		
		return (
			<div className={[
				classes.column,
				isVisible || isDev ? '' : classes.hide,
			].join(' ')}>
				{(() => children.length !== 0 ? (
					children
				) : (
					<div className={[
						isEmpty ? classes.empty : '',
						isPristine ? classes.pristine : '',
					].join(' ')}>
						{isPristine ? 'Column' : ''}
					</div>
				))()}
			</div>
		)
	})(),
	styles: B => theme => {
		const { env } = B
		const isDev = env === 'dev'
		const style = new B.Styling(theme);
		const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

		return {
			column: {
				display: ({ options: {
						columnWidthMobile,
						horizontalAlignment,
						verticalAlignment, 
					},
				}) => {
					if (columnWidthMobile === 'hidden') {
						return 'none';
					}

					return horizontalAlignment === 'inherit' && verticalAlignment === 'inherit' ? 'block' : 'flex';
				},
				justifyContent: ({ options: { verticalAlignment }}) => verticalAlignment,
				alignItems: ({ options: { horizontalAlignment }}) => horizontalAlignment,
				flexGrow: ({ options: { columnWidthMobile }}) => columnWidthMobile === 'flexible' ? 1 : 0,
				flexShrink: ({ options: { columnWidthMobile  }}) => columnWidthMobile === 'flexible' || columnWidthMobile === 'fitContent'
					? 1
					: 0,
				flexBasis: ({ options: { columnWidthMobile, outerSpacing }}) => {
					if (
						columnWidthMobile === 'flexible' ||
						columnWidthMobile === 'fitContent'
					) {
						return 'auto'
					}

					const marginRight = getSpacing(outerSpacing[1]);
          const marginLeft = getSpacing(outerSpacing[3]);

          return `calc(${
            (columnWidthMobile / 12) * 100
          }% - ${marginRight} - ${marginLeft})`;
				},
				flexDirection: 'column',
				backgroundColor: ({ options: { backgroundColor }}) =>
					backgroundColor === 'transparent'
						? 'transparent'
						: style.getColor(backgroundColor),
				backgroundImage: 'none',
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderWidth: 0,
        borderColor: 'transparent',
        borderStyle: 'none',
        borderRadius: 0,
        overflow: isDev ? 'unset' : 'auto',
        boxSizing: 'border-box',
				maxWidth: '100%',
				marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
				marginRight: ({ options: { outerSpacing } }) =>
					getSpacing(outerSpacing[1], 'Portrait'),
				marginBottom: ({ options: { outerSpacing } }) =>
					getSpacing(outerSpacing[2], 'Portrait'),
				marginLeft: ({ options: { outerSpacing } }) =>
					getSpacing(outerSpacing[3], 'Portrait'),
				paddingTop: ({ options: { innerSpacing } }) =>
					getSpacing(innerSpacing[0], 'Portrait'),
				paddingRight: ({ options: { innerSpacing } }) =>
					getSpacing(innerSpacing[1], 'Portrait'),
				paddingBottom: ({ options: { innerSpacing } }) =>
					getSpacing(innerSpacing[2], 'Portrait'),
				paddingLeft: ({ options: { innerSpacing } }) =>
					getSpacing(innerSpacing[3], 'Portrait'),
			},
			empty: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '4rem',
        height: '100%',
        width: '100%',
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
			},
			pristine: {
				borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
			},
			hide: {
        display: 'none !important',
      },
		};
	},
}))();
