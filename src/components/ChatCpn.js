import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {ListItem, Avatar, Button} from 'react-native-elements';

const ChatCpn = props => {
  const list = props.datalist;
  const navigatetor = props.goScreen;

  return (
    <View style={style.container}>
      {list.map((l, i) => (
        <ListItem.Swipeable
          rightContent={
            <Button
              title="Info"
              icon={{name: 'info', color: 'white'}}
              buttonStyle={{minHeight: '100%'}}
              onPress={props._handleDelItem}
            />
          }
          key={i}
          bottomDivider>
          <TouchableOpacity
            style={style.TouContainer}
            onPress={() =>
              Navigation.push(navigatetor.componentId, {
                component: {
                  name: 'ChatView',
                  passProps: {
                    title: l.name,
                    userId: l.uid,
                    avatar: l.avatar,
                    componentId: navigatetor,
                    status:
                      typeof l.status == 'string'
                        ? l.status
                        : l.status.toDate().toString(),
                  },
                  options: {
                    bottomTabs: {
                      visible: false,
                    },
                  },
                },
              })
            }>
            <Avatar source={{uri: l.avatar}} size="medium" rounded />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
            </ListItem.Content>
          </TouchableOpacity>
        </ListItem.Swipeable>
      ))}
    </View>
  );
};
export default ChatCpn;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TouContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});
