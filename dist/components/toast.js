import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../core/theme';
import { Modal } from './modal';
import { Text } from './text';
export const Toast = ({ title, message, duration = 1500, visible, transitionDuration = 500, onDismiss, onUnmounted, onPress, }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    useEffect(() => {
        setTimeout(() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(), duration + transitionDuration);
    }, []);
    return (<Modal zIndex={theme.componentTheme.toast.zIndex} visible={visible} transition="slide-down" transitionDuration={transitionDuration} backdrop={false} enableDismissGesture={true} onDismiss={onDismiss} onUnmounted={onUnmounted} onPress={onPress} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: theme.spacing,
            paddingTop: theme.spacing + insets.top,
            backgroundColor: theme.componentTheme.toast.backgroundColor,
        }}>
      {title && (<Text style={[
                theme.textTheme.small,
                {
                    fontWeight: '500',
                    marginBottom: 2,
                },
            ]}>
          {title}
        </Text>)}
      {message && <Text>{message}</Text>}
    </Modal>);
};
