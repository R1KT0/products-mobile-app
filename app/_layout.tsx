import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/presentation/theme/hooks/useColorScheme';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

// Prevents the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      retry: false,
    }
  }
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, 'background');

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.light.primary,
              },
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="(products-app)/(home)"
              options={{
                headerShown: false
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
