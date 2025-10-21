import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
  Pressable
} from 'react-native';

import StoreData from '../classes/StoreData';

//My components
import ModalCard from './ModalCard';
import Location from './Location';


const JobList = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  
  const fetchData = async (link) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(link);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      setData(jsonData.data);
      await StoreData.saveData('joblist', data) 
      
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
      
    } finally {
      setLoading(false);
      
    }
  };
  
  
  async function getList(){
    let coordinates = await StoreData.getData('location');
    let link = 'https://mobile.handswork.pro/api/shifts/map-list-unauthorized?latitude='+coordinates.lat+'&longitude='+coordinates.long
    fetchData(link);
    console.log(data);
  } 
  
  const hadleModalBtnPress = () => {
    setModalVisible(false);
  }
  
  const [id, setId] = useState(null);
  
  return (
    <View style={styles.container}>
      <Location/>
      {/*
        <ModalCard
          visible={modalVisible}
          id={id}
          data={data}
          onCustomPress={hadleModalBtnPress}
        />
      */}
    
      {loading && (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Загружаем информацию...
          </Text>
        </View>
      )}
      
      {error && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
      
      <FlatList
        contentContainerStyle={{marginTop: 18, padding:'2%'}}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={()=>{
              navigation.navigate('Details', {
                id: item.id,
                data: item,
              })
              //setModalVisible(true)
              //setId(item.id);
            }}
          >
            <View style={styles.listItem}>
              <View style={styles.row}>
                <View>
                  <Text>Адрес: {item.address.length > 10 && item.address.slice(0, 17)+'...' }</Text>
                  <Text>Компания: {item.companyName.length > 10 ? item.companyName.slice(0, 17)+'...' : item.companyName}</Text>
                  <Text>Цена: {item.priceWorker}</Text>
                  
                </View>
                <View style={{borderWidth:0, flex:1, justifyContent:'center'}}>
                  <Image
                    source={ item.logo ? {uri: item.logo} : 'No image'}
                    style={{ width: 50, height: 50, alignSelf: 'flex-end'}}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          loading ? null : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Информация о сменах еще не загружена...
            </Text>
            
          )
        }
      />
      
      <View style={styles.btn}>
        <Button
          onPress={()=> {getList()}}
          title={'Посмотреть смены'}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:0
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
  listItem: {
    height:70,
    borderRadius:3,
    borderWidth:1,
    borderColor:'#BFBFBF',
    marginBottom:5,
    padding:5,
    backgroundColor:'#E5E5E5',
    elevation:4
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
  },
  btn: {
    borderWidth:0,
    flex:0,
    position: 'end',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  }
});

export default JobList;
