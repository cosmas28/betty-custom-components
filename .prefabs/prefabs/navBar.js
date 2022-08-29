"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_sdk_1 = require("@betty-blocks/component-sdk");
const NavBar_1 = require("./structures/NavBar");
const OpenPage_1 = require("./structures/OpenPage");
const options_1 = require("./structures/OpenPage/options");
const LeftSide_1 = require("./structures/LeftSide");
const RightSide_1 = require("./structures/RightSide");
const Text_1 = require("./structures/Text");
const options_2 = require("./structures/Text/options");
const attr = {
    icon: component_sdk_1.Icon.NavbarIcon,
    category: 'NAVIGATION',
    keywords: ['Navigation', 'bar', 'navigationbar', 'menu', 'navbar', 'appbar'],
};
const optionsA = { ...options_1.options };
const optionsB = { ...options_1.options };
optionsA.buttonText = component_sdk_1.variable('Button text', { value: ['Menu 1'] });
optionsB.buttonText = component_sdk_1.variable('Button text', { value: ['Menu 2'] });
const textCustomOptions = { ...options_2.options };
textCustomOptions.type = component_sdk_1.font('Font', { value: ['Title4'] });
textCustomOptions.content = component_sdk_1.variable('Content', { value: ['The Third Floor Inc.'] });
exports.default = component_sdk_1.prefab('TTF Navigation Bar', attr, undefined, [
    NavBar_1.navBar({}, [
        LeftSide_1.LeftSide({}, [
            Text_1.Text({ options: textCustomOptions, style: { overwrite: { color: { value: component_sdk_1.ThemeColor.WHITE, type: 'Color' } } } })
        ]),
        RightSide_1.RightSide({}, [
            OpenPage_1.OpenPageButton({
                options: optionsA,
                style: {
                    overwrite: {
                        boxShadow: 'none',
                        textTransform: 'none',
                        fontWeight: '400',
                    },
                },
            }),
            OpenPage_1.OpenPageButton({
                options: optionsB,
                style: {
                    overwrite: {
                        boxShadow: 'none',
                        textTransform: 'none',
                        fontWeight: '400',
                    },
                },
            }),
        ])
    ]),
]);
