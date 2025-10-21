//NOT USED


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
  Pressable,
  Modal,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const ModalCard = ({id, data, visible, onCustomPress}) => {
  
  return (
    <View>
      <Modal
        visible={visible}
        animationType='fade'
        transparent={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {data.map(item => (
                item.id === id &&
                <View style={{alignItems:'center'}}>
                  <Text style={{fontWeight:'bold',fontSize:18}}>Подробная информация</Text>
                  <ScrollView>
                  
                    <Text style={{fontWeight:'bold', marginTop:10}}>Адрес объекта</Text>
                    <Text>{item.address}</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Компания-наниматель</Text>
                    <Text>{item.companyName}</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Рейтинг</Text>
                    <Text>{item.customerRating ? item.customerRating : '-'}</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Дата начала работ</Text>
                    <Text>{item.dateStartByCity}</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Рабочие часы</Text>
                    <Text>с {item.timeEndByCity} до {item.timeStartByCity}</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Выплата за смену</Text>
                    <Text>{item.priceWorker}</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Тип работ</Text>
                    {item.workTypes.map(type=>(
                      <Text>{type.name}</Text>
                    ))}
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Требуемое количество работников</Text>
                    <Text>{item.planWorkers} человек</Text>
                    
                    <Text style={{fontWeight:'bold', marginTop:10}}>Набрано</Text>
                    <Text>{item.currentWorkers}</Text>
                    
                  </ScrollView>
                </View>
              ))}
            </View>
            <View style={styles.modalBtn}>
              <Button
                onPress={()=>{onCustomPress()}}
                title={'закрыть'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: height*0.1,
    height: width*1.1,
    width: width*0.8,
    backgroundColor: '#f7f2e8',
    borderRadius:4,
    alignItems: 'center',
    alignSelf: 'center',
    elevation:15,
    borderWidth:1,
    borderColor:'gray',
    paddingTop:width*0.06,
    alignItems:'center'
  },
  modalContent: {
    flex:1,
    borderWidth:0,
    height: width*0.9,
    width: width*0.7,
    alignItems:'center',
    

  },
  modalBtn: {
    //padding:5,
    paddingBottom:15,
    paddingTop:2
  }
});

export default ModalCard;
