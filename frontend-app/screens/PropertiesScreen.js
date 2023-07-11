import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput , Text, Alert, FlatList, Item, View, Box, BackHandler, ScrollView, TouchableOpacity} from "react-native";
import * as variables from "../allVariables.js";

const PropertiesSCreen = (props) => {
    const phone = props.route.params.phone
    const[properties, setProperties] = useState([])
    const[propAdd, setPropAdd] = useState(false)
    const[address, setAddress] = useState('')
    const[pincode, setPincode] = useState('')
    const[slots, setSlots] = useState(0)
    const[refresh, setRefresh] = useState(false)
    const[owner, setOwner] = useState()

    const handle = () => {
        if(refresh) setRefresh(false);
        else setRefresh(true)
    }

    const propFormHandler = () => {
        setPropAdd(true);
    }

    const addProperty = () => {
        const owner_id = owner._id
        const prop_address = address
        const payload = {
            owner_id,
            prop_address,
            pincode,
            slots
        };
        fetch(`${variables.API_PROP}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            const jsonRes = await res.json();
            if (res.status == 201 || res.status == 200) {
                const mess = 'Property added successfully!!'
                Alert.alert('Owner', mess, [
                    {text: 'OK'},
                ]);
                setPropAdd(false)
                setAddress('')
                setPincode('')
                setSlots(0)
                handle();

            } else {
                Alert.alert('Owner', jsonRes.message, [
                    {text: 'OK'},
                ]);
                console.log('called')
            }
            console.log(res.status)
        })
    }

    useEffect(() => {
        fetch(`${variables.API_GET_OWNER}/${phone}`).then((response)=>{
            return response.json();
        }).then((data)=>{
            setOwner(data);

            fetch(`${variables.API_PROP}/get/${data._id}`).then((response)=>{
                return response.json();
            }).then((data)=>{
                setProperties(data);
            })
        })
      }, [refresh])

    const deleteProperty = (id) => {
        console.log(id)
        fetch(`${variables.API_PROP_DELETE}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async res => { 
            const jsonRes = await res.json();
            if (res.status == 201 || res.status == 200) {
                const mess = 'Property deleted successfully!!'
                Alert.alert('Owner', mess, [
                    {text: 'OK'},
                ]);
                handle();
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
        <View style = {styles.whole}>
            {/* <View style = {{marginTop: 10}}><Button title={"Add property"} onPress={propFormHandler}/> */}
      <TouchableOpacity onPress = {propFormHandler} ><Text style = {styles.textStyle}>Add Property</Text></TouchableOpacity>

            {/* </View> */}
            {propAdd && 
            <View>
                <TextInput
                    style={styles.input}
                    value={address}
                    placeholder={"Address"}
                    onChangeText={(text) => setAddress(text)}
                />
                <TextInput
                    style={styles.input}
                    value={pincode}
                    placeholder={"Pincode"}
                    onChangeText={(text) => setPincode(text)}
                />
                <TextInput
                    style={styles.input}
                    value={slots}
                    placeholder={"Slots"}
                    onChangeText={(text) => setSlots(text)}
                />
                {/* <Button title={"Add"} onPress={addProperty}/> */}
                <TouchableOpacity onPress = {addProperty} ><Text style = {styles.textStyle}>Add</Text></TouchableOpacity>

            </View>
            }

            <View style = {styles.container}>
                    <Text>Address</Text>
                    <Text>Slots</Text>
                    <Text>Delete</Text>
                </View>
    
                <FlatList
                    data = {properties}
                    renderItem = {itemData => (
                    <View style = {styles.propContainer}>
                        <Text>{itemData.item.prop_address}</Text>
                        <Text>{itemData.item.slots}</Text>
                        <Button title="-" onPress={deleteProperty.bind(this, itemData.item._id)}/>
                    </View>
                    )}
                />
        </View>
    );
}
const styles = StyleSheet.create({
    propContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        width: 300,
        borderWidth: 2,
        borderRadius: 10,
        margin: 3,
        backgroundColor: 'lightgrey'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        width: 300,
        marginTop: 4,
        marginBottom: 3
    },
    input: {
        margin: '5%',
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        width: 250,
      },
    whole: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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


export default PropertiesSCreen;
