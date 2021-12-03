import React, { useState, useEffect } from 'react'
import { Text, Button, View, FlatList, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles, { colors } from './Style'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'

const serverurl = 'https://gentle-wildwood-07979.herokuapp.com/'

const Synchronizer = ({ navigation, route }) => {
    let [uid, setUid] = useState('')
    let [uidInput, setUidInput] = useState(route.params.uid)
    let [data, setData] = useState({})
    let [lastUpdate, setLastUpdate] = useState(0)
    let [regMsgText, setRegMsgText] = useState('')
    let [loginMsgText, setLoginMsgText] = useState('')
    let [syncMsgText, setSyncMsgText] = useState('')
    let isFocused = useIsFocused()

    useEffect(() => {
        getData('@data', setData)
        getData('@uid', setUid)
        getData('@last_update', setLastUpdate)
    }, [isFocused])

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

    const register = async () => {
        try {
            let res = await axios({
                method: 'post',
                url: serverurl,
                data: {
                    'action': 'register', 'payload': {
                        'uid': uidInput,
                        'inventory': data,
                        'last_update': lastUpdate
                    }
                }
            })
            console.log(res)
            if (res.data['ok']) {
                setUid(res.data['data']['uid'])
                storeData('@uid', res.data['data']['uid'])
                setUidInput(res.data['data']['uid'])
                setData(res.data['data']['inventory'])
                storeData('@data', res.data['data']['inventory'])
                setLastUpdate(res.data['data']['last_update'])
                storeData('@last_update', res.data['data']['last_update'])
                setRegMsgText('Your uid is showed, copy it to other devices to synchronize.')
            } else {
                setRegMsgText(res.data['msg'])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const login = async () => {
        axios.post(
            serverurl, { 'action': 'login', 'payload': { 'uid': uidInput } }
        ).then((res) => {
            if (res.data['ok']) {
                setUid(res.data['data']['uid'])
                storeData('@uid', res.data['data']['uid'])
                setData(res.data['data']['inventory'])
                storeData('@data', res.data['data']['inventory'])
                setLastUpdate(res.data['data']['last_update'])
                storeData('@last_update', res.data['data']['last_update'])
                setLoginMsgText('Logged in, data retrieved from server.')
            } else {
                setLoginMsgText(res.data['msg'])
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const sync = async () => {
        axios.post(
            serverurl, {
            'action': 'sync', 'payload': {
                'uid': uid,
                'inventory': data,
                'last_update': lastUpdate
            }
        }
        ).then((res) => {
            if (res.data['ok']) {
                setData(res.data['data']['inventory'])
                storeData('@data', res.data['data']['inventory'])
                setLastUpdate(res.data['data']['last_update'])
                storeData('@last_update', res.data['data']['last_update'])
                setSyncMsgText('Synced')
            } else {
                setSyncMsgText(res.data['msg'])
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const msg = (text) => {
        if (text === '') {
            return <View></View>
        } else {
            return (
                <View style={[styles.view]}>
                    <Text style={styles.entryContent}>
                        {text}
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={[styles.view, { justifyContent: "flex-start" }]}>
            <View style={[styles.view, { flexDirection: "row", width: "100%", justifyContent: "space-around" }]}>
                <TextInput
                    onChangeText={(t) => { setUidInput(t) }}
                    style={[styles.input]}
                    placeholder="uid"
                    value={uidInput}
                />
                <Button
                    onPress={() => { login() }}
                    color={colors.buttonColorBlue}
                    title="Login"
                />
            </View>
            {msg(loginMsgText)}
            <View style={[styles.view]}>
                <Button
                    color={colors.buttonColorBlue}
                    onPress={() => { register() }}
                    title="Register"
                />
            </View>
            {msg(regMsgText)}
            <View style={[styles.view]}>
                <Button
                    color={colors.buttonColorBlue}
                    onPress={() => { sync() }}
                    title="Sync"
                />
            </View>
            {msg(syncMsgText)}
            <View style={styles.view}>
                <Button
                    color={colors.buttonColorBlue}
                    onPress={() => {
                        navigation.navigate("Viewer")
                    }}
                    title="Back"
                />
            </View>
        </View>

    )
}

export default Synchronizer
