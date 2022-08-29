(() => ({
  name: 'NavBar',
  type: 'BODY_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { AppBar, Toolbar } =
      window.MaterialUI.Core;
    const {
      position,
      appBarVariant,
      toolbarVariant,
      square,
      elevation,
      dataComponentAttribute,
    } = options;
    const { env, useText } = B;
    const isDev = env === 'dev';
		const isEmpty = children.length === 0;
		const isPristine = isEmpty && isDev;

    const AppBarComponent = (
      <AppBar
        position={isDev ? 'static' : position}
        classes={{ root: classes.root }}
        variant={appBarVariant}
        square={square}
        elevation={appBarVariant === 'flat' ? 0 : elevation}
        data-component={useText(dataComponentAttribute) || 'AppBar'}
      >
				<section
					className={[
						classes.row,
						isEmpty ? classes.empty : '',
						isPristine ? classes.pristine : '',
					].join(' ')}
					data-component={useText(dataComponentAttribute) || 'Row'}
				>
					{isPristine ? 'Navigation bar warpper' : children}
				</section>
      </AppBar>
    );

    return isDev ? <div>{AppBarComponent}</div> : AppBarComponent;
  })(),
  styles: (B) => (t) => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
				width: '100%',
        height: ({ options: { height } }) => height,
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
        zIndex: '1201 !important',
      },
			row: {
        display: 'flex',
        height: '100%',
				maxWidth: '100%',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: '10px',
      },
      toolbar: {
				width: '100%',
        flexDirection: ({ options: { alignItems } }) =>
          alignItems === 'right' ? 'row' : 'row-reverse',
      },
    };
  },
}))();
