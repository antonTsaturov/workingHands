import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ActivityIndicator
} from 'react-native';

import {StoreData} from './asyncstorage'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
  let result;
  try {
    const jsonValue = await AsyncStorage.getItem('location');
    //console.log(JSON.parse(jsonValue));
    jsonValue != null ? result = JSON.parse(jsonValue) : null;
    return result;
  } catch (e) {
      console.log(e);
  }
  
};


const JobList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = async (link) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(link);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  
  async function getList(){
    let coordinates = await getData();
    //console.log(coordinates.lat);
    let link = 'https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude='+coordinates.lat+'&longitude='+coordinates.long
    fetchData(link);
    console.log(data);
  } 
  
  return (
    <View>
      <Button
        onPress={()=> {getList()}}
        title={'Посмотреть смены'}
      />

      {loading && <ActivityIndicator size="large" />}
      
      {error && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
      
      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.title}>{data.title}</Text>
          <Text>{data.body}</Text>
        </View>
      )}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default JobList;
