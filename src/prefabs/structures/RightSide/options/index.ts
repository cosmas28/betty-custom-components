import {
  buttongroup,
} from '@betty-blocks/component-sdk';
import { advanced } from './advanced';

export const options = {
  alignment: buttongroup(
    'Alignment',
    [
      ['None', 'none'],
      ['Left', 'flex-start'],
      ['Center', 'center'],
      ['Right', 'flex-end'],
      ['Justified', 'space-between'],
    ],
    {
      value: 'none',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  valignment: buttongroup(
    'Vertical alignment',
    [
      ['None', 'none'],
      ['Top', 'flex-start'],
      ['Center', 'center'],
      ['Bottom', 'flex-end'],
    ],
    {
      value: 'center',
      configuration: {
        dataType: 'string',
      },
    },
  ),

  ...advanced,
};
