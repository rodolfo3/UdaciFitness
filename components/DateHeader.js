import React, { Component } from 'react'
import { View, Text} from 'react-native'

export default function DateHeader ({ date }) {
  const dateStr = String(date.toLocaleDateString())
  return (
    <Text>
      { dateStr }
    </Text>
  );
}
