import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import colors from '../../common/theme/colors';

const ChatView = props => {

  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState('');
  const userId = props.userId;
  const myid = props.todos;
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

  const pickImageAndUpload = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
     
      const fileUpLoad = fileobj.assets[0].uri;
      const uploadTask = storage()
        .ref()
        .child(`/messageImage/${Date.now()}`)
        .putFile(fileUpLoad);
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
            setImage(downloadURL);
          });
        },
      );
    });
  };

  const onSend = messageArray => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentBy: myid,
      sentTo: userId,
      createdAt: new Date(),
      image: image,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid = myid > userId ? userId + '-' + myid : myid + '-' + userId;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
    setImage('');
  };

  //Where onSend is the function use to onsend;
  const customSendPress = (text, onSend) => {
    if (image && !text && onSend) {
      onSend({text: text.trim()}, true);
    } else if (text && onSend) {
      onSend({text: text.trim()}, true);
      0;
    } else {
      return false;
    }
  };

  const customSend = ({onSend, text, sendButtonProps, ...sendProps}) => {
    return (
      <Send
        {...sendProps}
        textStyle={style.sendButton}
        sendButtonProps={{
          ...sendButtonProps,
          onPress: () => customSendPress(text, onSend),
        }}
      />
    );
  };

  const handleDelImg = () => {
    setImage('');
  };
  return (
    <SafeAreaView style={style.root}>
      <GiftedChat
        alwaysShowSend="true"
        messages={messages}
        onSend={text => onSend(text)}
        user={{
          _id: myid,
        }}
        renderActions={() => {
          return (
            <View>
              {image ? (
                <View style={{backgroundColor:colors.aqua, borderRadius:5 }}>
                  <Ionicons
                    name="close-outline"
                    size={responsiveFontSize(4)}
                    onPress={() => handleDelImg()}
                    color={colors.bronze}
                  />
                  <Image
                    source={{uri: image}}
                    style={{height: 100, width: 150}}></Image>
                </View>
              ) : (
                <View style={{flex: 1,}}>
                  <Ionicons
                    color={colors.activeGray}
                    name="image"
                    size={responsiveFontSize(4)}
                    selectionColor="blue"
                    onPress={() => {
                      pickImageAndUpload();
                    }}
                  />
                </View>
              )}
            </View>
          );
        }}
        renderSend={customSend}></GiftedChat>
    </SafeAreaView>
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
