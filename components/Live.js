import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { connect } from 'react-redux'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


class Live extends Component {
  state = {
    coords: null,
    status: null,
    direction: '',
  }

  render() {
    const { status, coords, direction } = this.state;
    if (status === null) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    if (status === 'denied') {
      return (
        <View style={styles.container}>
          <Text>Denied!</Text>
        </View>
      )
    }

    if (status === 'undetermined') {
      return (
        <View style={styles.container}>
          <Text>Undetermined!</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text>Live</Text>
        <Text>{ JSON.stringify(this.state, null, '  ') }</Text>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
  }
}


export default connect(mapStateToProps)(Live)
