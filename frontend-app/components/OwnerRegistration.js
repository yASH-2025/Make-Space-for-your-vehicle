import React, { useState } from "react";
import { Button, StyleSheet, TextInput , Text, Alert} from "react-native";
// import Parse from "parse/react-native";

const API_URL = 'http://172.16.132.90:500/api/owners/';

const OwnerRegistration = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");


  return (
    <>
      <Text style = {{fontWeight:"bold", fontSize:20}}>Owner</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder={"Name"}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        value={phone}
        placeholder={"Phone No."}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        value={address}
        placeholder={"Address"}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"Password"}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={"Register"} onPress={props.onRegister.bind(this, name, phone, address,password)} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: '5%',
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 10
  },
});

export default OwnerRegistration;