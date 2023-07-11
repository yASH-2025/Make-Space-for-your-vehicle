import React from 'react';

import {View, StyleSheet, Image} from 'react-native';

const OwnerLogo = props => {
    return (
        <View>
        <Image style={styles.profleLogo} source={require("../assets/ownerLogo.jpg")} />
        </View>
    )
};

const styles = StyleSheet.create({
    profleLogo: {
        marginTop: '14%',
        marginBottom: "10%",
        width: 50,
        height: 50,
        backgroundColor: '#1988da',
    },
});

export default OwnerLogo;