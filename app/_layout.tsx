import { Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
      name="login"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen 
      name="index/[id]"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen 
      name="index-admin"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen 
      name="profile/[id]"
      options={{
        headerShown: false
      }}
    />
  </Stack>
}
