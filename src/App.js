import React from 'react';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import {Image, StyleSheet, Text, View} from 'react-native';

const App = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Pokerman</Text>
        <Image blurRadius={10} style={styles.image} source={require("../assets/main-screen-1.jpg")} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    position: "absolute",
    margin: 20,

  },
  image: {
    flex: 1,
    resizeMode: "contain"
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

registerRootComponent(App)
export default App;
