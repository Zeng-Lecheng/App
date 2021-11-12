import React, { useState, useEffect } from 'react'
import { Text, Button, View, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from './Style'
import { useIsFocused } from '@react-navigation/native'

const InventoryViewer = ({ navigation, route }) => {
    const [data, setData] = useState({})
    const isFocused = useIsFocused()

    const EButton = (props) => {
        return (
            <Button
                title={props.title}
                color={props.color}
                onPress={() => { navigation.navigate("Editor", { name: props.name, content: props.content }) }}
            />
        )
    }

    const DButton = (props) => {
        return (
            <Button
                title={props.title}
                color={props.color}
                onPress={() => { remove(props.name) }}
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

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@data', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    const remove = (name) => {
        var newData = data
        delete newData[name]
        setData(newData)
        storeData(data)
        navigation.setParams({ isFocused: false })
        navigation.setParams({ isFocused: true })
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
                    <EButton
                        color="#85C1E9"
                        name={key}
                        content={data[key].content}
                        title="Edit"
                    />
                    <DButton
                        color="red"
                        name={key}
                        title="Delete"
                    />
                </View>
            )
        }
        return result
    }

    const itemRender = ({ item }) => {
        return (
            <View style={{ flexDirection: "row", padding: 5}}>
                <View style={{ flexDirection: "row", width: "60%" }}>
                    <Text style={styles.entryName}>{item.name}</Text>
                    <Text style={[styles.entryContent]}>{item.content}</Text>
                </View>
                <View style={{alignSelf: "flex-end", flexDirection: "row", paddingLeft: 10}}>
                    <EButton color="#85C1E9" name={item.name} content={item.content} title="Edit" />
                    <DButton color="red" name={item.name} title="Delete" />
                </View>
            </View>
        )
    }

    useEffect(() => { getData() }, [isFocused])

    return (
        <View style={styles.view}>

            <FlatList
                data={Object.values(data)}
                renderItem={itemRender}
                keyExtractor={item => item.name}
            />
            <View style={[styles.view]}>
                <Button
                    color="#85C1E9"
                    onPress={() => navigation.navigate("Editor", {})}
                    title="Add"
                />
            </View>
            <View style={[styles.view]}>
                <Button
                    color="#85C1E9"
                    onPress={() => navigation.navigate("Home")}
                    title="Home"
                />
            </View>
        </View>
    )

}

export default InventoryViewer
