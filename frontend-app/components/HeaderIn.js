import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AppLogo from './AppLogo'
import { Dimensions } from "react-native";
// import { useFonts, Sacramento_400Regular } from '@expo-google-fonts/sacramento'

var width = Dimensions.get('window').width; //full width

export default function HeaderIn() {

  return (
      <View style = {styles.headerStyle}>
        <AppLogo/>
        <View>
          <Text style = {[styles.textStyle,  {paddingTop: getStatusBarHeight()}]}>AutoSpot</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    // top: getStatusBarHeight(),
    backgroundColor: '#1988da',
    width: width,
    // height: '13%',
    // marginBottom: "5%",
    flexDirection: "row",
    // justifyContent: 'center',

  },
  textStyle: {
    // paddingTop: '13%',
    fontSize: 23,
    // textAlign: 'center',
    color: '#fcfcfc',
    fontWeight: 'bold',
    // fontFamily: 'Satisfy_500Medium',
  },
  // image: {
  //   width: 24,
  //   height: 24,
  // },
})