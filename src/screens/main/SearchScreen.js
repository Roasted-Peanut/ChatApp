import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goHome} from '../../navigation/navigation';

const SearchScreen = props => {
  // const [data, setlist] = useState(dataSearch);
  return (
    <View style={style.container}>
      <View style={style.searchContainer}>
        <View style={style.searchIconContainer}>
          <Ionicons name="search" size={responsiveFontSize(3)} color="gray" />
        </View>
        <TextInput
          style={style.search}
          placeholder="Search"
          autoFocus={true}></TextInput>
        <View style={style.boxCancel}>
          <Text onPress={() => goHome()} style={style.bntCancel}>
            Cancel
          </Text>
        </View>
      </View>
      <ScrollView>
        {/* <SearchCpn dataList={data} /> */}
      </ScrollView>
    </View>
  );
};
export default SearchScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 5,
  },
  searchContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(6),
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
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
  TouContainer: {
    backgroundColor: '#DDDDDD',
  },
  boxCancel: {
    paddingHorizontal: 10,
  },
  bntCancel: {
    color: 'blue',
    fontSize: 18,
  },
});
