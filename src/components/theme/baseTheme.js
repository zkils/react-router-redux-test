'use strict';

var _colors = require('./colors');

var _spacing = require('./spacing');



exports.default  = {
    spacing: _spacing.default,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: _colors.cyan500,
        primary2Color: _colors.cyan700,
        primary3Color: _colors.grey400,
        accent1Color: _colors.pinkA200,
        accent2Color: _colors.grey100,
        accent3Color: _colors.grey500,
        textColor: _colors.darkBlack,
        alternateTextColor: _colors.white,
        canvasColor: _colors.white,
        borderColor: _colors.grey300,
        disabledColor: _colors.darkBlack,
        pickerHeaderColor: _colors.cyan500,
        shadowColor: _colors.fullBlack,
        iconColor: _colors.cyan500,
        iconHoverColor: _colors.grey300,
    }
}; /**
 * NB: If you update this file, please also update `docs/src/app/customization/Themes.js`
 */