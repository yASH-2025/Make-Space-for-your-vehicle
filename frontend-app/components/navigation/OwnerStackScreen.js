import { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreenCust from "../../screens/LoginScreenCust";
import RegisterScreenCust from "../../screens/RegisterScreenCust";
import CustomerScreen from "../../screens/CustomerScreen";
import RegisterScreenOwner from "../../screens/RegisterScreenOwner";
import LoginScreenOwner from "../../screens/LoginScreenOwner";
import PropertiesSCreen from "../../screens/PropertiesScreen";

const OwnerStack = createNativeStackNavigator();

//importing components:

export default function OwnerStackScreen() {
  return (
    <OwnerStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <OwnerStack.Screen name="OWNER LOGIN" component={LoginScreenOwner} />
      <OwnerStack.Screen
        name="OWNER REGISTRATION"
        component={RegisterScreenOwner}
      />
      <OwnerStack.Screen
        name="PARKING SLOTS"
        component={PropertiesSCreen}
      />
    </OwnerStack.Navigator>
  );
}
