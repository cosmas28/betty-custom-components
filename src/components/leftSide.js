(() => ({
  name: 'LeftSide',
  type: 'LAYOUT_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, useText } = B;
    const { Box } = window.MaterialUI.Core;
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
        {isEmpty ? 'Right side' : children}
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
    const { color: env } = B;
    const isDev = env === 'dev';

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
        width: '100%',
        justifyContent: 'flex-start',
        color: 'white'
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
    };
  },
}))();
