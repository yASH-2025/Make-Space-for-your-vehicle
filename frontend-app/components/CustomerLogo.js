import React from 'react';

import {View, StyleSheet, Image} from 'react-native';

const CustomerLogo = props => {
    return (
        <View>
        <Image style={styles.profleLogo} source={require("../assets/customerLogo.png")} />
        </View>
    )
};

const styles = StyleSheet.create({
    profleLogo: {
        marginTop: '12%',
        marginBottom: "10%",
        width: 30,
        height: 30,
        backgroundColor: '#1988da',
    },
});

export default CustomerLogo;