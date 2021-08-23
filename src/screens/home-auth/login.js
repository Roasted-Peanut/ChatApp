import {Theme} from '../../common/theme/theme';
import Logo from '../../components/Logo';
import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import TextInputCus from '../../components/TextInputCus';
import Button from '../../components/Button';
import {showToast} from '../../common/layout/toast.helper';
import {emailValidator, passwordValidator} from '../../modules/auth.validation';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../common/theme/colors';
import {goHome} from '../../navigation/navigation';
import * as AppAction from '../../actions';
import { useDispatch } from 'react-redux';
import { useNavigation } from 'react-native-navigation-hooks';

const Login = props => {
  const {push} = useNavigation();
  const dispatch = useDispatch();
  let ref_input1 = useRef();
  let ref_input2 = useRef();
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] =useState(false)

  if(loading){
    return <ActivityIndicator size='small' color={colors.sky} />
  }
  const _onLoginPressed = async () => {
    
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    try{
      const result = auth().signInWithEmailAndPassword(email.value, password.value).then((user)=>{
        // console.log("CheckResult", user.user.uid)
        // console.log("CheckResult", user.user)
        goHome();
        dispatch(AppAction.login(user.user.uid))
      })
    }
    catch(err){
      alert('Email or Passwrord wrong!')
    }

    // ! dispatch to check loginACT
    // dispatch({
    //   type: typeAuths.login,
    //   payload: { username: email.value, password: password.value },
    // });
    // ! dispatch to login via Firebase
    // dispatch(
    //   loginViaFirebaseACT({ email: email.value, password: password.value })
    // );
  };

  const _onGoogleLoginPressed = () => {
    showToast({
      title: 'Sign in',
      type: 'info',
      message: 'Sorry can not do it',
    });
  };

  return (
      <View style={styles.root}>
        <Toast ref={ref => Toast.setRef(ref)} />
        <Logo />

        <Text style={{alignContent: 'center', fontSize: Theme.size.large}}>
          login
        </Text>

        <TextInputCus
          label="Email or Username"
          returnKeyType="next"
          inputRef={ref => (ref_input1.current = ref)}
          autoFocus={false}
          blurOnSubmit={false}
          onSubmitEditing={() => ref_input2.current.focus()}
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInputCus
          label="Password"
          returnKeyType="done"
          inputRef={ref => (ref_input2.current = ref)}
          onSubmitEditing={()=>_onLoginPressed()}
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          errorText={password.error}
          isPwd
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() =>
              push('ForgotPassword')
            }>
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <Button
          style={{backgroundColor: Theme.colors.primary}}
          onPress={_onLoginPressed}
          disabled={false}>
          {false ? (
            <ActivityIndicator
              style={{opacity: 1}}
              animating={true}
              size="small"
              color="#fff"
            />
          ) : (
            <Text style={styles.text}>Login</Text>
          )}
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>

          <TouchableOpacity
            onPress={() =>
             push('Register')
            }>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>

        <Button
          style={{backgroundColor: Theme.colors.lightGreyColor}}
          onPress={_onGoogleLoginPressed}>
          <Text style={styles.text}>Google Sign-In</Text>
        </Button>
      </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 4,
  },
  label: {
    fontFamily: Theme.fontFamily.GilroyLight,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    fontFamily: Theme.fontFamily.GilroySemiBold,
    color: Theme.colors.primary,
  },
  text: {
    fontFamily: Theme.fontFamily.GilroySemiBold,
    color: Theme.colors.secondary,
  },
});
