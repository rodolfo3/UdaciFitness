import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'

import TextButton from './TextButton'
import Slider from './Slider'
import Stepper from './Stepper'
import DateHeader from './DateHeader'

import { submitEntry, removeEntry } from '../utils/api'


function SubmitButton (props) {
  return (
    <TextButton {...props}>
      Submit
    </TextButton>
  );
}


function ResetButton (props) {
  return (
    <TextButton {...props}>
      Reset
    </TextButton>
  )
}


const buildInitialState = () =>
  Object.keys(getMetricMetaInfo()).reduce((acc, k) => ({...acc, [k]: 0}), {});

export default class AddEntry extends Component {
  state = buildInitialState()

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    });
  }

  decrement = (metric) => {
    const { min = 0, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
       const count = state[metric] - step;

       return {
         ...state,
         [metric]: count < min ? min : count,
       }
     });
  }

  slide = (metric, value) => {
    this.setState((state) => ({
      ...state,
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(buildInitialState)

    // update redux
    //
    // navigato to home

    // save to DB
    submitEntry({ key, entry })

    // Clear local notification
  }

  reset = () => {
    const key = timeToString()

    alert(`reset = ${key}`);

    // update redux
    //
    // navigato to home
    //

    // save to DB
    removeEntry({ key })
  }

  render() {
    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name='ios-happy-outline' size={100} />
          <Text>You already logged your information for today</Text>
          <ResetButton onPress={this.reset} />
        </View>
      )
    }

    const metaInfo = getMetricMetaInfo();
    return (
      <View>
        <DateHeader date={new Date()} />
        { Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return (
              <View key={key}>
                { getIcon() }
                { type === 'slider'
                  ? <Slider
                      value={value}
                      onChange={value => this.slide(key, value)}
                      {...rest}
                    />
                  : <Stepper
                      value={value}
                      increment={() => this.increment(key)}
                      decrement={() => this.decrement(key)}
                      {...rest}
                    />
                }
              </View>
            )
          })
        }
      <SubmitButton onPress={this.submit} />
      <Text>
        { JSON.stringify(this.state, null, '  ') }
      </Text>
      </View>
    )
  }
}
