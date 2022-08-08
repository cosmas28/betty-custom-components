"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const options_1 = require("./options");
exports.Row = (config, descendants) => {
    const options = { ...(config.options || options_1.options) };
    return component_sdk_1.component('Row', { options }, descendants || []);
};
