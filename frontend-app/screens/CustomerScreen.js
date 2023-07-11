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

const CustomerScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState();
  const [fail, setFail] = useState(false);
  const [properties, setProperties] = useState([]);
  const userId = props.route.params.phone;

  const [show, setShow] = useState(true);
  const [booking, setBooking] = useState([booking, setBooking]);

  useEffect(() => {
    const data = {
      phone: userId
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`${variables.API_CUST_GET}`, options).then((response)=>{
      if(response.status !== 200 && response.status !== 201){
        Alert.alert(
          'Something wrong at our side!',
          'We regret the inconvience caused.',
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
      }
      return response.json();
    }).then(data => {
      // console.log(data);
      setProfileDetails(data);

      return data;
    })
    .then((d) => {
      console.log(d.pincode);
      const data = {
        pincode: d.pincode
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      // console.log(JSON.stringify(data));
      fetch(`${variables.API_PROPCUST_GET}`, options).then((response)=>{
        if(response.status !== 200 && response.status !== 201){
          Alert.alert(
            'Something wrong at our side!',
            'We regret the inconvience caused.',
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
        }
        return response.json();
      }).then(data => {
        // console.log(data);
        setProperties(data);
        setLoading(false);
      })
  })
  }, [])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* <HeaderIn /> */}
      <Text style={styles.textStyle}>Welcome, {profileDetails?.name}!</Text>
      {/* <MapView style={styles.map} /> */}
      {loading?
        <ActivityIndicator size="large" color="#0000ff" />
      :null}
    <ScrollView 
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
    {
      properties.map((data) => {
        return (
          <View>
            <Card title="CARD WITH DIVIDER">
            {/* <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: u.avatar }}
            /> */}
            <Text style={styles.textProp}>Parking Address: {data.prop_address}</Text>
            <View style={styles.slotStyle}>
              <Text style={styles.textProp}>Slots: {data.slots}</Text>
              <TouchableOpacity activeOpacity = {0.5} style = {styles.buttonStyle} onPress = {() => {props.navigation.navigate('BOOKING SLOT', {userData: profileDetails, slotDetails: data})}}><Text style = {{color: '#fcfcfc'}}>BOOK</Text></TouchableOpacity>
            </View>
            </Card>
          </View>
        );
      })
    }

  </ScrollView>

    </View>
  );
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
    // flexDirection: "row",
    justifyContent: "center",
  },
  slotStyle:{
    flexDirection: "row",
    justifyContent: "space-evenly",
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
    fontWeight: 'bold',
    margin: '4%',
  },
  buttonStyle: {
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      // paddingHorizontal: 32,
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

export default CustomerScreen;
