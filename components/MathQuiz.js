import React, { useReducer, useState, useRef } from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput, Pressable, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const styles = StyleSheet.create({
    input: {
        height: 80,
        fontSize: 64,
    },
    output: {
        padding: 0,
        fontSize: 16,
    },
    button: {
        textAlign: "center",
        textAlignVertical: "center",
    },
    show_answer: {
        fontSize: 36,
        color: "red",
        paddingLeft: 5
    }
})

const App = ({ n }) => {
    const [x, setX] = useState(RandomInt(n + 1));
    const [y, setY] = useState(RandomInt(n + 1));
    const [answer, setAnswer] = useState("");    // answer of a question by user
    const [correct, setCorrect] = useState(0);  // number of questions answered correctly
    const [answered, setAnswered] = useState(0);    // number of questions answered
    const [result, setResult] = useState("waiting");    // result of one question
    const [showDebug, setShowDebug] = useState(false);  // whether to show debug info

    const showAnswer = () => {    // generate result text of an answer
        if (result === "correct") {
            return (
                <View style={{ alignItems: "flex-start" }}>
                    <Text style={styles.show_answer}>
                        Correct!!
                    </Text>
                    <Button
                        color="green"
                        style={styles.button}
                        onPress={() => {
                            setX(RandomInt(n + 1))
                            setY(RandomInt(n + 1))
                            setResult("waiting")
                            setAnswer("")
                        }}
                        title="NEXT QUESTION"
                    />
                </View>
            )
        } else if (result === "incorrect") {
            var ans = x * y
            return (
                <View style={{ alignItems: "flex-start" }}>
                    <Text style={styles.show_answer}>
                        Sorry, answer was {ans}, try again!
                    </Text>
                    <Button
                        color="green"
                        style={[styles.button, {alignSelf: "center"}]}
                        onPress={() => {
                            setX(RandomInt(n + 1))
                            setY(RandomInt(n + 1))
                            setResult("waiting")
                            setAnswer("")
                        }}
                        title="NEXT QUESTION"
                    />

                </View>
            )
        } else {
            return (
                <View style={{ alignItems: "flex-start" }}>
                    <Button
                        color="red"
                        style={styles.button}
                        onPress={() => {
                            if (answer === "") {
                                setResult("incorrect")
                            } else if (Number(answer) === x * y) {
                                setResult("correct")
                                setCorrect(correct + 1)
                                storeCorrect(correct + 1)
                            } else {
                                setResult("incorrect")
                            }
                            setAnswered(answered + 1)
                            storeAnswered(answered + 1)
                        }}
                        title="CHECK ANSWER"
                    />
                </View>
            )
        }
    }

    const debugInfo = () => {
        if (showDebug) {
            return (
                <View style={{ alignItems: "flex-start" }}>
                    <Button
                        color="green"
                        title="HIDE DEBUG INFO"
                        onPress={() => setShowDebug(false)}
                    />
                    <Text>
                        x: {x}
                    </Text>
                    <Text>
                        y: {y}
                    </Text>
                    <Text>
                        answer: {answer}
                    </Text>
                    <Text style={{paddingLeft: 5}}>
                        correct: {x * y}
                    </Text>
                    <Text style={{paddingLeft: 5}}>
                        answered: {answered}
                    </Text>
                    <Text style={{paddingLeft: 5}}>
                        result: {result}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{ alignItems: "flex-start" }}>
                    <Button
                        color="green"
                        title="SHOW DEBUG INFO"
                        onPress={() => setShowDebug(true)}
                    />
                </View>
            )
        }
    }

    const percentCorrect = () => {
        return (correct / answered * 100).toFixed(1)
    }

    const storeCorrect = async (value) => {
        try {
            await AsyncStorage.setItem('@correct', value)
        } catch (e) {
            console.log(e)
        }
    }

    const storeAnswered = async (value) => {
        try {
            await AsyncStorage.setItem('@answered', value)
        } catch (e) {
            console.log(e)
        }
    }

    const readCorrect = async () => {
        try {
            const value = await AsyncStorage.getItem('@correct')
            if (value !== null) {
                setCorrect(Number(value))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const readAnswered = async () => {
        try {
            const value = await AsyncStorage.getItem('@answered')
            if (value !== null) {
                setAnswered(Number(value))
            }
        } catch (e) {
            console.log(e)
        }
    }

    readCorrect()
    readAnswered()

    return (
        <ScrollView>
            <Text style={{ color: "blue", fontSize: 64 }}>
                Math Quiz for numbers between 0 and 12
            </Text>
            <Text style={{ fontSize: 40 }}>
                Calculate the product of the following two numbers:
            </Text>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={{ paddingLeft: 10, fontSize: 64 }}>
                    {`${x} * ${y} =`}
                </Text>
                <TextInput
                    style={[styles.input]}
                    onChangeText={(ans) => setAnswer(ans)}
                    placeholder={"???"}
                    value={answer}
                />
            </View>
            {showAnswer()}
            <Text>
                Correct: {correct}
            </Text>
            <Text>
                Answered: {answered}
            </Text>
            <Text>
                Percent Correct: {percentCorrect()}
            </Text>
            {debugInfo()}

        </ScrollView>
    );
};

export default App;