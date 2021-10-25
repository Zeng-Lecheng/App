import React, { useState, useEffect, Component } from 'react'
import { Text, Button, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './Style'
import { useIsFocused } from '@react-navigation/native'

const InventoryViewer = ({ navigation, route }) => {
    const [data, setData] = useState({})
    const isFocused = useIsFocused()

    const MButton = (props) => {
        return (
            <Button
                title={props.title}
                color={props.color}
                onPress={() => { navigation.navigate("Editor", { name: props.name }) }}
            />
        )
    }

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
                <View style={[styles.view, {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                }]}>
                    <Text style={[styles.entryName, { flex: 1 }]}>
                        {key}
                    </Text>
                    <Text style={[styles.entryContent, { flex: 2, alignSelf: "center" }]}>
                        {data[key].content}
                    </Text>
                    <MButton
                        color="#85C1E9"
                        name={key}
                        title="Edit"
                    />
                </View>
            )
        }
        return result
    }

    useEffect(() => { getData() }, [isFocused])

    return (
        <View style={styles.view}>
            <View style={[styles.view]}>
                {listInventory()}
            </View>
            <Button
                color="#85C1E9"
                onPress={() => navigation.navigate("Editor", { name: "" })}
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
