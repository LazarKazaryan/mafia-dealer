import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

const Counter = ({ title,titleColor, count, increment, decrement }) => {
    return (
        <View style={styles.counter}>
            <Text style={[styles.counter_title, {color: titleColor}]}>{title}</Text>
            <View style={styles.counter_body}>
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => count <= 50 && count > 0 ? decrement(count - 1) : ''}
                >
                    <AntDesign name="minuscircleo" size={34} style={styles.count_icon} />
                </TouchableHighlight>
                <Text style={styles.count_text}>{count}</Text>
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => count < 50 && count >= 0 ? increment(count + 1) : ''}
                >
                    <AntDesign name="pluscircleo" size={34} style={styles.count_icon} />
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    counter: {
        marginVertical: 15,
    },
    counter_body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    counter_title: {
        textAlign: 'center',
        fontWeight:'bold',
    },
    count_text: {
        fontSize: 20,
        marginHorizontal: 15,
        color: '#DDDDDD'
    },
    count_icon: {
        color: '#DDDDDD'
    }
});

export default Counter