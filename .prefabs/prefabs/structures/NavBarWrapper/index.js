"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navBar = void 0;
const component_sdk_1 = require("@betty-blocks/component-sdk");
const options_1 = require("./options");
exports.navBar = (config, descendants = []) => {
    const options = { ...(config.options || options_1.options) };
    const style = { ...config.style };
    return component_sdk_1.component('NavBar', { options, style }, descendants);
};
