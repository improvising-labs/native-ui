import React, { useEffect, useState } from 'react'
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native'
import { useAnimatedValue } from '../core/animation'
import { Performance } from '../core/performance'
import { useTheme } from '../core/theme'
import { Portal } from './portal'

export type ModalTransition =
  | 'fade'
  | 'scale'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'

export interface ModalStateProps {
  visible: boolean
  transition?: ModalTransition
  transitionDuration?: number
  onBackdropPressed?: () => void
  onDismiss?: () => void
  onUnmounted?: () => void
}

export interface ModalProps extends ModalStateProps {
  zIndex?: number
  dismissible?: boolean
  backdrop?: boolean
  style?: StyleProp<ViewStyle>
  useNativeDriver?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  children,
  zIndex = 100,
  dismissible = true,
  backdrop = true,
  transition = 'fade',
  style,
  useNativeDriver = Performance.animation.useNativeDriver,
  visible,
  transitionDuration = 400,
  onBackdropPressed,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()
  const value = useAnimatedValue(visible ? 1 : 0)

  const [mounted, setMounted] = useState(visible)

  useEffect(() => {
    if (visible) {
      if (mounted) {
        Animated.timing(value, {
          toValue: 1,
          duration: transitionDuration,
          useNativeDriver,
        }).start()
      } else {
        requestAnimationFrame(() => setMounted(true))
      }
    } else if (mounted) {
      Animated.timing(value, {
        toValue: 0,
        duration: transitionDuration,
        useNativeDriver,
      }).start()

      setTimeout(() => {
        setMounted(false)
        onUnmounted?.()
      }, transitionDuration)
    }
  }, [visible, mounted])

  if (!mounted) {
    return null
  }

  const handleBackdropPress = () => {
    onBackdropPressed?.()

    if (dismissible) {
      onDismiss?.()
    }
  }

  const renderBackdrop = () => {
    if (!backdrop) {
      return null
    }

    return (
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.backgroundColor.modalBarrier,
              zIndex,
              opacity: value,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    if (transition.startsWith('slide-')) {
      return (
        <Animated.View
          style={[
            {
              zIndex: zIndex + 1,
              transform: [
                transition === 'slide-up'
                  ? {
                      translateY: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [dimensions.height, 0],
                      }),
                    }
                  : transition === 'slide-down'
                  ? {
                      translateY: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-dimensions.height, 0],
                      }),
                    }
                  : transition === 'slide-left'
                  ? {
                      translateX: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [dimensions.width, 0],
                      }),
                    }
                  : {
                      translateX: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-dimensions.width, 0],
                      }),
                    },
              ],
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      )
    } else if (transition === 'scale') {
      return (
        <Animated.View
          style={[
            {
              zIndex: zIndex + 1,
              opacity: value,
              transform: [
                {
                  scale: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.9, 1],
                  }),
                },
              ],
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      )
    } else {
      return (
        <Animated.View
          style={[
            {
              zIndex: zIndex + 1,
              opacity: value,
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      )
    }
  }

  return (
    <Portal>
      {renderBackdrop()}
      {renderContent()}
    </Portal>
  )
}
