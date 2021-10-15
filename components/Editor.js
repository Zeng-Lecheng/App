import React, { useState, useEffect } from 'react'
import { Text, Button, View, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

    const save = () => {
        setData(modifyData(data, nameInput, {
            name: nameInput,
            content: contentInput
        }))
        storeData(data)
    }

    useEffect(() => { getData() }, [])
    // useEffect(() => { storeData(data) }, [data])

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
                        setSaveStatus(false)
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
                        setSaveStatus(false)
                    }}
                />
            </View>

            <Button
                color="#85C1E9"
                onPress={() => {
                    setSaveStatus(true)
                    save()
                }}
                title="Save"
            />
            {saveHint()}
            <Button
                color="#85C1E9"
                onPress={() => {
                    navigation.navigate("Viewer")
                }}
                title="Back"
            />
            <Button
                color="#85C1E9"
                onPress={() => {
                    navigation.navigate("Home")
                }}
                title="Home"
            />
        </View>
    )
}

export default Editor
