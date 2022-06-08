import React from 'react';

import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { paddingHorizontal } from '../App';
import { colors } from '../constants';

const plusImg = require('../src/plus.jpeg');

export const BottomCard = ({ style, createCard }) => {
  return (
    <View style={styles.rectangularBlock}>
      <TouchableOpacity onPress={() => createCard()}>
        <View style={styles.cardCtn}>
          <TouchableOpacity>
            <Image source={plusImg} style={styles.iconStyle} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>New Food Style</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardCtn: {
    height: 52,
    paddingHorizontal: paddingHorizontal,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    marginBottom: 0,
    marginTop: 12,
    borderRadius: 6,
    backgroundColor: colors.WHITE,
    shadowColor: colors.GREYISH_40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    position: 'absolute',
    top: -45,
    right: 0,
    left: 0,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  textStyle: {
    width: 260,
    height: 22,
    // fontFamily: 'ProximaNovaA',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    marginLeft: 12,
    color: colors.GREYISH_BROWN,
  },
});
