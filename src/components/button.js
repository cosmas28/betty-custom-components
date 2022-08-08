(() => ({
	name: 'Button',
	type: 'CONTENT_COMPONENT',
	allowedTypes: [],
	orientation: 'VERTICAL',
	jsx: (() => {
		const { env, useText } = B
		const isDev = env === 'dev';
		const { buttonText, visible } = options;
		const buttonContent = useText(buttonText)
		const [isVisible, setIsVisible] = useState(visible)

		useEffect(() => {
			setIsVisible(visible)
		}, [visible])

		const ButtonContent = (
			<div className={classes.root}>
				<span className={classes.innerRoot}>
					{buttonContent !== '' ? buttonContent : null}
				</span>
			</div>
		)

		return <div className={classes.wrapper}>{ButtonContent}</div>;
	})(),
	styles: B => theme => {
		const style = new B.Styling(theme);
		return {
			wrapper: {
				display: ({ options: { fullWidth }}) => fullWidth ? 'flex' : 'inline-block',
				minHeight: '1rem',
				'& > *': {
					pointerEvents: 'none',
				}
			},
			root: ({ style }) => ({
				...style,
				boxSizing: 'border-box',
				display: 'flex',
				width: '100%',
				cursor: 'pointer',
				justifyContent: 'center',
				alignItems: 'center',

				'&:hover': {
					filter: 'brightness(90%)',
				},
				'&:active, &:focus': {
					filter: 'brightness(85%)',
					outline: 'none',
				}
			}),
			innerRoot: {
				display: 'flex',
				alignItems: 'center',
				minHeight: '1.25rem',
			}
		};
	},
}))();
