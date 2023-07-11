import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

//importing components:

import LoginScreenCust from "./screens/LoginScreenCust";
import RegisterScreenCust from "./screens/RegisterScreenCust";
import Home from "./screens/Home";

export default function App() {
  const [text, setText] = useState(
    "Make Space For Your Vehicle App is currently under development..!"
  );

  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name = 'HOME' component = {Home} />
    //     <Stack.Screen name = 'CUSTOMER REGISTRATION' component = {RegisterScreenCust} />
    //     <Stack.Screen name = 'FIND PARKING SLOT' component = {RegisterScreenCust} />

    //   </Stack.Navigator>
    // </NavigationContainer>
    <View  style = {styles.container}>
      <Home />
    </View>
    // <View>
    //   <LoginScreen/>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: '50%',
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
