import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

function DetailScreen({ route }) {
  
  const { id, data } = route.params;
  
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
      {details.map( (item, index) => (
        <View>
          <Text key={'Title'+index} style={{fontWeight:'bold', marginTop:10}}>
            {item.title}
          </Text>
          <Text key={'Data'+index}>
            {item.data ? item.data : '-'}
          </Text>
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
