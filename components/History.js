import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { AppLoading } from 'expo'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyRemainder } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  }
})


class History extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props;

    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          return dispatch(addEntry({
            [timeToString()]: getDailyRemainder()
          }))
        }
      })
      .then(() => this.setState({ready: true}))
  }

  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      { today
        ? (
          <TouchableOpacity onPress={() => console.log('pressed!')}>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity onPress={() => console.log('pressed!')}>
            <MetricCard metrics={metrics} date={formattedDate} />
          </TouchableOpacity>
        )
      }
    </View>
  )

  renderEmptyDate = (formattedDate) => {
    return (
      <View style={styles.item}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props;
    const { ready } = this.state;

    if (!ready) {
      return <AppLoading />
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}


function mapStateToProps (state) {
  return {
    entries: state
  }
}


export default connect(mapStateToProps)(History)