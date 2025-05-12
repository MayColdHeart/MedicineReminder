import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from "react-native";
import React from "react";

type Props = TouchableOpacityProps & {
    title: string
}

export function AddButton( {title, ...rest} : Props){
    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.button} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "25%",
        height: 45,
        backgroundColor: "blue",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF"
    }
})