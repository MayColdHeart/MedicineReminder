import { useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

type Props = TouchableOpacityProps & {
    title: string
}

export function CheckButton( {title, ...rest} : Props){

    const [clicado, setClicado] = useState(false);   
    const lidarComClique = () => {
        setClicado(!clicado);
    };

    if(clicado){
        return(
            <TouchableOpacity activeOpacity={0.5} style={styles.button1} onPress={lidarComClique} {...rest}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        )

    }
    return(
        <TouchableOpacity activeOpacity={0.5} style={styles.button2} onPress={lidarComClique} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button1: {
        width: "25%",
        height: 45,
        backgroundColor: "red",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    button2: {
        width: "25%",
        height: 45,
        backgroundColor: "green",
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