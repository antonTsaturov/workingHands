import React, { useState, useEffect } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import StoreData from '../classes/StoreData';

const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      setError('Location permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        
      },
      (error) => {
        setError(error.message);
      },
      {
        accuracy: {
          android: 'high',
          //ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
    location ? await StoreData.saveData('location', {lat: location.latitude, long: location.longitude}) : console.log('Error in getLocation');
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{ padding: 0 }}>
      {location ? (
        <View>
          {/*
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
            <Text>Accuracy: {location.accuracy} meters</Text>
            <Text>Altitude: {location.altitude || 'N/A'}</Text>
            <Text>Heading: {location.heading || 'N/A'}</Text>
            <Text>Speed: {location.speed || 'N/A'}</Text>
          */}
        </View>
      ) : (
        <Text>Getting location...</Text>
      )}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
    </View>
  );
};

export default Location;
