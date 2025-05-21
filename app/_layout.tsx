import { Stack } from "expo-router";
import React from "react";

export const unstable_settings = {
  // Ensure any route can link back to `/`
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
  </Stack>
}
