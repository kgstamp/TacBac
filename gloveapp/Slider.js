/* eslint-disable prettier/prettier */

'use strict';
 
var React = require('react');
var Slider = require('react-native-slider');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = require('react-native');
 
var VibrationSlider = React.createClass({
  getInitialState() {
    return {
      value: 5, // put default here
    };
  },

  valueChange(value) {
    this.setState({value});
    // put code to communicate with the adafruit

  },
 
  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={(value) => this.valueChange({value})} />
        <Text>Value: {this.state.value}</Text>
      </View>
    );
  },
});
 
var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
 
export default VibrationSlider;
