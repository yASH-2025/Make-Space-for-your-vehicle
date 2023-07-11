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
  RefreshControl,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import MapView from 'react-native-maps';

//importing components:
import * as variables from "../allVariables";
import { Card, ListItem, Icon } from 'react-native-elements'

const BookingEndScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState(props.route.params.userData);
  const [fail, setFail] = useState(false);
  const [price, setPrice] = useState(props.route.params.price);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if(price === null)
    setPrice(0);
//   const userId = props.route.params.phone;
  useEffect(() => {
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
        return -1;
      }

      else 
        return response.json();          
    }).then((d1)=>{
      if(d1!==-1){
        setPrice(d1.price);
      }
      setLoading(false);
    })
  },[refreshing])

  const endPayment = () => {
    const data = {
        vehicle_reg_no: profileDetails.vehicle,
      };
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      fetch(`${variables.API_END_BOOKING}`, options).then((response)=>{
        console.log(response.status);
        if(response.status !== 200 && response.status !== 201 || response.status === 404){
          Alert.alert(
            'Payment Unsuccessful.',
            'Due to Server Issue!',
            [
              {
                text: 'OK',
              },
            ],
            {
              cancelable: true,
            },
          )
        }
        else{
            Alert.alert(
                `Payment Successful on DATE: ${new Date()}. `,
                'You can show this to security there. Thanks!',
                [
                  {
                    text: 'OK',
                  },
                ],
                {
                  cancelable: true,
                },
              )
              props.navigation.navigate("FIND PARKING SLOT", {phone : profileDetails.phone});
        }
     setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome, {profileDetails?.name}!</Text>

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.textProp}>Pull down to refresh price!</Text>
      <View style = {styles.subContainer}>
      <Card title="CARD WITH DIVIDER">
        <Text style={[styles.textProp,{fontWeight: 'bold'}]}>On Going Booking:</Text>
        <Text style={styles.textProp}>Vehicle Number: {profileDetails.vehicle}</Text>
        <Text style={styles.textProp}>Phone Number: {profileDetails.phone}</Text>

        {/* <View style={styles.slotStyle}> */}
        {/* </View> */}
      </Card>
      </View>
      <Text style={styles.textProp}>Please pay remaining amount to end the booking.</Text>
      <TouchableOpacity activeOpacity = {0.5} style = {styles.buttonStyle} onPress = {() => {setLoading(true); endPayment();}}><Text style = {{color: '#fcfcfc'}}>PAY ${price}</Text></TouchableOpacity>
      {loading?
        <ActivityIndicator size="large" color="#0000ff" />
      :null}
      </ScrollView>
    </View>
  );
}

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

export default BookingEndScreen;