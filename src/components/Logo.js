import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo = ({style, ...props}) => (
  <Image
    source={require('../aassets/img/logo.png')}
    style={[styles.image, style]}
  />
);

const styles = StyleSheet.create({
  image: {
    alignSelf:'center',
    width: 128,
    height: 128,
    marginBottom: 20,
  },
});

export default memo(Logo);