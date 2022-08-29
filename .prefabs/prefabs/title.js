"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const Text_1 = require("./structures/Text");
const attr = {
    icon: component_sdk_1.Icon.TitleIcon,
    category: 'CONTENT',
    keywords: [
        'Content',
        'title',
        'type',
        'typography',
        'heading',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'text',
    ],
};
exports.default = component_sdk_1.prefab('Title', attr, undefined, [Text_1.Text({}, [])]);
