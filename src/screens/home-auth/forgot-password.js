
import Logo from '../../components/Logo';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import TextInputCus from '../../components/TextInputCus';
import Button from '../../components/Button';
import {Theme} from '../../common/theme/theme';

import {emailValidator} from '../../modules/auth.validation';
import {Navigation} from 'react-native-navigation';

const ForgotPassword = props => {
  const [email, setEmail] = useState({value: '', error: ''});

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }

    Navigation.push(props.componentId, {
      component: {name: 'Login'},
    });
  };

  return (
    <View style={styles.root}>
      <Logo />

      <Text
        style={{
          textAlign: 'center',
          fontFamily: Theme.fontFamily.QuicksandSemiBold,
          fontSize: Theme.size.large,
          paddingBottom: 20,
        }}>
        Restore Password
      </Text>

      <TextInputCus
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onSubmitEditing={_onSendPressed}
        onChangeText={text => setEmail({value: text, error: ''})}
        // error={!!email.error}
        errorText={email.error}
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button
        style={{backgroundColor: Theme.colors.primary}}
        onPress={_onSendPressed}>
        <Text style={styles.text}>Send Reset Instructions</Text>
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {name: 'Login'},
          })
        }>
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>
      </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: Theme.colors.secondary,
    width: '100%',
    fontFamily: Theme.fontFamily.GilroyExtraBold,
  },
  text: {
    fontFamily: Theme.fontFamily.GilroyExtraBold,
    fontSize: 15,
    color: Theme.backgrounds.white,
  },
});
