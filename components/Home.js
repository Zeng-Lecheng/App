import React from 'react';
import { Text, Button, View } from 'react-native';
import styles, { colors } from './Style';

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <View style={styles.view}>
                <Button
                    color={colors.buttonColorGreen}
                    title="View your inventory"
                    onPress={() => navigation.navigate('Viewer')}
                />
            </View>
            <View style={styles.view}>
                <Button
                    color={colors.buttonColorGreen}
                    title="About"
                    onPress={() => navigation.navigate('About', { author: 'Lecheng Zeng' })}
                />
            </View>
        </View>
    );
};

export default HomeScreen;
