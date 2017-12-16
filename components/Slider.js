import React, { Component } from 'react'
import { View, Slider, Text} from 'react-native'

export default function UdacitySlider ({ max, units, step, value, onChange }) {
  return (
    <View>
      <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View>
        <Text>{ value }</Text>
        <Text>{ units }</Text>
      </View>
    </View>
  );
}
