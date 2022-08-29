import { Icon, prefab, variable, font, ThemeColor } from '@betty-blocks/component-sdk';
import { navBar } from './structures/NavBar';
import { OpenPageButton } from './structures/OpenPage';
import { options } from './structures/OpenPage/options';
import { LeftSide } from './structures/LeftSide';
import { RightSide } from './structures/RightSide';
import { Text } from './structures/Text';
import { options as textOptions } from './structures/Text/options';

const attr = {
  icon: Icon.NavbarIcon,
  category: 'NAVIGATION',
  keywords: ['Navigation', 'bar', 'navigationbar', 'menu', 'navbar', 'appbar'],
};

const optionsA = { ...options };
const optionsB = { ...options };
optionsA.buttonText = variable('Button text', { value: ['Menu 1'] });
optionsB.buttonText = variable('Button text', { value: ['Menu 2'] });

const textCustomOptions = { ...textOptions }
textCustomOptions.type = font('Font', { value: ['Title4'] })
textCustomOptions.content = variable('Content', { value: ['The Third Floor Inc.'] })


export default prefab('TTF Navigation Bar', attr, undefined, [
  navBar({}, [
    LeftSide({}, [
      Text({ options: textCustomOptions, style: { overwrite: { color: { value: ThemeColor.WHITE, type: 'Color' }} } })
    ]),
    RightSide({}, [
      OpenPageButton({
        options: optionsA,
        style: {
          overwrite: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: '400',
          },
        },
      }),
      OpenPageButton({
        options: optionsB,
        style: {
          overwrite: {
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: '400',
          },
        },
      }),
    ])
  ]),
]);
