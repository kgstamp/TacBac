import { StyleSheet, Text, View, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { React, useState } from 'react';
import { VibrationSlider } from './Slider.js';

export default function Header({ title, switchPage, showSettings = false, showQA = false }) {

    return (
        <View style={{ position: 'absolute', width: '90%' }}>
            <Text style={{ textAlign: 'center', fontSize: 100, fontWeight: 'bold', fontFamily: 'serif' }}>
                {title}
            </Text>

            {showSettings ?
                <View style={{ position: "absolute", top: "10px", left: "10px", width: "60px", height: "60px", backgroundColor: "#D9D9D9", borderRadius: "30px" }}>
                    <TouchableOpacity onPress={switchPage("SETTINGS")} style={{ marginHorizontal: 70, marginVertical: 20, padding: 15, borderRadius: 10, backgroundColor: '#1d64d0', alignItems: 'center' }}>

                    </TouchableOpacity>
                </View>
                :
                <View />
            }
            {showQA ?
                <View style={{ position: "absolute", top: "10px", right: "10px", width: "60px", height: "60px", backgroundColor: "#D9D9D9", borderRadius: "30px" }}>
                    <TouchableOpacity onPress={switchPage("QA")} style={{ marginHorizontal: 70, marginVertical: 20, padding: 15, borderRadius: 10, backgroundColor: '#1d64d0', alignItems: 'center' }}>

                    </TouchableOpacity>
                </View>
                :
                <View />
            }
        </View>
    )
}

var styles = StyleSheet.create({
    sectionHeader: {
        padding: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#1d64d0',
        alignItems: 'center'
    },
});