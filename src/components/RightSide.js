(() => ({
  name: 'RightSide',
  type: 'LAYOUT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText, Icon } = B;
    const { Box, IconButton, Menu, MenuItem } = window.MaterialUI.Core;
    const {
      alignment,
      valignment,
      transparent,
      dataComponentAttribute,
    } = options;
    const isDev = env === 'dev';

    const isEmpty = isDev && children.length === 0;
    const isPristine =
      isEmpty
    const isFlex = alignment !== 'none' || valignment !== 'none';
    const opac = transparent ? 0 : 1;
    const [opacity, setOpacity] = useState(opac);
    const [interactionBackground, setInteractionBackground] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = !!anchorEl;

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      B.defineFunction('setCustomBackgroundImage', (url) => {
        setInteractionBackground(`url("${url}")`);
      });

      B.defineFunction('removeCustomBackgroundImage', () => {
        setInteractionBackground('');
      });
    }, []);

    const boxOptions = {
      display: isFlex && 'flex',
      justifyContent: alignment !== 'none' && alignment,
      flexDirection: isFlex && 'row',
      alignItems: valignment !== 'none' && valignment,
      'data-component': useText(dataComponentAttribute) || 'Box',
    };

    const handleClick = () => {
      B.triggerEvent('OnClick');
    };

    const handleMouseEnter = () => {
      B.triggerEvent('OnMouseEnter');
    };

    const handleMouseLeave = () => {
      B.triggerEvent('OnMouseLeave');
    };

    const BoxCmp = (
      <Box
        className={[
          classes.root,
          isEmpty ? classes.empty : '',
          isPristine ? classes.pristine : '',
        ].join(' ')}
        {...boxOptions}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          interactionBackground
            ? {
                backgroundImage: interactionBackground,
                opacity,
              }
            : { opacity }
        }
      >
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
      </Box>
    );

    useEffect(() => {
      if (isDev) {
        setOpacity(transparent ? 0 : 1);
      }
    }, [isDev, transparent]);

    B.defineFunction('ToOpaque', () => setOpacity(1));
    B.defineFunction('ToSemiTransparent', () => setOpacity(0.5));
    B.defineFunction('ToTransparent', () => setOpacity(0));

    return isDev ? <div className={classes.wrapper}>{BoxCmp}</div> : BoxCmp;
  })(),
  styles: (B) => (theme) => {
    const { mediaMinWidth, Styling, color: env } = B;
    const isDev = env === 'dev';
    const style = new Styling(theme);

    return {
      wrapper: {
        display: 'flex',
        minHeight: 0,
        flexBasis: 'auto',
        flexDirection: 'row',
        alignContent: 'stretch',
        boxSizing: 'border-box',
				minWidth: '30%',
      },
      root: {
        boxSizing: 'border-box',
        height: isDev ? '100%' : 'auto',
        minHeight: 0,
        transition: 'opacity 0.5s ease-out',
        width: '20%',
        justifyContent: 'flex-end',
        [`@media ${mediaMinWidth(600)}`]: {
          width: '100%',
        },
      },
      empty: {
        display: ['flex', '!important'],
        justifyContent: ['center', '!important'],
        alignItems: 'center',
        height: ['2.5rem', '!important'],
        fontSize: '0.75rem',
        color: '#262A3A',
        textTransform: 'uppercase',
      },
      pristine: {
        borderWidth: '0.0625rem',
        borderColor: '#AFB5C8',
        borderStyle: 'dashed',
        backgroundColor: '#F0F1F5',
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
          display: 'flex',
        },
      },
    };
  },
}))();
