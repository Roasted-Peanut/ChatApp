import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatCpn from '../../components/ChatCpn';
import firestore  from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function HomeScreen(props) {
  const [users, setUsers] = useState([]);
  const user = auth().currentUser;

  const getUsers = async ()=>{
    const querySnap = await firestore().collection("Users").where('uid','!=',user.uid).get()
    const allUsers = querySnap.docs.map(docSnap=>docSnap.data())
    setUsers(allUsers)
    // console.log("object",allUsers)
  }
  const unregister = auth().onAuthStateChanged(userExist=>{
  if(userExist){
    firestore().collection('Users')
    .doc(userExist.uid)
    .update({
      status:"online"
    })
  } 
})
if (!users) {
  return <ActivityIndicator size="large" color="#00ff00" />;
}

  useEffect(()=>{
    getUsers()
    unregister()
    // Remove()
  },[])


  // const Remove=(id)=>{
  //   const arr = [...user];
  //   arr.splice(id,1); 
  //   setUsers(arr);
  //   console.log("Setlisst",arr);
  // };

  return (
    <ScrollView style={style.container}>
      <TouchableOpacity
        style={style.searchContainer}
        onPress={() => Navigation.push(props.componentId,{
          component:{
            name: 'SearchScreen',
            options: {
              bottomTabs: {
                visible: false
              }
            }
          }
        })}>
        <View style={style.searchIconContainer}>
          <Ionicons name="search" size={responsiveFontSize(3)} color="gray" />
        </View>
        <Text style={style.search}>Search</Text>
      </TouchableOpacity>
      {/* <ChatCpn /> */}
      <ChatCpn datalist={users} _handleDelItem={()=>Remove()} goScreen={props} />
    </ScrollView>
  );
}
export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
  },
  searchContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor : 'red'
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gray',
  },
  searchIconContainer: {
    paddingHorizontal: 10,
  },
});
