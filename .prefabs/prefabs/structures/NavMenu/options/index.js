"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
exports.options = {
    backgroundColor: component_sdk_1.color('Background color', { value: component_sdk_1.ThemeColor.PRIMARY }),
    toolbarVariant: component_sdk_1.option('CUSTOM', {
        label: 'Size',
        value: 'regular',
        configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
                {
                    name: 'Regular',
                    value: 'regular',
                },
                {
                    name: 'Dense',
                    value: 'dense',
                },
            ],
        },
    }),
    ...advanced_1.advanced,
};
