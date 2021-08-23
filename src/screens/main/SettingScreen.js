import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';

import {goAuth} from '../../navigation/navigation';
import * as AppAction from '../../actions';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import Button from '../../components/Button';
import {Theme} from '../../common/theme/theme';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {Navigation} from 'react-native-navigation';
import {useNavigationButtonPress} from 'react-native-navigation-hooks';
import {ListItem, Icon} from 'react-native-elements';

const SettingScreen = props => {
  
  useNavigationButtonPress(() => {
    Navigation.push(props.componentId, {
      component: {
        name: 'EditProfileScreen',
        options:{
          bottomTabs:{
            visible:false
          }
        },
        passProps: {
          text: profile.name,
        },
      },
    });
  });

  const user = auth().currentUser;
  const dispatch = useDispatch();
  const [profile, setProfile] = useState('');

  const pickImageAndUpload = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      // console.log(fileobj.assets[0].uri)
      const uploadTask = storage()
        .ref()
        .child(`/userprofile/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert('image uploaded');
        },
        error => {
          alert('error uploading image');
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            firestore().collection('Users').doc(user.uid).update({
              avatar: downloadURL,
            });
          });
        },
      );
    });
  };

  useEffect(() => {
    // pickImageAndUpload()
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(docSnap => {
        setProfile(docSnap.data());
      });
  }, [props.avatar]);

  if (!profile) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const LogoutAlert = () => {
    Alert.alert(
      'Logout',
      'Are you sure',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            {
              firestore()
                .collection('Users')
                .doc(user.uid)
                .update({
                  status: firestore.FieldValue.serverTimestamp(),
                })
                .then(() => {
                  auth().signOut();
                  goAuth();
                  dispatch(AppAction.logout());
                });
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const list = [
    {
      title: 'Appointments',
      icon: 'av-timer',
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff',
    },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Avatar source={{uri: profile.avatar}} size="xlarge" rounded />
         <Text style={styles.userName}>{profile.name}</Text>
      </View>
      <View style={styles.userBtnGroup}>
        <Button style={styles.btnGroup} onPress={()=>{alert('aa')}}>
          <Text>call</Text>
        </Button>
        <Button style={styles.btnGroup} onPress={()=>{alert('aa')}}>
          <Text>video</Text>
        </Button>
        <Button style={styles.btnGroup} onPress={()=>{alert('aa')}}>
          <Text>video</Text>
        </Button>
      </View>

      <View>
        {list.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>

      <Button
        style={styles.bntLogout}
        onPress={() => LogoutAlert()}>
        <Text style={styles.text}>LogOut</Text>
      </Button>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent:'space-between'
  },
  header:{
    alignItems: 'center',
  },
  userBtnGroup:{
    flexDirection:'row',
    justifyContent:'center'
  },
  userName:{
    fontFamily: Theme.fontFamily.GilroySemiBold,
    color: Theme.colors.secondary,
    fontSize:20,
    fontWeight:'bold'
  },
  btnGroup:{
    backgroundColor:Theme.colors.ocean,
    width:50,
    height:50,
    margin:5
  },
  text: {
    fontFamily: Theme.fontFamily.GilroySemiBold,
    color: Theme.colors.secondary,
  },
  bntLogout:{
    backgroundColor:Theme.colors.green
  }
});
