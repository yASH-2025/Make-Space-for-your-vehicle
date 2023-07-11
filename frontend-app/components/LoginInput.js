import React from "react";

import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";

const LoginInput = (props) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleUserIdChange = (text) => {
    setUserId(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <ScrollView>
      <TextInput
        style={styles.inputText}
        placeholder="USER ID / PHONE NUMBER"
        onChangeText={handleUserIdChange}
        value={userId}
      />
      <TextInput
        style={styles.inputText}
        placeholder="PASSWORD"
        secureTextEntry={true}  
        onChangeText={handlePasswordChange}
        value={password}
      />
    
      <TouchableOpacity activeOpacity = {0.5} onPress={props.onAuthReq.bind(this, userId, password)}><Text style = {styles.textStyle}>LOGIN</Text></TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputText: {
    margin: '5%',
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
  }
});

export default LoginInput;
