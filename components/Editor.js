import React, { useState, useEffect } from 'react'
import { Text, Button, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './Style'

const Editor = ({ navigation, route }) => {
    let [data, setData] = useState({})
    let [nameInput, setNameInput] = useState(route.params.name)
    let [contentInput, setContentInput] = useState(route.params.content)

    const getData = async (key, callback) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue != null) {
                callback(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const save = () => {
        var newData = data
        newData[nameInput] = {
            name: nameInput,
            content: contentInput
        }
        setData(newData)
        storeData('@data', data)
        storeData('@last_update', Date.now() / 1000)
    }

    useEffect(() => { getData('@data', setData) }, [])

    return (
        <View style={styles.view}>
            <View style={[styles.view, { flexDirection: "row" }]}>
                <Text style={styles.entryName}>
                    Name:
                </Text>
                <TextInput
                    style={styles.input}
                    value={nameInput}
                    onChangeText={(t) => {
                        setNameInput(t)
                    }}
                />
            </View>
            <View style={[styles.view, { flexDirection: "row" }]}>
                <Text style={styles.entryName}>
                    Content:
                </Text>
                <TextInput
                    style={styles.input}
                    value={contentInput}
                    onChangeText={(t) => {
                        setContentInput(t)
                    }}
                />
            </View>
            <View style={[styles.view]}>
                <Button
                    color="#85C1E9"
                    onPress={() => {
                        save()
                        navigation.goBack()
                    }}
                    title="Save"
                />
            </View>
            <View style={styles.view}>
                <Button
                    color="#85C1E9"
                    onPress={() => {
                        navigation.navigate("Viewer")
                    }}
                    title="Back"
                />
            </View>
            <View style={styles.view}>
                <Button
                    color="#85C1E9"
                    onPress={() => {
                        navigation.navigate("Home")
                    }}
                    title="Home"
                />
            </View>
        </View>
    )
}

export default Editor
