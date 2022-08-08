"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const DateView_1 = require("./structures/DateView");
const options_1 = require("./structures/DateView/options");
const attr = {
    icon: component_sdk_1.Icon.TextInputIcon,
    category: 'CONTENT',
    keywords: ['Content', 'text', 'type', 'typography', 'body', 'paragraph'],
};
const options = { ...options_1.options };
options.type = component_sdk_1.font('Font', { value: ['Body1'] });
options.useInnerHtml = component_sdk_1.toggle('Display Rich Text', {
    value: false,
});
exports.default = component_sdk_1.prefab('Date view', attr, undefined, [DateView_1.Text({ options }, [])]);
