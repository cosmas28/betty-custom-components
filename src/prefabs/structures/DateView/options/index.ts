import {
  font,
  option,
  sizes,
  variable,
  toggle,
  showIfTrue,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';
import { styles } from './styles';

export const options = {
  value: variable('Date', { value: [], configuration: { as: 'MULTILINE' }, }),

  dateFormat: variable('Date format', {
    value: [],
  }),

  useInnerHtml: toggle('Display Rich Text', {
    value: false,
    configuration: {
      condition: showIfTrue('useInnerHtml'),
    },
  }),
  type: font('Font', { value: ['Title2'] }),
  textAlignment: option('CUSTOM', {
    label: 'Text Alignment',
    value: 'left',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Left', value: 'left' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'right' },
      ],
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),

  ...styles,

  ...advanced,
};
