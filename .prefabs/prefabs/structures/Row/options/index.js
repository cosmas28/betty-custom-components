"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
exports.options = {
    maxRowWidth: component_sdk_1.option('CUSTOM', {
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
};
