import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Vehicle = props => {
    return (
        //TouchableHighlight, TouchableNativeFeedback can also be used instead of TouchableOpacity
        <TouchableOpacity activeOpacity = {0.5} onPress={props.onDelete.bind(props.key)}>
            <View style = {styles.listItem}>
                <Text>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    }
});

export default Vehicle;