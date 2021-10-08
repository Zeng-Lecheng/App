import React, {useState} from 'react';
import { Image, ScrollView, Text, StyleSheet, View, TextInput, Pressable } from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
};

const styles = StyleSheet.create({
    outer: {
        padding: 45,
    },
    input: {
      borderWidth: 1,
      borderColor: "black",
      height: 20,
      fontSize: 16
    },
    output: {
      padding: 10,
      fontSize: 16,
      fontFamily: "Times New Roman"
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      elevation: 3,
      height: 40,
      width: 200,
      backgroundColor: '#CA6510',
    },
})

const App = () => {
  // const [number, setNumber] = useState(0);
  const [text, setText] = useState("default");
  const [button, setButton] = useState();
  var uuu = "uuu"
  return (
  <View style={styles.outer}>
    <TextInput 
      style={styles.input} 
      defaultValue="0"
      onChangeText={(t) => setText(t)}
      defaultValue={"ddd"}
    />
    <Pressable 
      style={styles.button}
      onPress={() => setButton(text)}
    >
      <Text style={{color: "#fff"}}>
        {"Test"}
      </Text>
    </Pressable>
    <Text>
      {button}
    </Text>
  </View>
  );
};

export default App;