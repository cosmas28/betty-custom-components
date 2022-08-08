"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const Row_1 = require("./structures/Row");
const Column_1 = require("./structures/Column");
const options_1 = require("./structures/Column/options");
const columnOptions = { ...options_1.options };
const attrs = {
    icon: component_sdk_1.Icon.RowColumnIcon,
    category: 'LAYOUT',
    keywords: ['Layout', 'column', 'columns', '1'],
};
exports.default = component_sdk_1.prefab('1 Column', attrs, undefined, [Row_1.Row({}, [Column_1.Column({ options: columnOptions })])]);
