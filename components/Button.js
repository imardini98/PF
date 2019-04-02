import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = ({onPress,children}) => {
    return (
        <TouchableOpacity onPress = {onPress} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        padding: 20,
        width: '100%',
        backgroundColor: '#083b66',
        borderRadius: 4,
        alignItems:'center',

    },
    text : {
        color : 'white',
        fontWeight: '700',
        fontSize: 18,
    }
});
export{Button};