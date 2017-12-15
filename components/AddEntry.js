import React, { Component } from 'react'
import { View, Text} from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

import Slider from './Slider'
import Stepper from './Stepper'
import DateHeader from './DateHeader'


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

  render() {
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
      </View>
    )
  }
}
