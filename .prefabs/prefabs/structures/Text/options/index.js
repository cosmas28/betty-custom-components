"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
const styles_1 = require("./styles");
exports.options = {
    content: component_sdk_1.variable('Content', {
        value: [],
        configuration: { as: 'MULTILINE' },
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
    linkType: component_sdk_1.option('CUSTOM', {
        label: 'Link to',
        value: 'internal',
        configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
                { name: 'Internal page', value: 'internal' },
                { name: 'External page', value: 'external' },
            ],
        },
    }),
    linkTarget: component_sdk_1.option('CUSTOM', {
        value: '_self',
        label: 'Open in',
        configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
                { name: 'Current Tab', value: '_self' },
                { name: 'New Tab', value: '_blank' },
            ],
        },
    }),
    linkTo: component_sdk_1.endpoint('Page', {
        value: '',
        configuration: {
            condition: component_sdk_1.showIf('linkType', 'EQ', 'internal'),
        },
    }),
    linkToExternal: component_sdk_1.variable('URL', {
        value: [''],
        configuration: {
            placeholder: 'Starts with https:// or http://',
            condition: component_sdk_1.showIf('linkType', 'EQ', 'external'),
        },
    }),
    ...styles_1.styles,
    ...advanced_1.advanced,
};
