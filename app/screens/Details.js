import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

function DetailScreen({ route }) {
  
  const { id, data } = route.params;
  
  return (
    <View style={styles.container}>
      {data?.map((item, index) => (
        item.id === id &&
        <View>
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
          
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:15,
    borderWidth:0
  },
});

export default DetailScreen;
