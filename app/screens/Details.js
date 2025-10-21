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
  console.log(data);
  
  const details = [
    {title: 'Адрес объекта', data: data.address, },
    {title: 'Компания-наниматель', data: data.companyName, },
    {title: 'Рейтинг', data: data.customerRating, },
    {title: 'Дата начала работ', data: data.dateStartByCity, },
    {title: 'Рабочее время', data: 'c ' + data.timeStartByCity + ' до '+ data.timeEndByCity, },
    {title: 'Выплата за смену', data: data.priceWorker, },
    {title: 'Тип услуг', data: Object.values(data.workTypes[0].name), },
    {title: 'Требуемое количество работников', data: data.planWorkers, },
    {title: 'Набрано', data: data.currentWorkers, },
  ]
  
  return (
    <View style={styles.container}>
      {details.map( item => (
        <View>
          <Text style={{fontWeight:'bold', marginTop:10}}>{item.title}</Text>
          <Text>{item.data}</Text>
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
