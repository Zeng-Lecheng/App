import React from 'react';
import { Text, Button, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ alignItems: "flex-start", padding: 10}}>
            <Button
                color="#82E0AA"
                title="View your inventory"
                onPress={() => navigation.navigate('Viewer')}
            />
        </View>
    );
};

export default HomeScreen;
