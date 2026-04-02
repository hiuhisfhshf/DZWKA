import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import "@/global.css";

import {useColorScheme} from '@/hooks/use-color-scheme';
import { Provider } from 'react-redux'
import {store} from "@/store/store";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setToken} from "@/store/slices/authSlice";

export const unstable_settings = {
    anchor: '(tabs)',
};


function AppInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("token").then(token => {
            console.log("REHYDRATED TOKEN:", token);
            if (token) dispatch(setToken(token));
            setReady(true);
        });
    }, []);

    if (!ready) return null;

    return <>{children}</>;
}

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="modal" options={{presentation: 'modal', title: 'Modal'}}/>
                </Stack>
                <StatusBar style="auto"/>
            </ThemeProvider>

        </Provider>
    );
}
