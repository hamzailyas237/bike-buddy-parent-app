import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const AppMap = () => {

    return (
            <MapView
                styles={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "auto",
        width: "auto",
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
export default AppMap