import { option } from '@betty-blocks/component-sdk'
export const options = {
	maxRowWidth: option('CUSTOM', {
		label: 'Width',
		value: 'XL',
		configuration: {
			as: 'BUTTONGROUP',
			dataType: 'string',
			allowedInput: [
				{ name: 'S', value: 'S' },
				{ name: 'M', value: 'M' },
				{ name: 'L', value: 'L' },
				{ name: 'XL', value: 'XL' },
				{ name: 'Full', value: 'Full' },
			],
		},
	}),
}
