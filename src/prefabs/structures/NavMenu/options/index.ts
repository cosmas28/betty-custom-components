import {
  color,
  ThemeColor,
  size,
  option,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  backgroundColor: color('Background color', { value: ThemeColor.PRIMARY }),
  toolbarVariant: option('CUSTOM', {
    label: 'Size',
    value: 'regular',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        {
          name: 'Regular',
          value: 'regular',
        },
        {
          name: 'Dense',
          value: 'dense',
        },
      ],
    },
  }),

  ...advanced,
};
