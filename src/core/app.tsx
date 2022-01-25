import AppLoading from 'expo-app-loading'
import React, { memo, useContext, useState } from 'react'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FullscreenLoadingDelegate from '../components/fullscreen-loading-delegate'
import { RouterView, RouterViewProps } from './router'
import { ThemeProvider, ThemeProviderProps } from './theme'

export interface AppContext {
  appIsReady: boolean
}

const appContext = React.createContext({} as AppContext)

export const useApp = () => useContext(appContext)

export interface AppProviderProps extends ThemeProviderProps, RouterViewProps {
  loadAsync?: () => Promise<void>
}

export const AppProvider: React.FC<AppProviderProps> = memo(
  ({
    loadAsync = () => Promise.resolve(),
    theme,
    darkTheme,
    initialRouteName,
    routes,
  }) => {
    const [appIsReady, setAppIsReady] = useState(false)

    if (!appIsReady) {
      return (
        <appContext.Provider value={{ appIsReady }}>
          <AppLoading
            startAsync={loadAsync}
            onFinish={() => setAppIsReady(true)}
            onError={console.warn}
          />
        </appContext.Provider>
      )
    }

    return (
      <appContext.Provider value={{ appIsReady }}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme} darkTheme={darkTheme}>
            <Host>
              <RouterView initialRouteName={initialRouteName} routes={routes} />
              <FullscreenLoadingDelegate />
            </Host>
          </ThemeProvider>
        </SafeAreaProvider>
      </appContext.Provider>
    )
  },
)