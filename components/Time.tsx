import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";




const Time = () =>{
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date()); //update the state with a new time
        }, 1000);

     return () => clearInterval(interval); //Clear the interval -> 1000
  }, []);

  return (
    <View>
        <Text>{time.toLocaleTimeString('pt-BR')}</Text>
    </View>
  );
};

export default Time;