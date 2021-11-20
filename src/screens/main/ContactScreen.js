import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

 const ContactScreen = (props)=> {
  // useNavigationButtonPress(() => {
  //  alert('popup')
  // });

    return (
      <View style={style.root}>
        <Text>ContactScreen</Text>
      </View>
    );
}

export default ContactScreen;


const style = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
