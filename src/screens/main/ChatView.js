import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goHome} from '../../navigation/navigation';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';

const ChatView = (props) => {
  // const p = props;
  // Navigation.mergeOptions(props.componentId, {
  //   topBar: {
  //     rightButtons: {
  //       id: 'custom',
  //       component: {
  //         name: 'BntEditProfile',
  //         passProps: {
  //           name: p.title,
  //           avatar: p.avatar,
  //           status: p.status,
  //           navigation: p.componentId,
  //         },
  //       },
  //     },
  //   },
  // });

  const [messages, setMessages] = useState([]);
  const userId = props.userId;
  // console.log("sendTo",userId)
  const myid = props.todos;
  // console.log("sendBy",myid)
  useEffect(() => {
    const docid = myid > userId ? userId + '-' + myid : myid + '-' + userId;
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });

    return () => {
      unSubscribe();
      // unregister()
    };
  }, []);

  const onSend = messageArray => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentBy: myid,
      sentTo: userId,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid = myid > userId ? userId + '-' + myid : myid + '-' + userId;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };
  return (
    <View style={style.root}>
      <GiftedChat
        messages={messages}
        onSend={text => onSend(text)}
        user={{
          _id: myid,
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  todos: state.user.authData,
});
export default connect(mapStateToProps)(ChatView);

const style = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    top: 10,
  },
  headerContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(8),
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
