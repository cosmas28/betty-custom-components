"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
const tooltip_1 = require("./tooltip");
exports.options = {
    visible: component_sdk_1.toggle('Toggle visibility', {
        value: true,
        configuration: {
            as: 'VISIBILITY',
        },
    }),
    buttonText: component_sdk_1.variable('Button text', { value: ['Button'] }),
    fullWidth: component_sdk_1.toggle('Full width', { value: false }),
    icon: component_sdk_1.icon('Icon', { value: 'none' }),
    size: component_sdk_1.option('CUSTOM', {
        value: 'small',
        label: 'Icon size',
        configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
                { name: 'Small', value: 'small' },
                { name: 'Medium', value: 'medium' },
                { name: 'Large', value: 'large' },
            ],
            condition: component_sdk_1.hideIf('icon', 'EQ', 'none'),
        },
    }),
    iconPosition: component_sdk_1.option('CUSTOM', {
        label: 'Icon position',
        value: 'start',
        configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
                { name: 'Start', value: 'start' },
                { name: 'End', value: 'end' },
            ],
            condition: component_sdk_1.hideIf('icon', 'EQ', 'none'),
        },
    }),
    outerSpacing: component_sdk_1.sizes('Outer space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
    }),
    disabled: component_sdk_1.toggle('Disabled', { value: false }),
    ...tooltip_1.tooltip,
    ...advanced_1.advanced,
};
