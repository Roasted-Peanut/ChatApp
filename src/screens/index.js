import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import {Theme} from '../common/theme/theme';
import Logo from '../components/Logo';
import {goAuth} from '../navigation/navigation';
import * as AppAction from '../actions';


const HomeAuth = props => {
  const dispatch = useDispatch();
  const _goToAuth = () => {
    goAuth();
    dispatch(AppAction.appintro());
  };
  
  // const {isRegister} = useSelector(state => state.auth);
  return (
    <View
      style={{
        flex: 1,
      
        // alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor:Theme.colors.lBlack,
        alignItems: 'center'
      }}>
      <Logo />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: Theme.fontFamily.QuicksandSemiBold,
          fontSize: Theme.size.large,
          paddingBottom: 20,
        }}>
        Get your groceries with nectar
      </Text>
      <Button
        style={{backgroundColor: Theme.colors.primary,  width: '90%',}}
        onPress={() => _goToAuth()}>
        <Text style={styles.text}>SignUp</Text>
      </Button>
      {/* <Button
        style={{backgroundColor: Theme.backgrounds.paper}}
        onPress={() => {}}>
        <Text style={[styles.text, {color: Theme.colors.primary}]}>
          Register
        </Text>
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Theme.fontFamily.QuicksandSemiBold,
    fontSize: 15,
    color: Theme.backgrounds.white,
  },
});

export default HomeAuth;
