import {Navigation} from 'react-native-navigation';
import React from 'react';

/**========================Main===================================== */

import {
  HomeScreen,
  SettingScreen,
  SearchScreen,
  ContactScreen,
  ChatView,
  EditProfileScreen,
} from '../screens/main/index';

/**========================Auth===================================== */

import Login from '../screens/home-auth/login';
import Register from '../screens/home-auth/register';
import ForgotPassword from '../screens/home-auth/forgot-password';

/**============================================================= */

import HomeAuth from '../screens/index';

import {Provider} from 'react-redux';
import {
  withNavigationProvider,

} from 'react-native-navigation-hooks';
import {Theme} from '../common/theme/theme';
import BntEditProfile from '../components/header';

const WrapScreen = (ReduxScreen, store) => props => (
  <Provider store={store}>
    <ReduxScreen {...props} />
  </Provider>
);

Navigation.setDefaultOptions({
  headerTransparent: true,
  statusBar: {
    backgroundColor: 'white',
    style: 'dark',
  },
  topBar: {
    title: {
      color: 'black',
      alignment: 'center',
      fontFamily: 'helvetica',
      fontWeight: 'bold',
    },
    backButton: {color: Theme.colors.green},
    background: {color: 'white'},
    animate: true,
  },
});

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Chats',
    },
    rightButtons: {
      id: 'btnAddChatList',
      icon: require('../aassets/img/editTopBar.png'),
      color: '#4ba685',
    },
    leftButtons: {
      fontFamily: 'helvetica',
      id: 'btnEditChatList',
      text: 'edit',
      color: '#4ba685',
    },
  },
};

ContactScreen.options = {
  topBar: {
    title: {
      text: 'Contacts',
    },
    rightButtons: {
      id: 'btnAddContact',
      icon: require('../aassets/img/addChatTopBar.png'),
      color: '#4ba685',
    },
  },
};

SettingScreen.options = {
  topBar: {
    title: {
      text: 'Setting',
    },
    rightButtons: {
      id: 'btnEdit',
      icon: require('../aassets/img/editTopBar.png'),
      color: '#4ba685',
    },
  },
};

SearchScreen.options = {
  // topBar: {
  //   visible: false,
  // },
};

ChatView.options = (props)=>{
  return{
    topBar: {
      title: {
        text: props.title,
      },
      rightButtons: {
        id: 'btnEdit',
        icon: require('../aassets/img/editTopBar.png'),
        color: '#4ba685',
      },
    },
  }

}

Login.options = {
  topBar: {
    visible: false,
  },
};

ForgotPassword.options = {
  topBar: {
    visible: false,
  },
};

EditProfileScreen.options = props => {
  return {
    bottomTab: {visible: false},
    topBar: {
      title: {
        text: props.text,
      },
    },
  };
};
export const registerScreens = store => {
  //=============================HomeAuth=============================
  Navigation.registerComponent(
    'HomeAuth',
    () => withNavigationProvider(WrapScreen(HomeAuth, store)),
    () => HomeAuth,
  );

  //=============================Auth=============================
  Navigation.registerComponent(
    'Login',
    () => withNavigationProvider(WrapScreen(Login, store)),
    () => Login,
  );

  Navigation.registerComponent(
    'Register',
    () => withNavigationProvider(WrapScreen(Register, store)),
    () => Register,
  );

  Navigation.registerComponent(
    'ForgotPassword',
    () => withNavigationProvider(WrapScreen(ForgotPassword, store)),
    () => ForgotPassword,
  );
  //=============================User=============================
  Navigation.registerComponent(
    'HomeScreen',
    () => withNavigationProvider(WrapScreen(HomeScreen, store)),
    () => HomeScreen,
  );

  Navigation.registerComponent(
    'SettingScreen',
    () => withNavigationProvider(WrapScreen(SettingScreen, store)),
    () => SettingScreen,
  );

  Navigation.registerComponent(
    'ContactScreen',
    () => withNavigationProvider(WrapScreen(ContactScreen, store)),
    () => ContactScreen,
  );

  Navigation.registerComponent(
    'SearchScreen',
    () => withNavigationProvider(WrapScreen(SearchScreen, store)),
    () => SearchScreen,
  );

  Navigation.registerComponent(
    'ChatView',
    () => withNavigationProvider(WrapScreen(ChatView, store)),
    () => ChatView,
  );

  Navigation.registerComponent(
    'EditProfileScreen',
    () => withNavigationProvider(WrapScreen(EditProfileScreen, store)),
    () => EditProfileScreen,
  );

  Navigation.registerComponent(
    'BntEditProfile',
    () => withNavigationProvider(WrapScreen(BntEditProfile, store)),
    () => BntEditProfile,
  );

};
