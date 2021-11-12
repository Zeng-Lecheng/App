import React from 'react';
import { Text, Button, View } from 'react-native';
import styles from './Style';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <View style={styles.view}>
                <Button
                    color="#82E0AA"
                    title="View your inventory"
                    onPress={() => navigation.navigate('Viewer')}
                />
            </View>
            <View style={styles.view}>
                <Button
                    color="#82E0AA"
                    title="About"
                    onPress={() => navigation.navigate('About', { author: 'Lecheng Zeng' })}
                />
            </View>
        </View>
    );
};

export default HomeScreen;
