import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';

export default function VibrationSlider(value, onChange) {

    return (
        <View style={{ margin: 10, alignItems: 'stretch', justifyContent: 'center' }}>
            <Slider
                minimumValue={0}
                maximumValue={100}
                step={10}
                value={value}
                onValueChange={newValue => onChange(newValue)}
            />
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
                Vibration Level: <Text style={{ fontWeight: 'bold' }}>{this.state.value}</Text>
            </Text>
        </View>
    );
}


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