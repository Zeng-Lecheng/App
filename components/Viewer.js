import React, { useState, useEffect } from 'react'
import { Text, Button, View, FlatList, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles, { colors } from './Style'
import { useIsFocused } from '@react-navigation/native'

const InventoryViewer = ({ navigation, route }) => {
    const [data, setData] = useState({})
    const [searchKey, setSearchKey] = useState('')
    const [displayData, setDisplayData] = useState()
    const isFocused = useIsFocused()
    const [isSearching, setIsSearching] = useState(false)


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

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue != null) {
                setData(JSON.parse(jsonValue))
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

    const remove = (name) => {
        var newData = data
        delete newData[name]
        setData(newData)
        storeData('@data', data)
        search(searchKey)
        storeData('@last_update', Date.now())
        navigation.setParams({ isFocused: false })
        navigation.setParams({ isFocused: true })
    }

    const itemRender = ({ item }) => {
        return (
            <View style={{ flexDirection: "row", padding: 5 }}>
                <View style={{ flexDirection: "row", width: "60%" }}>
                    <Text style={styles.entryName}>{item.name}</Text>
                    <Text style={[styles.entryContent]}>{item.content}</Text>
                </View>
                <View style={{ alignSelf: "flex-end", flexDirection: "row", paddingLeft: 10 }}>
                    <EButton color={colors.buttonColorBlue} name={item.name} content={item.content} title="Edit" />
                    <DButton color={colors.buttonColorDanger} name={item.name} title="Delete" />
                </View>
            </View>
        )
    }

    const search = (key) => {
        let res = []

        if (key === '') {
            setIsSearching(false)
            return
        } else {

            for (const item of Object.values(data)) {
                const searchable = `${item.name}${item.content}`
                const found = searchable.match(key)
                if (found) {
                    res.push(item)
                }
            }
            setDisplayData(res)
            setIsSearching(true)
        }
    }

    const itemList = () => {
        if (!isSearching) {
            return (
                <FlatList
                    data={Object.values(data)}
                    renderItem={itemRender}
                    keyExtractor={(item) => {return item.name}}
                />
            )
        } else {
            return (
                <FlatList
                    data={displayData}
                    renderItem={itemRender}
                    keyExtractor={(item) => {return item.name}}
                />
            )
        }
    }

    useEffect(() => { getData('@data') }, [isFocused])

    return (
        <View style={[styles.view, { justifyContent: "flex-start" }]}>
            <View style={[styles.view, { flexDirection: "row", width: "100%", justifyContent: "space-around" }]}>
                <TextInput
                    onChangeText={(t) => { setSearchKey(t) }}
                    style={[styles.input]}
                    placeholder="Search items"
                />
                <Button
                    onPress={() => { search(searchKey) }}
                    color="#85C1E9"
                    title="Search"
                />
            </View>
            <View style={[styles.view, { height: "80%" }]}>
                {itemList()}
            </View>
            <View style={[styles.view]}>
                <Button
                    color={colors.buttonColorBlue}
                    onPress={() => navigation.navigate("Editor", {})}
                    title="Add"
                />
            </View>
            <View style={[styles.view]}>
                <Button
                    color={colors.buttonColorBlue}
                    onPress={() => navigation.navigate("Home")}
                    title="Home"
                />
            </View>
        </View>
    )

}

export default InventoryViewer
