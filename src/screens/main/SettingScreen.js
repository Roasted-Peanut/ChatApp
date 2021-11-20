import React, {useState,} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';

import {goAuth} from '../../navigation/navigation';
import * as AppAction from '../../actions';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import Button from '../../components/Button';
import {Theme} from '../../common/theme/theme';
import firestore from '@react-native-firebase/firestore';
import {Navigation} from 'react-native-navigation';
import {useNavigationButtonPress} from 'react-native-navigation-hooks';
import {ListItem, Icon} from 'react-native-elements';

const SettingScreen = props => {
  useNavigationButtonPress(() => {
    Navigation.push(props.componentId, {
      component: {
        name: 'EditProfileScreen',
        options: {
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          sendProfile: profile,
        },
      },
    });
  });

  const user = auth().currentUser;
  const dispatch = useDispatch();
  const [profile, setProfile] = useState('');

  firestore()
    .collection('Users')
    .doc(user.uid)
    .get()
    .then(docSnap => {
      setProfile(docSnap.data());
    });


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

  const todoList = [
    {
      title: 'Saved Messages',
      icon: 'cloud',
      color: Theme.colors.bronze,
    },
    {
      title: 'Recent Calls',
      icon: 'call',
      color: Theme.colors.green,
    },
    {
      title: 'Notification and Sounds',
      icon: 'notifications',
      color: Theme.colors.yellowGreen,
    },
    {
      title: 'Privacy and Security',
      icon: 'security',
      color: Theme.colors.darkGreen,
    },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Avatar source={{uri: profile.avatar}} size="xlarge" rounded />
        <Text style={styles.userName}>{profile.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="phone" color={Theme.colors.green} />
          <Text style={styles.text}>{profile.phone}</Text>
        </View>
      </View>
      <View>
        {todoList.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name={item.icon} color={item.color} />
            <ListItem.Content>
              <ListItem.Title> {item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>

      <Button style={styles.bntLogout} onPress={() => LogoutAlert()}>
        <Text style={styles.text}>LogOut</Text>
      </Button>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.mGrey,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  userBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userName: {
    color: Theme.colors.deep,
    fontSize: 28,
    fontWeight: 'bold',
  },

  text: {
    color: Theme.colors.deep,
    fontSize: 16,
  },
  bntLogout: {
    backgroundColor: Theme.colors.green,
  },
});
