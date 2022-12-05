import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { React, useState } from 'react';
import { VibrationSlider } from './Slider.js';

export default function Settings({ switchPage }) {

    const [duration, setDuration] = useState(0.5);
    const [vibrationValue, setVibrationValue] = useState(50);

    return (
        <View style={styles.background}>
            <View style={{ position: 'absolute', width: '90%' }}>
                <Header
                    switchPage={switchPage}
                    title={"Settings"}
                    showQA={true}
                />
                <View style={styles.sectionHeader}>
                    <Text>
                        Vibrations
                    </Text>
                </View>
                <View style={{ margin: 10, alignItems: 'stretch', justifyContent: 'center' }}>
                    <VibrationSlider value={vibrationValue} onChange={(newValue) => {
                        setVibrationValue(newValue);
                        // Transmit with Bluetooth 
                    }} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text>Duration:</Text>
                        <View style={{ flex: 1 }}>
                            <Button
                                title="0.5s"
                                color="#1d64d0"
                                onPress={() => 0.5}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                title="1.0s"
                                color="#1d64d0"
                                onPress={() => 1.0}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Button
                                title="1.5s"
                                color="#1d64d0"
                                onPress={() => 1.5}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.sectionHeader}>
                    <Text>
                        Application
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={switchPage("HOME")} style={{ marginHorizontal: 70, marginVertical: 20, padding: 15, borderRadius: 10, backgroundColor: '#1d64d0', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ddebff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    sectionHeader: {
        padding: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1d64d0',
        alignItems: 'center'
    },
});