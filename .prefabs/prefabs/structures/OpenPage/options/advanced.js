"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advanced = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
exports.advanced = {
    advancedSettings: component_sdk_1.toggle('Advanced settings', {
        value: false,
    }),
    dataComponentAttribute: component_sdk_1.variable('Test attribute', {
        value: ['Button'],
        configuration: {
            condition: component_sdk_1.showIfTrue('advancedSettings'),
        },
    }),
};
