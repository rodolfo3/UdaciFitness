import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function Stepper ({ max, unit, step, value, increment, decrement }) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={decrement}>
          <FontAwesome name='minus' size={30} color={'black'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={increment}>
          <FontAwesome name='plus' size={30} color={'black'} />
        </TouchableOpacity>
        <View>
            <Text>{ value }</Text>
            <Text>{ unit }</Text>
        </View>
      </View>
    </View>
  );
}

