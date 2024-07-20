import {View, Text} from 'react-native';
import React  from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Splash from './normal/Splash';
import Parent from './normal/Parent';
import Accident from './normal/Accident';
import OverSpeed from './normal/OverSpeed';
import OutOfRange from './normal/OutOfRange';
import OnBoarding from './normal/OnBoarding'
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Parent"
          component={Parent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Accident"
          component={Accident}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Overspeed"
          component={OverSpeed}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Outofrange"
          component={OutOfRange}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
