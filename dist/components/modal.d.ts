import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { GestureEvent, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
export declare type ModalTransition = 'fade' | 'zoom' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
export interface ModalStateProps {
    visible: boolean;
    transition?: ModalTransition;
    transitionDuration?: number;
    onBackdropPress?: () => void;
    onDismiss?: () => void;
    onUnmounted?: () => void;
}
export interface ModalProps extends ModalStateProps {
    zIndex?: number;
    dismissible?: boolean;
    backdrop?: boolean;
    backdropStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    enableDismissGesture?: boolean;
    onPress?: () => void;
    onGestureEvent?: (event: GestureEvent<PanGestureHandlerEventPayload>) => void;
}
export declare const Modal: React.FC<ModalProps>;
