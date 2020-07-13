import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Camera from "../components/Camera";
import ImagePreview from "../components/ImagePreview";
import { ReceiptData } from "../components/ReceiptData";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Camera"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="Preview" component={ImagePreview} />
      <Stack.Screen name="ReceiptData" component={ReceiptData} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
