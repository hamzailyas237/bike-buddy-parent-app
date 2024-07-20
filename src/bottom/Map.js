import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CStyles from '../style';

const Map = ({ navigation }) => {
  const [mlat, setMLat] = useState(37.78825)
  const [mlong, setMLong] = useState(-122.301)
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={()=>navigation.navigate("Outofrange")} style={[CStyles.positionAbsolute, CStyles.flexRow, CStyles.w90, CStyles.AppBg1,CStyles.p2,CStyles.rounded,CStyles.alignItemsCenter, { top: 60,zIndex:1 }]}>
        <Icon name="location-on" size={30} color={CStyles._white} />
        <View style={[CStyles.mx1]}>
          <Text style={[CStyles.fs5, CStyles.textWhite]}>70m</Text>
          <Text style={[CStyles.fs5, CStyles.textWhite, CStyles.textBold]}>North Nazimabad, block 02</Text>
        </View>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mlat,
          longitude: mlong,
          latitudeDelta: 0.092,
          longitudeDelta: 0.121,
        }}
      >
        <Marker
          coordinate={{
            latitude: mlat,
            longitude: mlong,
          }}
          title={"bike"}
        // onPress={() => {
        //   setSelectedBike(bike);
        //   // setModalVisible(true);
        //   openModal();
        // }}
        />
          {/* <View style={[CStyles.bgDanger, CStyles.roundedPill, { padding: 4 }]}>
            <Icon name="two-wheeler" size={50} color={CStyles._white} />
          </View> */}
          {/* <Image source={imagePath.icBike} style={{ width: 70, height: 70, }} /> */}
        {/* </Marker> */}
      </MapView>
    </View>
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

export default Map