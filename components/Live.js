import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { Location, Permissions } from 'expo'
import { calculateDirection } from '../utils/helpers'
import { connect } from 'react-redux'


import { purple, white } from '../utils/colors'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
}) 


function Heading ({ direction }) {
  return (
    <View style={styles.directionContainer}>
      <Text style={styles.header}>
        You're heading
      </Text>
      <Text style={styles.direction}>
        { direction }
      </Text>
    </View>
  )
}


function Metric ({ name, value }) {
  return (
    <View style={styles.metric}>
      <Text style={[styles.header, { color: white }]}>
        {name}
      </Text>
      <Text style={[styles.subHeader, { color: white }]}>
        {value}
      </Text>
    </View>
  )
}

class Live extends Component {
  state = {
    coords: null,
    status: null,
    direction: '',
  }

  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        console.log('Location status:', status)

        if (status === 'granted') {
          return this.setLocation()
        }

        this.setState({ status })
      })
      .catch((error) => {
        console.warn('Error getting permission', error)
        this.setState({ status: 'undetermined' })
      });
  }

  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.setLocation()
        }
        this.setState({ status })
      })
      .catch((error) => {
        console.warn('Error getting permission', error)
        this.setState({ status: 'undetermined' })
      });
  }

  setLocation = () => {
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 1,
      distanceInterval: 1,
    }, ({ coords }) => {
      const newDirection = calculateDirection(coords.heading)
      const { direction } = this.state
      this.setState({
        coords,
        status: 'granted',
        direction: newDirection,
      })
    })
  }

  render() {
    const { status, coords, direction } = this.state;
    if (status === null) {
      return <ActivityIndicator style={{marginTop: 30}} />
    }

    if (status !== 'granted') {
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
        <Heading direction={direction} />
        <View style={styles.metricContainer}>
          <Metric name="Altitude" value={`${coords.altitude} meters`} />
          <Metric name="Speed" value={`${coords.speed} km/h`} />
        </View>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
  }
}


export default connect(mapStateToProps)(Live)
