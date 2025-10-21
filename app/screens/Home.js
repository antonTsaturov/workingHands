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

import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import JobList from '../components/JobList';


function HomeScreen() {
  
  const navigation = useNavigation();
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor:'lightgray',
    flex:1,
  };

  
  return (
    <View style={backgroundStyle}>
      <JobList
        navigation={navigation}
      />
    </View>
  );
}

export default HomeScreen;
