import { prefab, Icon, toggle, font } from '@betty-blocks/component-sdk';
import { Text } from './structures/DateView';
import { options as baseOptions } from './structures/DateView/options';

const attr = {
  icon: Icon.TextInputIcon,
  category: 'CONTENT',
  keywords: ['Content', 'text', 'type', 'typography', 'body', 'paragraph'],
};

const options = { ...baseOptions };
options.type = font('Font', { value: ['Body1'] });
options.useInnerHtml = toggle('Display Rich Text', {
  value: false,
});

export default prefab('Date view', attr, undefined, [Text({ options }, [])]);
