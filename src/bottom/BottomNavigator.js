import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Map from './Map'
import Statistic from './Statistic'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Profile from './Profile'

const Bottom = createBottomTabNavigator()

const BottomNavigator = ({ navigation }) => {
    return (
        <Bottom.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerTransparent: true, // Makes the header background transparent
                headerLeft: ({ focused, }) => {
                    let color;

                    if (route.name === 'Home') {
                        color = 'black';
                    } else if (route.name === 'Map') {
                        color = 'black';
                    } else if (route.name === 'Statistic') {
                        color = 'black'; // Changed to a more relevant icon
                    } else if (route.name === 'Profile') {
                        color = 'white'; // Changed to a more relevant icon
                    }

                    // You can return any component that you like here!
                    return <Icon
                        name="arrow-back"
                        size={24}
                        color={color}
                        //   onPress={() => navigation.goBack()}
                        style={{ marginLeft: 15 }}
                    />
                },
                headerBackTitleVisible: false,
                headerTitleStyle: {
                    color: "black"
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: {
                    fontSize: 13, // Increase the font size here
                    fontWeight: 'bold' // Optional: if you want the labels to be bold
                },
                tabBarStyle: {
                    paddingTop: 5, // Top padding
                    paddingBottom: 5, // Bottom padding
                    height: 60 // Optional: Adjust the height to ensure there's enough space for padding
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Map') {
                        iconName = 'map';
                    } else if (route.name === 'Statistic') {
                        iconName = 'query-stats'; // Changed to a more relevant icon
                    } else if (route.name === 'Profile') {
                        iconName = 'person'; // Changed to a more relevant icon
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={30} color={color} />;
                },
            })}
        >
            <Bottom.Screen name="Home" component={Home} />
            <Bottom.Screen name="Map" component={Map} />
            <Bottom.Screen name="Statistic" component={Statistic} />
            <Bottom.Screen name="Profile" component={Profile} options={{
                headerTitleStyle: {
                    color: "white"
                }
            }} />
        </Bottom.Navigator>
    )
}

export default BottomNavigator