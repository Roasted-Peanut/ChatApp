import {Navigation} from 'react-native-navigation';

export const goAuth = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Login'
                  }
                },
              ]
            }
          },
        ]
      }
    }
  });
};

export const goHome = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              id: 'HOME_STACK',
              children: [
                {
                  component: {
                    name: 'HomeScreen',
                    options: {
                      bottomTab: {
                        selectedTextColor: '#4ba685',
                        selectedIconColor: '#4ba685',
                        text: 'Chats',
                        icon: require('../aassets/img/chat.png'),
                      },

                    },
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'CONTACT_STACK',
              children: [
                {
                  component: {
                    name: 'ContactScreen',
                    options: {
                      bottomTab: {
                        selectedTextColor: '#4ba685',
                        selectedIconColor: '#4ba685',
                        text: 'Contacts',
                        icon: require('../aassets/img/contact.png'),
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            stack: {
              id: 'SETTING_STACK',
              children: [
                {
                  component: {
                    name: 'SettingScreen',
                    options: {
                      bottomTab: {
                        selectedTextColor: '#4ba685',
                        selectedIconColor: '#4ba685',
                        text: 'Setting',
                        icon: require('../aassets/img/setting.png'),
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
};
