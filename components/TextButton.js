import React, { Component } from 'react'
import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors';

const styles = StyleSheet.create({
  iosTextBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidTextBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
});

export default function TextButton ({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Platform.OS ? styles.iosTextBtn : styles.androidTextBtn }
    >
      <Text style={styles.textBtn}>{ children }</Text>
    </TouchableOpacity>
  );
}
