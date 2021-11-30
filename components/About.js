import { View, Text } from 'react-native'
import styles from './Style'
import { useValue } from './ValueContext'
import React from 'react'

const About = ({ navigation, route }) => {
    // const {currentValue} = useValue()
    // const author = currentValue.author
    return (
        <View style={styles.view}>
            <Text style={styles.entryContent}>
                {`This app is an inventory tracker, which tracks all your food, medicine and any other things you have. Never forget any tiny object in your house any more. Developed by ${route.params.author}.`}
            </Text>
        </View>
    )
}

export default About