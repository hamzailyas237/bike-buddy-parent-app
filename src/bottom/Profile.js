import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CStyles from '../style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../utils';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [user, setUser] = useState({});
  const navigation = useNavigation();
  const mapRef = useRef(null); // Ref for accessing MapView methods
  const [latitude, setLatitude] = useState(25.1929837);
  const [longitude, setLongitude] = useState(66.4959539);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('plate-no');
        const response = await axios.get(`${API_BASE_URL}/user/${value}`);
        console.log('response', response?.data?.user);
        setUser(response?.data?.user);
        setLatitude(parseFloat(response?.data?.user.latitude));
        setLongitude(parseFloat(response?.data?.user.longitude));
        mapRef.current.animateToRegion({
          latitude: parseFloat(response?.data?.user.latitude),
          longitude: parseFloat(response?.data?.user.longitude),
          latitudeDelta: 0.01, // Adjust these values for desired zoom level
          longitudeDelta: 0.01,
        });
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>


    <View
      style={[
        CStyles.AppBg1,
        CStyles.pt5,
        CStyles.alignItemsCenter,
        {flex: 1},
      ]}>
      <View
        style={[
          CStyles.w95,
          CStyles.mt1,
          CStyles.alignItemsStart,
          CStyles.justifyContentAround,
          CStyles.p2,
          CStyles.bgWhite,
          CStyles.flexRow,
          CStyles.rounded,
        ]}>
        <View style={[CStyles.w70]}>
          <Text style={[CStyles.fs1, CStyles.textBold, CStyles.textBlack]}>
            {user?.riderName}
          </Text>
          <Text
            style={[
              CStyles.fs5,
              CStyles.textBlack,
              CStyles.pb1,
              CStyles.borderBottom1,
            ]}>
            Bike Rider
          </Text>
          <Text
            style={[
              CStyles.fs5,
              CStyles.textBold,
              CStyles.pt1,
              CStyles.textBlack,
            ]}>
            {user?.vehicleDescription}
          </Text>
          {/* <Text style={[CStyles.fs5, CStyles.textBold,CStyles.textBlack]}>MODAL - 2019</Text> */}
        </View>
        <View style={[CStyles.w30, CStyles.alignItemsCenter]}>
          <Icon name="two-wheeler" size={100} color={CStyles.AppColorDark} />
          <Text style={[CStyles.bgGrey, CStyles.p1, CStyles.rounded]}>
            {user?.numberPlate}
          </Text>

          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              navigation.navigate('OnBoarding');
            }}
            style={[
              CStyles.shadow3,
              CStyles.w100,
              CStyles.m1,
              CStyles.px2,
              CStyles.py1,
              CStyles.rounded,
              CStyles.AppBg1,
              CStyles.alignItemsCenter,
              CStyles.fs5,
              CStyles.textWhite,
            ]}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          CStyles.w95,
          CStyles.alignItemsStart,
          CStyles.justifyContentAround,
          CStyles.p2,
          CStyles.mt1,
          CStyles.bgWhite,
          CStyles.rounded,
        ]}>
        <Text
          style={[
            CStyles.fs3,
            CStyles.textCenter,
            CStyles.w100,
            CStyles.textBold,
            CStyles.textBlack,
          ]}>
          DEFINE VALUES
        </Text>
        <View style={[CStyles.flexRow, CStyles.justifyContentBetween]}>
          <View
            style={[
              CStyles.shadow3,
              CStyles.w45,
              CStyles.m1,
              CStyles.p2,
              CStyles.rounded,
              CStyles.AppBg1,
              CStyles.alignItemsCenter,
            ]}>
            <Text style={[CStyles.fs5, CStyles.textWhite]}>Speed Limit</Text>
            <Text style={[CStyles.fs2, CStyles.textWhite, CStyles.textBold]}>
            60 km/h
            </Text>
          </View>
          <View
            style={[
              CStyles.shadow3,
              CStyles.w45,
              CStyles.m1,
              CStyles.p2,
              CStyles.rounded,
              CStyles.AppBg1,
              CStyles.alignItemsCenter,
            ]}>
            <Text style={[CStyles.fs5, CStyles.textWhite]}>Distance Limit</Text>
            <Text style={[CStyles.fs2, CStyles.textWhite, CStyles.textBold]}>
              700 m
            </Text>
          </View>
        </View>
        <View style={[CStyles.flexRow, CStyles.alignItemsCenter, CStyles.mb1]}>
          <Icon name="location-on" color={CStyles.AppColorDark} size={40} />
          <View>
            <Text style={[CStyles.fs5, CStyles.textBlack, CStyles.textBold]}>Home Location </Text>
            {/* <Text style={[CStyles.fs5, CStyles.textBlack, CStyles.textBold]}>
              North Nazimabad, block 02
            </Text> */}
          </View>
        </View>
        {/* <View style={[CStyles.w100, CStyles.h50]}> */}
        {/* <Icon name="location-on" color={CStyles.AppColorDark} size={40} /> */}
        <MapView
          ref={mapRef}
          style={[CStyles.w100,
                // CStyles.h50,
                { height: 250 }
        ]}
        title={'HOME'}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.092,
            longitudeDelta: 0.0121,
          }}>

          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}>
            <Icon name="location-on" size={50} color={CStyles._danger} />
          </Marker>
        </MapView>
        {/* </View> */}
      </View>
    </View>
    </ScrollView>

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
export default Profile;
