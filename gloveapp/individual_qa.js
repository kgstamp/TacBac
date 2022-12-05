import { StyleSheet, Text, View, TouchableOpacity, Button, PermissionsAndroid } from 'react-native';
import { React, useState } from 'react';

export default function individualQA({ question, answer }) {

    return (
        <View style={{ position: 'absolute', width: '90%' }}>
            <View>
                <Text>
                    Q
                </Text>
                <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', fontFamily: 'serif' }}>
                    {question}
                </Text>
                <View>
                    <View>
                        <Text>
                            A
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold', fontFamily: 'serif' }}>
                            {answer}
                        </Text>
                        <View>
                        </View>
                        );
}

