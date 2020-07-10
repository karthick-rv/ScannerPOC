
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Camera from  "../components/Camera"
import ImagePreview from "../components/ImagePreview";

const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
      <Stack.Navigator initialRouteName={"Camera"}>
        <Stack.Screen  name='Camera' component={Camera} />
        <Stack.Screen name='Preview' component={ImagePreview} />
      </Stack.Navigator>
    );
   }


 export default AppNavigator;  