import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import CStyles from '../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {API_BASE_URL} from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

const OnBoarding = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({
    riderName: '',
    parentEmail: '',
    riderEmail: '',
    numberPlate: '',
    vehicleDescription: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('plate-no');
        if (value) {
          navigation.navigate('Home');
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const handleDataChange = (key, value) => {
    console.log(key, value)
    if (key == 'numberPlate') {
      setData({
        ...data,
        [key]: value.toUpperCase(),
      });
    } else {
      setData({
        ...data,
        [key]: value,
      });
    }
  };

  console.log(data);
  const saveData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, data);
      try {
        await AsyncStorage.setItem(
          'plate-no',
          response?.data?.user?.numberPlate,
        );
        navigation.navigate('Home');
      } catch (error) {
        console.log('error', error);
      }
    } catch (error) {
      console.error('Error saving data:', error?.response?.data?.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View
        style={[
          CStyles.alignItemsCenter,
          CStyles.AppBg1,
          CStyles.py5,
          {flex: 1},
        ]}>
        <Text
          style={[
            {fontSize: 50},
            CStyles.textBold,
            CStyles.textWhite,
            CStyles.mb2,
          ]}>
          Bike Buddy
        </Text>
        <Text
          style={[
            CStyles.fs2,
            CStyles.textBold,
            CStyles.textDanger,
            CStyles.mb3,
          ]}>
          Safety in Every Spin
        </Text>

        <TextInput
          label="Rider Name"
          value={data.riderName}
          mode="outlined"
          onChangeText={text => handleDataChange('riderName', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter rider name"
          keyboardType="name-phone-pad"
        />
        <TextInput
          label="Parent Email"
          value={data.parentEmail}
          mode="outlined"
          onChangeText={text => handleDataChange('parentEmail', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput
          label="Rider Email"
          value={data.riderEmail}
          mode="outlined"
          onChangeText={text => handleDataChange('riderEmail', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter your rider email"
          keyboardType="email-address"
        />
        <TextInput
          label="Number Plate"
          value={data.numberPlate}
          mode="outlined"
          onChangeText={text => handleDataChange('numberPlate', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter your number plate"
          keyboardType="name-phone-pad"
        />
        <TextInput
          label="Vehilce Name and Model"
          value={data.vehicleDescription}
          mode="outlined"
          onChangeText={text => handleDataChange('vehicleDescription', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter your number plate"
          keyboardType="name-phone-pad"
        />
        <TextInput
          label="Home Location Latitude"
          value={data.latitude}
          mode="outlined"
          onChangeText={text => handleDataChange('latitude', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter your home Latitude"
          keyboardType="name-phone-pad"
        />
        <TextInput
          label="Home Location Longitude"
          value={data.longitude}
          mode="outlined"
          onChangeText={text => handleDataChange('longitude', text)}
          style={[{width: '80%'}, CStyles.mb1]}
          theme={{dark: false}}
          placeholder="Enter your home Longitude"
          keyboardType="name-phone-pad"
        />
        {/* <TextInput
        label="Home Location"
        value={data.location}
        mode="outlined"
        onChangeText={text => handleDataChange('location', text)}
        style={[{width: '80%'}, CStyles.mb1]}
        theme={{dark: false}}
        placeholder="Enter your pinnned home locaotion"
        keyboardType="name-phone-pad"
      /> */}
        <TouchableOpacity
          onPress={saveData}
          style={[styles.saveButton, {backgroundColor: '#fc2f00'}]}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveButton: {
    width: screenWidth * 0.8,
    alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default OnBoarding;
