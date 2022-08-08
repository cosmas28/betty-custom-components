(() => ({
	name: 'Row',
	type: 'BODY_COMPONENT',
	allowedTypes: ['LAYOUT_COMPONENT'],
	orientation: 'HORIZONTAL',
	jsx: (
		<div className={classes.container}>
			{
				(() => {
					const { env, useText } = B;
					// const { dataComponentAttribute } = options;
					const isDev = env === 'dev';
					const isEmpty = children.length === 0;
					const isPristine = isEmpty && isDev;

					return (
						<section
							className={[
								classes.row,
								isEmpty ? classes.empty : '',
								isPristine ? classes.pristine : '',
							].join(' ')}
							// data-component={useText(dataComponentAttribute) || 'Row'}
						>
							{isPristine ? 'Row' : children}
						</section>
					)
				})()
			}
		</div>
	),
	styles: B => theme => {
		const style = new B.Styling(theme);
		// const { mediaMinWidth, Styling } = B;
		const width = {
			Full: '100%',
			XL: '1200px',
			L: '960px',
			M: '720px',
			S: '540px',
		};

		// const getSpacing = (idx, device = 'Mobile') => idx === '0' ? '0rem' : style.getSpacing(idx, device);

		return {
			container: {
				width: '100%',
				height: ({ options: { rowHeight }}) => rowHeight || 'auto',
				maxWidh: ({ options: { maxRowWidth }}) => width[maxRowWidth],
				backgroundColor: ({ options: { backgroundColor }}) => backgroundColor === 'transparent' ? 'transparent' : style.getColor(backgroundColor),
			},
			row: {
				display: 'flex',
				height: '100%',
				flexWrap: 'wrap',
				justifyContent: 'flex-start',
				boxSizing: 'border-box',
			},
			empty: {
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: ({ options: { rowHeight }}) => (rowHeight ? 0 : '4rem'),
				height: '100%',
				fontSize: '0.75rem',
				color: '#262A3A',
				textTransform: 'uppercase',
			},
			pristine: {
				borderWidth: '0.0625rem',
				borderColor: '#AFB5C8',
				borderStyle: 'dashed',
				backgroundColor: '#F0F1F5',
			}
		};
	},
}))();
