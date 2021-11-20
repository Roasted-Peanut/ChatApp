
import Logo from '../../components/Logo';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import TextInputCus from '../../components/TextInputCus';
import Button from '../../components/Button';
import {Theme} from '../../common/theme/theme';
import storage from '@react-native-firebase/storage';
import {
  nameValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  addressValidator,
} from '../../modules/auth.validation';
import {Navigation} from 'react-native-navigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import colors from '../../common/theme/colors';

const Register = props => {
  let ref_input1 = useRef();
  let ref_input2 = useRef();
  let ref_input3 = useRef();
  let ref_input4 = useRef();
  let ref_input5 = useRef();
  let ref_input6 = useRef();
  let ref_input7 = useRef();
  const [name, setName] = useState({value: '', error: ''});
  const [fullName, setFullName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [phone, setPhone] = useState({value: '', error: ''});
  const [address, setAddress] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [allImages, setAllImage] = useState([]);

  const getImage = () =>{
    const ref = storage().ref('default')
    ref.list().then((imgResult)=>{
      setAllImage([]);
      imgResult.items.forEach((itemsRef)=>{
        itemsRef.getDownloadURL().then((downloaduRL)=>{
          setAllImage((allimage)=>[...allimage,downloaduRL])
          console.log("imge",setAllImage)
        })
      })
    })
  }
  // console.log("Image",allImages)
  useEffect(()=>{
    getImage()
   
  },[])
  if(loading){
    return <ActivityIndicator size='small' color={colors.sky} />
  }
  const _onSignUpPressed = async () => {
    setLoading(true)
    const nameError = nameValidator(name.value);
    const fullNameError = nameValidator(fullName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = passwordValidator(confirmPassword.value);
    const phoneError = phoneValidator(phone.value);
    const addressError = addressValidator(address.value);

    if (
      emailError ||
      passwordError ||
      fullNameError ||
      nameError ||
      phoneError ||
      addressError
    ) {
      setName({...name, error: nameError});
      setFullName({...fullName, error: fullNameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setConfirmPassword({...confirmPassword, error: confirmPasswordError});
      setPhone({...phone, error: phoneError});
      setAddress({...address, error: addressError});
      return;
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({...confirmPassword, error: 'Not same password'});
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email.value,
        password.value,
      );
      firestore().collection('Users').doc(result.user.uid).set({
        name: name.value,
        fullName: fullName.value,
        email: result.user.email,
        phone: phone.value,
        address: address.value,
        uid: result.user.uid,
        avatar: allImages[0],
        status:'online',
      });

      alert('Success!')
     Navigation.push(props.componentId,{component:{name:'Login'}})
     setLoading(false)
    } catch (error) {
      alert('wrong!');
      return
    }

    // dispatch({
    //   type: typeAuths.register,
    //   payload: {
    //     username: name.value,
    //     fullName: fullName.value,
    //     // email: email.value,
    //     password: password.value,
    //     // phone: phone.value,
    //     // addressDetail: address.value,
    //   },
    // });
  };

  // if (isRegister) {
  //   navigation.goBack();
  //   dispatch(resetRegisterACT());
  // }

  return (
    <ScrollView style={{flex: 1}}>
      <Logo />

      <Text
        style={{
          textAlign: 'center',
          fontFamily: Theme.fontFamily.QuicksandSemiBold,
          fontSize: Theme.size.large,
          paddingBottom: 20,
        }}>
        Create account
      </Text>

      {/* {errorRegister != null ? <TextError error={errorRegister} /> : <></>} */}

      <TextInputCus
        label="Username"
        returnKeyType="next"
        inputRef={ref => (ref_input1.current = ref)}
        autoFocus={false}
        blurOnSubmit={false}
        onSubmitEditing={() => ref_input2.current.focus()}
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        errorText={name.error}
      />

      <TextInputCus
        label="Full name"
        returnKeyType="next"
        inputRef={ref => (ref_input2.current = ref)}
        autoFocus={false}
        blurOnSubmit={false}
        onSubmitEditing={() => ref_input3.current.focus()}
        value={fullName.value}
        onChangeText={text => setFullName({value: text, error: ''})}
        errorText={fullName.error}
      />

      <TextInputCus
        label="Email"
        returnKeyType="next"
        inputRef={ref => (ref_input3.current = ref)}
        autoFocus={false}
        blurOnSubmit={false}
        onSubmitEditing={() => ref_input4.current.focus()}
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        errorText={email.error}
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInputCus
        label="Password"
        returnKeyType="next"
        inputRef={ref => (ref_input4.current = ref)}
        autoFocus={false}
        blurOnSubmit={false}
        onSubmitEditing={() => ref_input5.current.focus()}
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        isPwd
      />

      <TextInputCus
        label="Confirm Password"
        returnKeyType="next"
        inputRef={ref => (ref_input5.current = ref)}
        autoFocus={false}
        blurOnSubmit={false}
        onSubmitEditing={() => ref_input6.current.focus()}
        value={confirmPassword.value}
        onChangeText={text => setConfirmPassword({value: text, error: ''})}
        errorText={confirmPassword.error}
        isPwd
      />

      <TextInputCus
        label="Phone"
        returnKeyType="next"
        inputRef={ref => (ref_input6.current = ref)}
        autoFocus={false}
        blurOnSubmit={false}
        onSubmitEditing={() => ref_input7.current.focus()}
        value={phone.value}
        onChangeText={text => {
          setPhone({value: text, error: ''});
        }}
        keyboardType="phone-pad"
        errorText={phone.error}
      />

      <TextInputCus
        label="Address"
        returnKeyType="done"
        inputRef={ref => (ref_input7.current = ref)}
        onSubmitEditing={_onSignUpPressed}
        value={address.value}
        onChangeText={text => setAddress({value: text, error: ''})}
        errorText={address.error}
      />

      <Button
        style={{backgroundColor: Theme.colors.primary}}
        onPress={() => _onSignUpPressed()}
        disabled={false}>
        {false ? (
          <ActivityIndicator
            style={{opacity: 1}}
            animating={true}
            size="small"
            color="#fff"
          />
        ) : (
          <Text style={styles.text}>Register</Text>
        )}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() =>
            Navigation.push(props.componentId, {
              component: {name: 'Login'},
            })
          }>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Theme.colors.secondary,
    fontFamily: Theme.fontFamily.GilroyLight,
  },
  text: {
    fontFamily: Theme.fontFamily.GilroyExtraBold,
    fontSize: 15,
    color: Theme.backgrounds.white,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  link: {
    fontFamily: Theme.fontFamily.GilroyExtraBold,
    color: Theme.colors.primary,
  },
});

export default Register;
