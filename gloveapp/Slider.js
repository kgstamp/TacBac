import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';

class VibrationSlider extends React.Component {

    state = {
        value: 50,
    };

    valueChange(value) {
        this.setState({ value });
        // put code to communicate with the adafruit
    }

    render() {
        return (
            <View style={styles.container}>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    step={10}
                    value={this.state.value}
                    onValueChange={value => this.valueChange(value)}
                />
                <Text> Vibration Level: {this.state.value}</Text>
            </View>
        );
    }
}

export default VibrationSlider;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        textAlign: 'center'
    },
});