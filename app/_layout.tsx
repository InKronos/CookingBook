import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SearchHeader } from '@/components/SearchHeader/SearchHeader';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index"
          options={{
          headerTitle: "Cooking Book",
          headerStyle: {
            backgroundColor: '#0082fc',
          },
          headerTintColor: '#fff',
          headerRight: () => 
            <Ionicons.Button name="search" size={32} backgroundColor={'#0082fc'} onPress={() => router.navigate('/search')} />,
           
        }}/>
        <Stack.Screen name='search'
          options={{
            headerTitle: () => <SearchHeader/>,
            headerStyle: {
              backgroundColor: '#0082fc',
            }
          }}
        />
        <Stack.Screen name='recipe/[id]'
          options={{
            headerStyle: {
              backgroundColor: '#0082fc'
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack>
      
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
