"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
exports.options = {
    visible: component_sdk_1.toggle('Toggle visibility', {
        value: true,
        configuration: {
            as: 'VISIBILITY',
        }
    }),
    buttonText: component_sdk_1.variable('Button text', { value: ['Button'] }),
    fullWidth: component_sdk_1.toggle('Full width', { value: false }),
};
