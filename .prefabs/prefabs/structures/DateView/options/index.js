"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
const styles_1 = require("./styles");
exports.options = {
    value: component_sdk_1.variable('Date', { value: [], configuration: { as: 'MULTILINE' }, }),
    dateFormat: component_sdk_1.variable('Date format', {
        value: [],
    }),
    useInnerHtml: component_sdk_1.toggle('Display Rich Text', {
        value: false,
        configuration: {
            condition: component_sdk_1.showIfTrue('useInnerHtml'),
        },
    }),
    type: component_sdk_1.font('Font', { value: ['Title2'] }),
    textAlignment: component_sdk_1.option('CUSTOM', {
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
    outerSpacing: component_sdk_1.sizes('Outer space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
    }),
    ...styles_1.styles,
    ...advanced_1.advanced,
};
