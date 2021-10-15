import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './components/Home'
import InventoryViewer from './components/Viewer'
import Editor from './components/Editor'
import About from './components/About'

const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Inventory Tracker' }}
                />
                <Stack.Screen 
                    name="Viewer" 
                    component={InventoryViewer} 
                    options={{title: "Your inventory"}}
                />
                <Stack.Screen
                    name="Editor"
                    component={Editor}
                    options={{title: "Editor"}}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{title: "About"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App
