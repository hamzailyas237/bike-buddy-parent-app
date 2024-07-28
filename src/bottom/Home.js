import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE_URL} from '../utils';
import CStyles from '../style';
import AppLoader from '../Components/Loader';

const Home = ({navigation}) => {
  const mapRef = useRef(null);
  // const [mlat, setMLat] = useState(25.1929837);
  // const [mlong, setMLong] = useState(66.4959539);

  const [riderLocation, setRiderLocation] = useState({
    latitude: null,
    longitude: null,
    homeLatitude: null,
    homeLongitude: null,
    speed: null,
    distance: null,
    lastSpeed: null,
    lastDistance: null,
  });
  const [averageSpeed, setAverageSpeed] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('plate-no');
        if (!value) {
          navigation.navigate('OnBoarding');
        }
      } catch (e) {
        console.error('Error reading value:', e);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('plate-no');
  //       const response = await axios.get(`${API_BASE_URL}/user/${value}`);
  //       setMLat(parseFloat(response?.data?.user.latitude));
  //       setMLong(parseFloat(response?.data?.user.longitude));
  //       // Animate to the user's location with a default zoom level
  //       mapRef.current.animateToRegion({
  //         latitude: parseFloat(response?.data?.user.latitude),
  //         longitude: parseFloat(response?.data?.user.longitude),
  //         latitudeDelta: 0.01, // Adjust these values for desired zoom level
  //         longitudeDelta: 0.01,
  //       });
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   getUserData();
  // }, []);

  const calculateAverageSpeed = speedArray => {
    if (speedArray.length === 0) return 0; // Return 0 if the array is empty
    const totalSpeed = speedArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    const avgSpeed = totalSpeed / speedArray.length;
    return avgSpeed;
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('plate-no');
      const response = await axios.get(`${API_BASE_URL}/user/${value}`);
      const data = response?.data?.user;
      const avgSpeed = calculateAverageSpeed(data?.speed);
      setAverageSpeed(avgSpeed);
      setRiderLocation({
        latitude: parseFloat(data?.riderLatitude),
        longitude: parseFloat(data?.riderLongitude),
        homeLatitude: parseFloat(data?.latitude),
        homeLongitude: parseFloat(data?.longitude),
        lastSpeed: data?.lastSpeed,
        lastDistance: data?.lastDistance,
        speed: data?.speed,
        distance: data?.distance,
      });
      mapRef.current.animateToRegion({
        latitude: parseFloat(response?.data?.user.latitude),
        longitude: parseFloat(response?.data?.user.longitude),
        latitudeDelta: 0.01, // Adjust these values for desired zoom level
        longitudeDelta: 0.01,
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
        <View style={[CStyles.positionRelative, {flex: 1}]}>
          <View
            style={[
              CStyles.positionAbsolute,
              CStyles.justifyContentCenter,
              CStyles.w100,
              CStyles.p1,
              CStyles.h30,
              CStyles.rounded,
              CStyles.bgWhite,
              {zIndex: 1, bottom: 0},
            ]}>
            <View
              style={[
                CStyles.flexRow,
                CStyles.justifyContentAround,
                CStyles.my1,
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Outofrange')}
                style={[
                  CStyles.flexRow,
                  CStyles.w45,
                  CStyles.AppBg1,
                  CStyles.p2,
                  CStyles.rounded,
                  CStyles.alignItemsCenter,
                ]}>
                <Icon name="location-on" size={30} color={CStyles._white} />
                <View style={[CStyles.mx1]}>
                  <Text style={[CStyles.fs6, CStyles.textWhite]}>
                    Last Distance
                  </Text>
                  <Text
                    style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
                    {riderLocation?.lastDistance}m
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Outofrange')}
                style={[
                  CStyles.flexRow,
                  CStyles.w45,
                  CStyles.AppBg1,
                  CStyles.p2,
                  CStyles.rounded,
                  CStyles.alignItemsCenter,
                ]}>
                <Icon name="speed" size={30} color={CStyles._white} />
                <View style={[CStyles.mx1]}>
                  <Text style={[CStyles.fs6, CStyles.textWhite]}>
                    Max Speed
                  </Text>
                  <Text
                    style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
                    {Math.max(...riderLocation?.speed).toFixed()}m/s
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[CStyles.flexRow, CStyles.justifyContentAround]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Outofrange')}
                style={[
                  CStyles.flexRow,
                  CStyles.w45,
                  CStyles.AppBg1,
                  CStyles.p2,
                  CStyles.rounded,
                  CStyles.alignItemsCenter,
                ]}>
                {/* <Icon name="schedule" size={30} color={CStyles._white} /> */}
                <Icon name="location-on" size={30} color={CStyles._white} />
                <View style={[CStyles.mx1]}>
                  <Text style={[CStyles.fs6, CStyles.textWhite]}>
                    Avg Distance
                  </Text>
                  <Text
                    style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
                    {Math.max(...riderLocation?.distance).toFixed()}m
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Outofrange')}
                style={[
                  CStyles.flexRow,
                  CStyles.w45,
                  CStyles.AppBg1,
                  CStyles.p2,
                  CStyles.rounded,
                  CStyles.alignItemsCenter,
                ]}>
                <Icon name="speed" size={30} color={CStyles._white} />
                <View style={[CStyles.mx1]}>
                  <Text style={[CStyles.fs6, CStyles.textWhite]}>
                    Avg Speed
                  </Text>
                  <Text
                    style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
                    {averageSpeed?.toFixed()}m/s
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: riderLocation?.homeLatitude,
              longitude: riderLocation?.homeLongitude,
              latitudeDelta: 0.01, // Initial delta values, will be overridden by animateToRegion
              longitudeDelta: 0.01,
            }}>
            <Marker
              coordinate={{
                latitude: riderLocation?.homeLatitude,
                longitude: riderLocation?.homeLongitude,
              }}
              title={'HOME'}
            />
          </MapView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Home;

// import {
//   View,
//   Text,
//   StyleSheet,
//   Touchable,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import MapView, {Marker} from 'react-native-maps';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import CStyles from '../style';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {API_BASE_URL} from '../utils';

// const Home = ({navigation}) => {
//   const [mlat, setMLat] = useState(25.1929837);
//   const [mlong, setMLong] = useState(66.4959539);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const value = await AsyncStorage.getItem('plate-no');
//         if (!value) {
//           // value previously stored
//           navigation.navigate('OnBoarding');
//         }
//       } catch (e) {
//         // error reading value
//       }
//     };
//     getData();
//   }, []);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const value = await AsyncStorage.getItem('plate-no');
//         console.log('value', value);
//         const response = await axios.get(`${API_BASE_URL}/user/${value}`);
//         console.log('response', response?.data?.user);
//         setUser(response?.data?.user);
//         setMLat(parseFloat(response?.data?.user.latitude));
//         setMLong(parseFloat(response?.data?.user.longitude));
//       } catch (error) {
//         console.error('Error saving data:', error);
//       }
//     };
//     getUserData();
//   }, []);

//   return (
//     <View
//       style={[
//         CStyles.positionRelative,
//         {flex: 1, justifyContent: 'center', alignItems: 'center'},
//       ]}>
//       <View
//         style={[
//           CStyles.positionAbsolute,
//           CStyles.justifyContentCenter,
//           CStyles.w100,
//           CStyles.p1,
//           CStyles.h30,
//           CStyles.rounded,
//           CStyles.bgWhite,
//           {zIndex: 1, bottom: 0},
//         ]}>
//         <View
//           style={[CStyles.flexRow, CStyles.justifyContentAround, CStyles.my1]}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Outofrange')}
//             style={[
//               CStyles.flexRow,
//               CStyles.w45,
//               CStyles.AppBg1,
//               CStyles.p2,
//               CStyles.rounded,
//               CStyles.alignItemsCenter,
//             ]}>
//             <Icon name="location-on" size={30} color={CStyles._white} />
//             <View style={[CStyles.mx1]}>
//               <Text style={[CStyles.fs6, CStyles.textWhite]}>Distance</Text>
//               <Text style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
//                 78m
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Outofrange')}
//             style={[
//               CStyles.flexRow,
//               CStyles.w45,
//               CStyles.AppBg1,
//               CStyles.p2,
//               CStyles.rounded,
//               CStyles.alignItemsCenter,
//             ]}>
//             <Icon name="speed" size={30} color={CStyles._white} />
//             <View style={[CStyles.mx1]}>
//               <Text style={[CStyles.fs6, CStyles.textWhite]}>Max Speed</Text>
//               <Text style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
//                 50km/h
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View style={[CStyles.flexRow, CStyles.justifyContentAround]}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Outofrange')}
//             style={[
//               CStyles.flexRow,
//               CStyles.w45,
//               CStyles.AppBg1,
//               CStyles.p2,
//               CStyles.rounded,
//               CStyles.alignItemsCenter,
//             ]}>
//             <Icon name="schedule" size={30} color={CStyles._white} />
//             <View style={[CStyles.mx1]}>
//               <Text style={[CStyles.fs6, CStyles.textWhite]}>Time</Text>
//               <Text style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
//                 1h 26min
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Outofrange')}
//             style={[
//               CStyles.flexRow,
//               CStyles.w45,
//               CStyles.AppBg1,
//               CStyles.p2,
//               CStyles.rounded,
//               CStyles.alignItemsCenter,
//             ]}>
//             <Icon name="speed" size={30} color={CStyles._white} />
//             <View style={[CStyles.mx1]}>
//               <Text style={[CStyles.fs6, CStyles.textWhite]}>Avg Speed</Text>
//               <Text style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>
//                 43km/h
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: mlat,
//           longitude: mlong,
//           // latitudeDelta: 0.0922,
//           // longitudeDelta: 0.0421,
//           latitudeDelta: 0.01, // Adjust the zoom level here
//           longitudeDelta: 0.01, // Adjust the zoom level here
//         }}>
//         <Marker
//           coordinate={{
//             latitude: mlat,
//             longitude: mlong,
//           }}
//           title={'HOME'}
//         />
//       </MapView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 'auto',
//     width: 'auto',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default Home;
