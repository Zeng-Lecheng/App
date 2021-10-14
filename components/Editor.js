import React, { useState, useEffect } from 'react'
import { Text, Button, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styels from './Style'
import styles from './Style'

const Editor = ({ navigation, route }) => {
    let [data, setData] = useState({})
    let [nameInput, setNameInput] = useState("")
    let [contentInput, setContentInput] = useState("")
    let [saveStatus, setSaveStatus] = useState(false)

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

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@data', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const modifyData = (oldData, newKey, newValue) => {
        var newData = oldData
        newData[newKey] = newValue
        return newData
    }

    const saveHint = () => {
        if (saveStatus) {
            return (
                <View>
                    <Text style={[styles.entryContent, { color: "red" }]}>
                        Saved
                    </Text>
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }

    useEffect(() => { getData() }, [])
    // useEffect(() => { storeData(data) }, [data])

    return (
        <View style={styels.view}>
            <View style={[styels.view, { flexDirection: "row" }]}>
                <Text style={styels.entryName}>
                    Name: 
                </Text>
                <TextInput
                    style={styels.input}
                    value={nameInput}
                    onChangeText={(t) => {
                        setNameInput(t)
                        setSaveStatus(false)
                    }}
                />
            </View>
            <View style={[styels.view, { flexDirection: "row" }]}>
                <Text style={styels.entryName}>
                    Content: 
                </Text>
                <TextInput
                    style={styels.input}
                    value={contentInput}
                    onChangeText={(t) => {
                        setContentInput(t)
                        setSaveStatus(false)
                    }}
                />
            </View>

            <Button
                color="#85C1E9"
                onPress={() => {
                    setSaveStatus(true)
                    setData(modifyData(data, nameInput, {
                        name: nameInput,
                        content: contentInput
                    }))
                }}
                title="Save"
            />
            {saveHint()}
            <Button
                color="#85C1E9"
                onPress={() => {
                    navigation.navigate("Viewer")
                    storeData(data)
                }}
                title="Back"
            />
            <Button
                color="#85C1E9"
                onPress={() => {
                    navigation.navigate("Home")
                    storeData(data)
                }}
                title="Home"
            />
        </View>
    )
}

export default Editor
