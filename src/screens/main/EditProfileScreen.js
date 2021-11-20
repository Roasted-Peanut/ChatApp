import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import TextInputCus from '../../components/TextInputCus';
import Button from '../../components/Button';
import {Theme} from '../../common/theme/theme';
import {Navigation} from 'react-native-navigation';
import {nameValidator, phoneValidator} from '../../modules/auth.validation';
import firestore from '@react-native-firebase/firestore';

const EditProfileScreen = props => {
  const profile = props.sendProfile;
  let ref_input1 = useRef();
  let ref_input2 = useRef();
  let ref_input3 = useRef();

  const [name, setName] = useState({value: '', error: ''});
  const [fullName, setFullName] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <ActivityIndicator size="small" color={Theme.colors.sky} />;
  }

  const handleSubmit = async () => {
    setLoading(true);
    const nameError = nameValidator(name.value);
    const fullNameError = nameValidator(fullName.value);
    const phoneError = phoneValidator(phone.value);

    if (fullNameError || nameError || phoneError) {
      setName({...name, error: nameError});
      setFullName({...fullName, error: fullNameError});
      setPhone({...phone, error: phoneError});
      return;
    }

    try {
    firestore().collection('Users').doc(profile.uid).update({
      name: name.value,
      fullName: fullName.value,
      phone: phone.value,
    });

    Alert.alert('Edit', 'Update success', [
      {
        text: 'OK',
        onPress: () => {
          {
            Navigation.pop(props.componentId);
          }
        },
      },
    ]);
    setLoading(false);
    } catch (error) {
      alert('wrong!');
      return
    }
  };

  const selectPicture = () => {
    alert('SelectPicture');
  };
  return (
    <View style={styles.root}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Avatar source={{uri: profile.avatar}} size="xlarge" rounded />
        <Text
          style={{fontSize: 18, color: Theme.colors.ocean}}
          onPress={() => selectPicture()}>
          Select Picture
        </Text>
      </View>
      <View>
        <TextInputCus
          label={profile.name}
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
          label={profile.fullName}
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
          label={profile.phone}
          returnKeyType="next"
          inputRef={ref => (ref_input3.current = ref)}
          autoFocus={false}
          blurOnSubmit={false}
          value={phone.value}
          onChangeText={text => {
            setPhone({value: text, error: ''});
          }}
          keyboardType="phone-pad"
          errorText={phone.error}
        />
      </View>

      <Button
        style={styles.bntLogout}
        onPress={() => {
          handleSubmit();
        }}>
        <Text style={{color: Theme.colors.mRed, fontSize: 20}}>Done</Text>
      </Button>
    </View>
  );
};

export default EditProfileScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bntLogout: {
    backgroundColor: Theme.colors.green,
  },
});
