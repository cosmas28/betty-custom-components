"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const advanced_1 = require("./advanced");
exports.options = {
    alignment: component_sdk_1.buttongroup('Alignment', [
        ['None', 'none'],
        ['Left', 'flex-start'],
        ['Center', 'center'],
        ['Right', 'flex-end'],
        ['Justified', 'space-between'],
    ], {
        value: 'none',
        configuration: {
            dataType: 'string',
        },
    }),
    valignment: component_sdk_1.buttongroup('Vertical alignment', [
        ['None', 'none'],
        ['Top', 'flex-start'],
        ['Center', 'center'],
        ['Bottom', 'flex-end'],
    ], {
        value: 'center',
        configuration: {
            dataType: 'string',
        },
    }),
    ...advanced_1.advanced,
};
