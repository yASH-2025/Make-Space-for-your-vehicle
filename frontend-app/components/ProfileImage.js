import React from 'react';

import {View, StyleSheet, Image} from 'react-native';

const ProfileImage = props => {
    return (
        <View>
        <Image style={styles.profleLogo} source={require("../assets/profile.png")} />
        </View>
    )
};

const styles = StyleSheet.create({
    profleLogo: {
        marginTop: '10%',
        marginBottom: "10%",
        width: 100,
        height: 100,
        backgroundColor: '#1988da',
        borderRadius: 60,
    },
});

export default ProfileImage;