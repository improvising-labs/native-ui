var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useImperativeHandle, useRef, useState } from 'react';
import { Pressable, TextInput, } from 'react-native';
import { useTheme } from '../core/theme';
export const Input = React.forwardRef((_a, ref) => {
    var { multiline, style, textStyle, placeholderTextColor, underlineColorAndroid = 'transparent', onContentSizeChange } = _a, textInputProps = __rest(_a, ["multiline", "style", "textStyle", "placeholderTextColor", "underlineColorAndroid", "onContentSizeChange"]);
    const theme = useTheme();
    const textInput = useRef(null);
    const [height, setHeight] = useState();
    useImperativeHandle(ref, () => textInput.current);
    return (<Pressable style={style} onPress={() => { var _a; return (_a = textInput.current) === null || _a === void 0 ? void 0 : _a.focus(); }}>
        <TextInput ref={textInput} multiline={multiline} selectionColor={theme.primaryColor} style={[
            theme.textTheme.default,
            textStyle,
            {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height,
            },
        ]} placeholderTextColor={placeholderTextColor !== null && placeholderTextColor !== void 0 ? placeholderTextColor : theme.textColor.placeholder} underlineColorAndroid={underlineColorAndroid} onContentSizeChange={event => {
            if (multiline) {
                setHeight(event.nativeEvent.contentSize.height);
            }
            onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(event);
        }} {...textInputProps}/>
      </Pressable>);
});
