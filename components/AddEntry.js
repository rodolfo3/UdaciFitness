import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { getDailyRemainder, getMetricMetaInfo, timeToString } from '../utils/helpers'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import TextButton from './TextButton'
import Slider from './Slider'
import Stepper from './Stepper'
import DateHeader from './DateHeader'

import { white } from '../utils/colors'

import { submitEntry, removeEntry } from '../utils/api'
import { addEntry } from '../actions'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
});


function SubmitButton (props) {
  return (
    <TextButton {...props}>
      Submit
    </TextButton>
  );
}


function ResetButton (props) {
  return (
    <TextButton style={{padding: 10}} {...props}>
      Reset
    </TextButton>
  )
}


const buildInitialState = () =>
  Object.keys(getMetricMetaInfo()).reduce((acc, k) => ({...acc, [k]: 0}), {});


class AddEntry extends Component {
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

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry',
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(buildInitialState)

    // update redux
    this.props.dispatch(addEntry({
      [key]: entry,
    }))

    // navigato to home
    this.toHome()

    // save to DB
    submitEntry({ key, entry })

    // Clear local notification
  }

  reset = () => {
    const key = timeToString()

    // update redux
    this.props.dispatch(addEntry({
      [key]: getDailyRemainder(),
    }))

    // navigato to home
    this.toHome()

    // save to DB
    removeEntry({ key })
  }

  render() {
    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'} size={100} />
          <Text style={{margin: 30}}>You already logged your information for today</Text>
          <ResetButton onPress={this.reset} />
        </View>
      )
    }

    const metaInfo = getMetricMetaInfo();
    return (
      <View style={styles.container}>
        <DateHeader date={new Date()} />
        { Object.keys(metaInfo).map((key) => {
            const { getIcon, type, ...rest } = metaInfo[key]
            const value = this.state[key]

            return (
              <View key={key} style={styles.row}>
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
          { JSON.stringify(this.props, null, '  ') }
        </Text>
      </View>
    )
  }
}


function mapStateToProps (state) {
  const key = timeToString()
  return {
    debug: state,
    alreadyLogged: !!(state && state[key] && !state[key].today),
  }
}


export default connect(mapStateToProps)(AddEntry);
