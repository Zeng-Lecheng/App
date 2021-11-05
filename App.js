import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [inputID, setInputID] = useState("");
  const [show, setShow] = useState(false);
  const [repoData, setRepoData] = useState([{"name": "NONE"}]);

  const getGithub = (userID) => {
    axios.get(`https://api.github.com/users/${userID}/repos`)
      .then((response) => {
        setRepoData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  );

  const toggleShow = () => {
    if (show) {
      return (
        <View style={{ padding: 5 }}>
          <Text
            style={styles.toggle}
            onPress={() => {
              setShow(false);
              setRepoData([{"name": "NONE"}]);
            }}
          >
            hide repositories
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{ padding: 5 }}>
          <Text
            style={styles.toggle}
            onPress={() => {
              setShow(true);
              getGithub(inputID);
            }}
          >
            show repositories
          </Text>
        </View>
      );
    };
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{ height: 105, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "red", fontSize: 42 }}>Github Viewer</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.input}> github Id: </Text>
        <TextInput
          onChangeText={(t) => { setInputID(t); }}
          value={inputID}
          style={styles.input}
          placeholder={"userid"}
        />
      </View>
      {toggleShow()}
      <FlatList
        data={repoData}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        alignItems="flex-start"
      />
      <Text style={styles.debug}>DEBUGGING</Text>
      <Text style={styles.debug}>userId: {inputID}</Text>
      <Text style={styles.debug}>showReps: {`${show}`}</Text>
      <Text style={styles.debug}> repos.length: {repoData.length}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  debug: {
    fontSize: 16,
  },
  toggle: {
    fontSize: 24,
    color: "blue" 
  },
  input: {
    fontSize: 32
  }
});

export default App;
