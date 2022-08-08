import { toggle, variable, icon, option } from '@betty-blocks/component-sdk';

export const options = {
	visible: toggle('Toggle visibility', {
		value: true,
		configuration: {
			as: 'VISIBILITY',
		}
	}),
	buttonText: variable('Button text', { value: ['Button'] }),
	fullWidth: toggle('Full width', { value: false }),
}
