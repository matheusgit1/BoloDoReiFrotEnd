import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
//import Routes from ''
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/Routes';
import AuthProvider from './src/Contexts/Auth';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="rgb(255,199,0)" barStyle="default" translucent={false}/>
        <Routes/>
      </AuthProvider>  
    </NavigationContainer>
  );
}

