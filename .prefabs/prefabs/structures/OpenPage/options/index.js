"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
const tooltip_1 = require("../../Button/options/tooltip");
exports.options = {
    visible: component_sdk_1.toggle('Toggle visibility', {
        value: true,
        configuration: {
            as: 'VISIBILITY',
        },
    }),
    buttonText: component_sdk_1.variable('Button text', { value: ['Open page'] }),
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
    fullWidth: component_sdk_1.toggle('Full width', {
        value: false,
        configuration: {
            condition: component_sdk_1.showIf('variant', 'EQ', 'icon'),
        },
    }),
    icon: component_sdk_1.icon('Icon', { value: 'none' }),
    size: component_sdk_1.option('CUSTOM', {
        value: 'small',
        label: 'Icon size',
        configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
                { name: 'Large', value: 'large' },
                { name: 'Medium', value: 'medium' },
                { name: 'Small', value: 'small' },
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
            condition: component_sdk_1.hideIf('icon', 'EQ', 'none'),
            allowedInput: [
                { name: 'Start', value: 'start' },
                { name: 'End', value: 'end' },
            ],
        },
    }),
    outerSpacing: component_sdk_1.sizes('Outer space', {
        value: ['0rem', '0rem', '0rem', '0rem'],
    }),
    disabled: component_sdk_1.toggle('Disabled', { value: false }),
    ...tooltip_1.tooltip,
    ...advanced_1.advanced,
};
