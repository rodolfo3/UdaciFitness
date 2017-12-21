import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

import { white, gray, purple } from '../utils/colors'

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  androidBtn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


const Icon = Platform.OS === 'ios' ? Entypo : FontAwesome;
const styleBtn = Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn;
const iconColor = Platform.OS === 'ios' ? purple : white;

export default function Stepper ({ max, unit, step, value, increment, decrement }) {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styleBtn, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
          onPress={decrement}
        >
          <Icon name='minus' size={30} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styleBtn, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}
          onPress={increment}
        >
          <Icon name='plus' size={30} color={iconColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.metricCounter}>
          <Text style={{ fontSize: 24, textAlign: 'center'}}>{ value }</Text>
          <Text style={{ fontSize: 18, textAlign: 'center', color: gray}}>{ unit }</Text>
      </View>
    </View>
  );
}

