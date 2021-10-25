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
            <Button
                color="#82E0AA"
                title="About"
                onPress={() => navigation.navigate('About', {author: 'Lecheng Zeng'})}
            />
        </View>
    );
};

export default HomeScreen;
