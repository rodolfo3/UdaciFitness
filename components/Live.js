import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { Location } from 'expo'
import { connect } from 'react-redux'

import { purple, white } from '../utils/colors'


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


class Live extends Component {
  state = {
    coords: null,
    status: 'undetermined',
    direction: '',
  }


  askPermission = () => {
    console.log('askPermission');
  }

  render() {
    const { status, coords, direction } = this.state;
    if (status === null) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied location.
            You can fix this by visiting your settings... bla
          </Text>
        </View>
      )
    }

    if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You need to enable location services dor this app
          </Text>
          <TouchableOpacity onPress={this.askPermission}>
            <Text>
              Enable
            </Text>
          </TouchableOpacity>
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
