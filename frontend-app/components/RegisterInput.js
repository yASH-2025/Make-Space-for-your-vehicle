import React from "react";

import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";

const RegisterInput = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [password, setPassword] = useState('');
  const [againPass, setAgainPass] = useState('');
  const [pincode, setPincode] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };
  const handlePhoneChange = (text) => {
    setPhone(text);
  }
  const handleAddressChange = (text) => {
    setAddress(text);
  };
  const handlePincodeChange = (text) => {
    setPincode(text);
  };
  const handleVehicleChange = (text) => {
    setVehicle(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleAgainPassChange = (text) => {
    setAgainPass(text);
  };

  return (
    <View>
      <Text style = {styles.headStyle}>CREATE A NEW ACCOUNT</Text>
    {/* <Text> All fields are MANDATORY for submission of this form** </Text> */}
    <ScrollView>
      <TextInput
        style={styles.inputText}
        placeholder="ENTER FULL NAME"
        onChangeText={handleNameChange}
        value={name}
      />
      <TextInput
        style={styles.inputText}
        placeholder="ENTER ADDRESS"
        onChangeText={handleAddressChange}
        value={address}
      />
      <TextInput
        style={styles.inputText}
        placeholder="ENTER PINCODE"
        onChangeText={handlePincodeChange}
        value={pincode}
      />
      <TextInput
        style={styles.inputText}
        placeholder="ENTER PHONE NUMBER"
        onChangeText={handlePhoneChange}
        value={phone}
      />
      <TextInput
        style={styles.inputText}
        placeholder="ENTER VEHICLE REGISTRATION NUMBER"
        onChangeText={handleVehicleChange}
        value={vehicle}
      />
      <TextInput
        style={styles.inputText}
        placeholder="PASSWORD"
        secureTextEntry={true}  
        onChangeText={handlePasswordChange}
        value={password}
      />
      <TextInput
        style={styles.inputText}
        placeholder="PASSWORD"
        secureTextEntry={true}  
        onChangeText={handleAgainPassChange}
        value={againPass}
      />
      <TouchableOpacity activeOpacity = {0.5} style = {styles.buttonStyle} title="REGISTER" onPress={props.onRegister.bind(this, name, phone, address, pincode, vehicle, password, againPass)}><Text style = {styles.textStyle}>REGISTER</Text></TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    margin: '3%',
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    overflow: 'hidden',
    padding: 18,
    width: '90%',
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
    color: 'white'
  },
  headStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '2%',
    marginBottom: '3%',
    color: '#1988da',
    fontWeight: 'bold',
  }
});

export default RegisterInput;
