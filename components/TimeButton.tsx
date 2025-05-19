import React, { useState } from "react";
import { Switch, StyleSheet, SwitchComponent } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import MedTimeManager from "./MedTimeManager";
import Medicine from "@/interfaces/Medicine";






const TimeButton = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return(
        <Switch
          trackColor={{false: 'gray', true: 'green'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
  );
};

export default TimeButton;