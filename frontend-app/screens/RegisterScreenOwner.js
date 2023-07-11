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
import OwnerRegistration from "../components/OwnerRegistration";

const API_URL = 'http://172.20.10.3:5000/api/owners/';

const RegisterScreenOwner = (props) => {
  const [loading, setLoading] = useState(false);

  const submit = (name, phone, address, password) => {
    const payload = {
        name,
        phone,
        address,
        password
    };
    fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(async res => { 
      const jsonRes = await res.json();
      if (res.status == 201 || res.status == 200) {
          const mess = 'Owner registered successfully!!'
          Alert.alert('Owner', mess, [
              {text: 'OK'},
          ]); 
          const redirect = () => {
            props.navigation.goBack();
          }
          redirect();
      } else {
          Alert.alert('Owner', jsonRes.message, [
              {text: 'OK'},
          ]);
          console.log('called')
      }
      console.log(res.status)

    })
  }

  return (
    <View style={styles.container}>
      <OwnerRegistration onRegister={submit}/>
      {loading?
        <ActivityIndicator size="small" color="#0000ff" />
      :null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    justifyContent: "center",
  },
});

export default RegisterScreenOwner;