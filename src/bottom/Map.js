import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CStyles from '../style';
import axios from 'axios';
import {API_BASE_URL} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../Components/Loader';

const Map = ({navigation}) => {
  const [riderLocation, setRiderLocation] = useState({
    latitude: null,
    longitude: null,
    speed: null,
    distance: null,
    lastSpeed: null,
    lastDistance: null,
  });

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('plate-no');
      const response = await axios.get(`${API_BASE_URL}/user/${value}`);
      const data = response?.data?.user;
      setRiderLocation({
        latitude: parseFloat(data?.riderLatitude),
        longitude: parseFloat(data?.riderLongitude),
        lastSpeed: data?.lastSpeed,
        lastDistance: data?.lastDistance,
        // speed: data?.speed,
        // distance: data?.distance,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(getUserData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!riderLocation?.latitude || !riderLocation?.longitude ? (
        <AppLoader />
      ) : (
        <View
          style={{
            color: 'black',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Outofrange')}
            style={[
              CStyles.positionAbsolute,
              CStyles.flexRow,
              CStyles.w90,
              CStyles.AppBg1,
              CStyles.p2,
              CStyles.rounded,
              CStyles.alignItemsCenter,
              {top: 60, zIndex: 1},
            ]}>
            <Icon name="location-on" size={30} color={CStyles._white} />
            <View style={[CStyles.mx1]}>
              <Text style={[CStyles.fs5, CStyles.textWhite]}>70m</Text>
              <Text style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
                North Nazimabad, block 02
              </Text>
            </View>
          </TouchableOpacity> */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: riderLocation?.latitude,
              longitude: riderLocation?.longitude,
              latitudeDelta: 0.092,
              longitudeDelta: 0.121,
            }}>
            <Marker
              coordinate={{
                latitude: riderLocation?.latitude,
                longitude: riderLocation?.longitude,
              }}
              title={'bike'}
            />
          </MapView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 'auto',
    width: 'auto',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
