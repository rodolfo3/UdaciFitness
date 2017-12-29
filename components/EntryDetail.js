import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { timeToString, getDailyRemainderValue } from '../utils/helpers'

import TextButton from './TextButton'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import MetricCard from './MetricCard'
import { white } from '../utils/colors'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  }
});


class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params
    return {
      title: entryId,
    }
  }


  reset = () => {
    const { remove, goBack, entryId } = this.props

    remove()
    goBack()
    removeEntry(entryId)
  }

  shouldComponentUpdate (nextProps) {
    return !!nextProps.metrics && !nextProps.metrics.today
  }

  render() {
    const { metrics } = this.props
    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton style={{margin: 20}} onPress={this.reset}>
          RESET
        </TextButton>
      </View>
    );
  }
}


function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    metrics: state[entryId],
  }
}


function mapDispatchToProps (dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyRemainderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
