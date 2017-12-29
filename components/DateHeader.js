import React, { Component } from 'react'
import { View, Text} from 'react-native'

import { purple } from '../utils/colors'


export default function DateHeader ({ date }) {
  const dateStr = date.toLocaleDateString ? String(date.toLocaleDateString()) : String(date)
  return (
    <Text style={{color: purple, fontSize: 25}}>
      { dateStr }
    </Text>
  );
}
