(() => ({
  name: 'NavMenu',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { IconButton, Menu, MenuItem, Toolbar } = window.MaterialUI.Core;
    const {
      toolbarVariant,
    } = options;
    const { env, Icon } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const isPristine = isEmpty && isDev;
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = !!anchorEl;

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const AppBarComponent = (
      <Toolbar variant={toolbarVariant} classes={{ root: classes.toolbar }}>
        <div className={classes.spacer} />
				{!isDev && !!children.length ? (
					<>
						<div className={classes.collapsed}>
							<IconButton color="inherit" onClick={handleMenu}>
								<Icon name="Menu" />
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={isOpen}
								keepMounted
								onClose={handleClose}
								classes={{ paper: classes.paper }}
							>
								{React.Children.map(children, (child) => (
									<MenuItem
										className={classes.menuItem}
										onTouchEnd={handleClose}
									>
										{child}
									</MenuItem>
								))}
							</Menu>
						</div>
						<div className={classes.uncollapsed}>{children}</div>
					</>
				) : (
					<div>
            {children}
          </div>
				)}
			</Toolbar>
    );

    return isDev ? <div>{AppBarComponent}</div> : AppBarComponent;
  })(),
  styles: (B) => (t) => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    return {
      container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '100%',
      },
      spacer: {
        flexGrow: 1,
      },
      paper: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
        [`@media ${mediaMinWidth(600)}`]: {
          display: 'none',
        },
      },
      toolbar: {
        flexDirection: 'row',
      },
      menuItem: {
        '& .MuiButtonBase-root > .MuiTouchRipple-root': {
          display: 'none !important',
        },
      },
      collapsed: {
        display: 'block',
        [`@media ${mediaMinWidth(600)}`]: {
          display: 'none',
        },
      },
      uncollapsed: {
        display: 'none',
        [`@media ${mediaMinWidth(600)}`]: {
          display: 'block',
        },
      },
      empty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: ({ options: { columnHeight } }) =>
          columnHeight ? 0 : '4rem',
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
    };
  },
}))();
