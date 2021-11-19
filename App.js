import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button } from 'react-native';
import axios from 'axios';

const App = () => {
    const [BBoardNames, setBBoardNames] = useState([]);
    const [initializing, setInitializing] = useState(true)
    const [BBoardContent, setBBoardContent] = useState()
    const [selected, setSelected] = useState()

    const getBBoardName = () => {
        axios.get("https://glacial-hamlet-05511.herokuapp.com/bboardNames")
            .then((response) => {
                setBBoardNames(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const getBBoardContent = (name) => {
        axios.post("https://glacial-hamlet-05511.herokuapp.com/posts", { bboard: name })
            .then((response) => {
                setBBoardContent(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const renderBBoardNames = ({ item }) => (
        <View style={styles.bboardNameContainer}>
            <Text
                style={styles.BBoardNameText}
                onPress={() => {
                    setSelected(item)
                    getBBoardContent(item)
                }}
            >
                {item === "" ? "  " : item}
            </Text>
        </View>
    );

    const renderBBoardContent = ({ item }) => (
        <View style={styles.bboardContentContainer}>
            <Text style={{ fontSize: 32 }}>{item.title}</Text>
            <Text style={{ fontSize: 20 }}>{item.text}</Text>
        </View>
    )

    if (initializing) {
        getBBoardName()
        setSelected()
        setInitializing(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={styles.headerContainer}>
                <Text style={{ color: "red", fontSize: 36 }}>BBViewer</Text>
            </View>
            <View style={{ flexDirection: "row", height: 50 }}>
                <Text
                    style={styles.refreshButton}
                    onPress={() => { getBBoardName() }}
                >
                    REFRESH BBOARDS
                </Text>
                <View style={{ paddingBottom: 5 }}>
                    <FlatList
                        data={BBoardNames}
                        renderItem={renderBBoardNames}
                        keyExtractor={(item) => item}
                        alignItems="flex-start"
                        horizontal={true}
                    />
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 32 }}>Seleted bboard:</Text>
                <Text style={{ fontSize: 32, backgroundColor: "black", color: "red" }}>
                    {selected}
                </Text>
            </View>

            <FlatList
                data={BBoardContent}
                renderItem={renderBBoardContent}
                keyExtractor={(item) => item._id}
            />

            <Text>DEBUGGING</Text>
            <Text>bb:{selected}</Text>
            <Text>show:false</Text>
            <Text> bbs.length = {BBoardNames.length}</Text>
            <Text>posts = {JSON.stringify(BBoardContent)}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        height: "10%"
    },
    refreshButton: {
        backgroundColor: "blue",
        color: "white",
        fontSize: 16,
        textAlignVertical: "center",
        padding: 5
    },
    bboardNameContainer: {
        backgroundColor: "black",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 8
    },
    BBoardNameText: {
        fontSize: 16,
        color: "red"
    },
    bboardContentContainer: {
        backgroundColor: "lightgray",
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 15,
        width: "80%"
    }
});

export default App;
