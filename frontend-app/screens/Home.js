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
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState, useRef } from "react";

//importing components:
import HeaderIn from "../components/HeaderIn";

import * as variables from "../allVariables.js";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomerStackScreen from "../components/navigation/CustomerStackScreen";
import OwnerStackScreen from "../components/navigation/OwnerStackScreen";
import CustomerLogo from "../components/CustomerLogo";
import OwnerLogo from "../components/OwnerLogo";

const Home = (props) => {
  const Tab = createBottomTabNavigator();

  return (
    <View >
      <HeaderIn style={styles.container}/>
      <NavigationContainer >
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarStyle: { height: '9%'},
        }}>
          <Tab.Screen name="CUSTOMER" component={CustomerStackScreen} options={{
          tabBarIcon: ({ color }) => (
            <CustomerLogo></CustomerLogo>
         ), 
         tabBarLabel: 'CUSTOMER'             
        }}/>
          <Tab.Screen name="OWNER" component={OwnerStackScreen} options={{
          tabBarIcon: ({ color }) => (
            <OwnerLogo></OwnerLogo>
         ), 
         
         tabBarLabel: 'OWNER'             
        }}/>
        </Tab.Navigator>
      </NavigationContainer>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {}
});

export default Home;
