import React, { useState, useEffect } from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './Style'
import { useIsFocused } from '@react-navigation/native'

const InventoryViewer = ({ navigation, route }) => {
    let [data, setData] = useState({})

    const isFocused = useIsFocused()

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@data')
            if (jsonValue != null) {
                setData(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const listInventory = () => {
        var result = []
        for (var key in data) {
            result.push(
                <Text style={styles.entryName}>
                    {key}
                </Text>
            )
            result.push(
                <Text style={styles.entryContent}>
                    {data[key].content}
                </Text>
            )
        }
        return result
    }

    useEffect(() => { getData() }, [isFocused])

    return (
        <View style={styles.view}>
            <View style={[styles.view, { flexDirection: "row", justifyContent: "space-between"}]}>
                {listInventory()}
            </View>
            <Button
                color="#85C1E9"
                onPress={() => navigation.navigate("Editor")}
                title="Edit"
            />

            <Button
                color="#85C1E9"
                onPress={() => navigation.navigate("Home")}
                title="Home"
            />
        </View>
    )

}

export default InventoryViewer
