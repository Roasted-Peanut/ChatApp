import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {Navigation} from 'react-native-navigation';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const header = props => {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => {
        Navigation.push(props.navigation, {
          component: {
            name: 'SettingScreen',
            options: {
              bottomTabs: {
                visible: false,
              },
            },
          },
        });
      }}>
      <Avatar
        source={{
          uri: props.avatar,
        }}
        size="small"
        rounded
      />

      <View style={styles.userTitle}>
        <Text style={styles.txtTitle}>{props.name}</Text>
        {/* <Text style={styles.userStatus}>{props.status}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default header;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: responsiveWidth(80),
    flexDirection: 'row',
  },
  userTitle: {
    justifyContent: 'center',
    margin: 5,
  },
  txtTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
