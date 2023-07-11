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
import { useState, useEffect } from "react";
import MapView from 'react-native-maps';

//importing components:
import * as variables from "../allVariables";
import { Card, ListItem, Icon } from 'react-native-elements'

const BookingScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(props.route.params.userData);
  const [fail, setFail] = useState(false);
  const [slot, setSlot] = useState(props.route.params.slotDetails);
//   const userId = props.route.params.phone;

  const handlePayment = () => {
    const data = {
        prop_id: slot._id,
        owner_id: slot.owner_id,
        customer_id: profileDetails._id,
        vehicle_reg_no: profileDetails.vehicle,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(`${variables.API_NEW_BOOKING}`, options).then((response)=>{
        console.log(response);
        if(response.status !== 200 && response.status !== 201){
          Alert.alert(
            'No more slots left. Please see other parking locations in your area. Thanks!',
            '',
            [
              {
                text: 'OK',
              },
            ],
            {
              cancelable: true,
              // onDismiss: () => props.navigation.go_back()
            },
          )
          return response.json();
        }
        else{
        Alert.alert(
            'PAYMENT SUCCESSFUL. Thanks!',
            '',
            [
            {
                text: 'OK',
                onPress: () => {
                  console.log("Hi");
                  const temp = {
                    vehicle_reg_no: profileDetails.vehicle
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
                      console.log(d1['price']);
                      props.navigation.navigate("BOOKING END", {price : d1.price, userData: profileDetails});
                    }
                    setLoading(false);
                    // props.navigation.navigate('BOOKING END', {userData: profileDetails, })
                  })
              }
            },
            ],
            {
            cancelable: true,
            },
        )
        }
        setLoading(false);
      })
      
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome, {profileDetails?.name}!</Text>
      <View style = {styles.subContainer}>

      <Card title="CARD WITH DIVIDER">
        <Text style={[styles.textProp,{fontWeight: 'bold'}]}>Parking Address: {slot.prop_address}</Text>
        <Text style={[styles.textProp,{fontWeight: 'bold'}]}>Confirm Details:</Text>
        <Text style={styles.textProp}>Vehicle Number: {profileDetails.vehicle}</Text>
        <Text style={styles.textProp}>Phone Number: {profileDetails.phone}</Text>
        {/* <View style={styles.slotStyle}> */}
        {/* </View> */}
      </Card>
      </View>
      <Text style={styles.textProp}>Hurry Up! You may loose your slot..!</Text>
      <TouchableOpacity activeOpacity = {0.5} style = {styles.buttonStyle} onPress={(() => {setLoading(true); handlePayment()})}><Text style = {{color: '#fcfcfc'}}>PAY $100</Text></TouchableOpacity>
      {loading?
        <ActivityIndicator size="large" color="#0000ff" />
      :null}
    </View>
  )
  };

const styles = StyleSheet.create({
  container: {
    // paddingTop: "30%",
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  subContainer: {
    marginTop: '15%',
    marginBottom: '14%',
    // flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
  },
  slotStyle:{
    // flexDirection: "row",
    // justifyContent: "space-evenly",
  },
  textStyle: {
    fontSize: 25,
    backgroundColor: '#1988da',
    fontWeight: 'bold',
  },
  textProp: {
    textAlign: 'center',
    fontSize: 18,
    // backgroundColor: '#1988da',
    // fontWeight: 'bold',
    margin: '4%',
  },
  buttonStyle: {
      width: '60%',
      alignSelf: 'center',
      alignItems: 'center',
    //   justifyContent: 'center',
      paddingVertical: 12,
    //   paddingHorizontal: 32,
      borderRadius: 20,
      overflow: 'hidden',
      elevation: 3,
      textAlign: 'center',
      backgroundColor: '#1988da',
      color: 'white',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default BookingScreen;