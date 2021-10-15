import React from 'react'
import styles from './Style'
import { View, Text } from 'react-native'

const About = ({navigation, route}) => {
    return (
        <View style={styles.view}>
            <Text style={styles.entryContent}>
                This app is a inventory tracker, which tracks all your food, medicine and any other things you have. Never forget any tiny object in your house any more. Developed by {route.params    .author}.
            </Text>
        </View>
    )
}

export default About
