import { option, toggle, sizes, color, ThemeColor } from '@betty-blocks/component-sdk'

export const options = {
	visible: toggle('Toggle visibility', {
		value: true,
		configuration: {
			as: 'VISIBILITY',
		}
	}),
	columnWidth: option('CUSTOM', {
		label: 'Column width',
		value: 'flexible',
		configuration: {
			as: 'DROPDOWN',
			dataType: 'string',
			allowedInput: [
				{ name: 'Fit content', value: 'fitContent' },
        { name: 'Flexible', value: 'flexible' },
        { name: 'Hidden', value: 'hidden' },
        { name: '1', value: '1' },
        { name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
        { name: '11', value: '11' },
        { name: '12', value: '12' },
			]
		}
	}),
	columnWidthMobile: option('CUSTOM', {
		value: 'flexible',
		label: 'Column width (mobile)',
		configuration: {
			as: 'DROPDOWN',
			dataType: 'string',
			allowedInput: [
				{ name: 'Fit content', value: 'fitContent' },
        { name: 'Flexible', value: 'flexible' },
        { name: 'Hidden', value: 'hidden' },
        { name: '1', value: '1' },
				{ name: '2', value: '2' },
        { name: '3', value: '3' },
        { name: '4', value: '4' },
        { name: '5', value: '5' },
        { name: '6', value: '6' },
        { name: '7', value: '7' },
        { name: '8', value: '8' },
        { name: '9', value: '9' },
        { name: '10', value: '10' },
        { name: '11', value: '11' },
        { name: '12', value: '12' },
			]
		}
	}),
	verticalAlignment: option('CUSTOM', {
		label: 'Vertical Alignment',
		value: 'inherit',
		configuration: {
			as: 'BUTTONGROUP',
			dataType: 'string',
			allowedInput: [
				{ name: 'None', value: 'inherit' },
        { name: 'Top', value: 'flex-start' },
				{ name: 'Center', value: 'center' },
        { name: 'Bottom', value: 'flex-end' },
			]
		}
	}),
	horizontalAlignment: option('CUSTOM', {
		label: 'Horizontal Alignment',
		value: 'inherit',
		configuration: {
			as: 'BUTTONGROUP',
			dataType: 'string',
			allowedInput: [
				{ name: 'None', value: 'inherit' },
        { name: 'Left', value: 'flex-start' },
        { name: 'Center', value: 'center' },
        { name: 'Right', value: 'flex-end' },
			]
		}
	}),
	outerSpacing: sizes('Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  innerSpacing: sizes('Inner space', {
    value: ['M', 'M', 'M', 'M'],
  }),
	backgroundColor: color('Background color', { value: ThemeColor.TRANSPARENT }),
}
