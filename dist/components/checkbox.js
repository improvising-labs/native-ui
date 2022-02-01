import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useTheme } from '../core/theme';
export const CheckBox = ({ value, onValueChange, size: customSize, style, checkedColor: customCheckedColor, uncheckedColor: customUncheckedColor, iconColor: customIconColor, }) => {
    const theme = useTheme();
    const size = customSize !== null && customSize !== void 0 ? customSize : theme.componentTheme.checkbox.size;
    const iconSize = Math.floor(size * 0.8);
    const checkedColor = customCheckedColor !== null && customCheckedColor !== void 0 ? customCheckedColor : theme.primaryColor;
    const uncheckedColor = customUncheckedColor !== null && customUncheckedColor !== void 0 ? customUncheckedColor : theme.backgroundColor.primary;
    const iconColor = customIconColor !== null && customIconColor !== void 0 ? customIconColor : theme.primaryContrastingColor;
    return (<Pressable onPress={() => onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(!value)} style={[
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: value ? checkedColor : uncheckedColor,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style,
        ]}>
      {value && (<Icon name="checkmark" fill={iconColor} width={iconSize} height={iconSize}/>)}
    </Pressable>);
};
