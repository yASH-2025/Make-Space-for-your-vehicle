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
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";

//importing components:
import LoginInput from "../components/LoginInput";
import ProfileImage from "../components/ProfileImage";
import HeaderIn from "../components/HeaderIn";

import * as variables from "../allVariables.js";

const LoginScreenCust = (props) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [fail, setFail] = useState(false);

  const submitHandler = (userId, password) => {
    setAuth(false);
    setLoading(true);
    console.log(userId);
    console.log(password);
    const data = {
      phone: userId,
      password: password
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    // console.log(variables.API_CUST_LOGIN);
    fetch(`${variables.API_CUST_LOGIN}`, options).then((response) => {
      console.log(response.status);

      if(response.status !== 200 && response.status !== 201){
        setAuth(false);
        Alert.alert(
          'Incorrect Phone Number/Password',
          '',
          [
            {
              text: 'Try Again',
            },
          ],
          {
            cancelable: true,
            onDismiss: () => setFail(true)
          },
        )
        return -1;
      }
      else
        return response.json();
    }).then((data) => {
      if(data !== -1){
        console.log(data);
        const temp = {
          vehicle_reg_no: data.vehicle
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(temp),
        };

        fetch(`${variables.API_CURR_BOOKING}`, options).then((response) => {
          // console.log(data.vehicle);
          console.log(response.status);
          if(response.status !== 200 && response.status !== 201){
            props.navigation.navigate("FIND PARKING SLOT", {phone : userId});
            setAuth(true);
            setFail(false);
            return -1;
          }

          else 
            return response.json();          
        }).then((d1)=>{
          if(d1!==-1){
            console.log(d1);
            props.navigation.navigate("BOOKING END", {price : d1.price, userData: data});
          }
          setLoading(false);
        })
    }})
  };

  return (
    <View style={styles.container}>
      {/* <HeaderIn /> */}
      <ProfileImage></ProfileImage>
      {loading?
        <ActivityIndicator size="large" color="#0000ff" />
      :null}
      <Text>Don't have an account?</Text>
      <TouchableOpacity title = 'REGISTER' onPress = {() => props.navigation.navigate("CUSTOMER REGISTRATION")} ><Text style = {styles.textStyle}>REGISTER</Text></TouchableOpacity>
      <Text></Text>
      <LoginInput onAuthReq={submitHandler}></LoginInput>
      {/* {auth ? props.navigation.navigate("FIND PARKING SLOT", id):null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: "30%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
  },
  textStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    textAlign: 'center',
    backgroundColor: '#1988da',
    color: 'white',
    marginTop: 20,
  }
});

export default LoginScreenCust;
