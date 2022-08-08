"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const Button_1 = require("./structures/Button");
const attrs = {
    icon: component_sdk_1.Icon.ButtonIcon,
    category: 'BUTTON',
    keywords: ['Button'],
};
exports.default = component_sdk_1.prefab('Button', attrs, undefined, [Button_1.Button({})]);
