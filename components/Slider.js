import React, { Component } from 'react'
import { View, Slider, Text, StleSheet } from 'react-native'
import { gray } from '../utils/colors'


const styles = {
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default function UdacitySlider ({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{ fontSize: 24, textAlign: 'center'}}>{ value }</Text>
        <Text style={{ fontSize: 18, textAlign: 'center', color: gray}}>{ unit }</Text>
      </View>
    </View>
  );
}
