import { useState } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./style";

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