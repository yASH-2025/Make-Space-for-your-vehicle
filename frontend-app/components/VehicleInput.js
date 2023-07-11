import React from "react";

import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState, useRef } from "react";

const VehicleInput = (props) => {
  const [vehicleNo, setVehicleNo] = useState('');

  const handleTextChange = (text) => {
    setVehicleNo(text);
  };

  return (
    <View style={styles.subContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="Vehicle Registration Number"
        onChangeText={handleTextChange}
        value={vehicleNo}
      />
      <Button title="ADD" onPress={props.onUpdateVehicleList.bind(this, vehicleNo)} />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
  subContainer: {
    // flexDirection: "row",
    justifyContent: "center",
  },
});

export default VehicleInput;
