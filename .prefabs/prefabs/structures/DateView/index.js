"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const options_1 = require("./options");
exports.Text = (config, descendants = []) => {
    const options = { ...(config.options || options_1.options) };
    const style = { ...config.style };
    const ref = config.ref ? { ...config.ref } : undefined;
    return component_sdk_1.component('Date view', { options, ref, style }, descendants);
};
