import firebase  from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// export const getUsers = async (result)=>{
//     const querySnap = await firebase().collection("Users").where("uid","!=", ).get()
//     return querySnap.docs.map(docSnap=>docSnap.data())
//   }

// export const getUserCurrent = async () =>{
//     const querySnap = await firebase().collection("Users").where("uid","==").get()
//     return querySnap.docs.map(docSnap=>docSnap.data())
// }