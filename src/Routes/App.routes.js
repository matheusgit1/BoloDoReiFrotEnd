import React, {useEffect} from 'react';
import { View, Text } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';

import BoloAipim from '../Components/Bolos/BoloAipim/index2';
import BoloCacarola from '../Components/Bolos/BoloCacarola/index2';
import BoloCenoura from '../Components/Bolos/BoloCenoura/index2';
import BoloConfeitado from '../Components/Bolos/BoloConfeitado/index2';
import BoloFuba from '../Components/Bolos/BoloFuba/index2';
import BoloGelado from '../Components/Bolos/BoloGelado/index2';
import BoloLeiteNinho from '../Components/Bolos/BoloLeiteNinho/index2';
import BoloPitangado from '../Components/Bolos/BoloPitangado/index2';


export default function AppRoutes() {
 const Drawer = createDrawerNavigator();
 
 return (
   <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor: '#ff8305'}}
   drawerContentOptions={{activeTintColor: '#000', activeBackgroundColor: '#f61f07',
   marginTop: 10, labelStyle:{fontSize: 15, fontWeight:'bold'}}}>


      <Drawer.Screen options={{headerShown: false}} name="Home" component={Home} />

      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07', borderBottomWidth: 3, borderBottomColor: '#ff8305'
        }}} name="Bolo Confeitado" component={BoloConfeitado}/>

      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo Pitangado" component={BoloPitangado}/>


      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo de Leite Ninho" component={BoloLeiteNinho}/>


      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo de Cenoura" component={BoloCenoura}/>


      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo Caçarola" component={BoloCacarola}/>


      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo de Aipim" component={BoloAipim}/>


      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo de Fubá" component={BoloFuba}/>


      <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Bolo Gelado" component={BoloGelado}/>

      {
        /**
         * <Drawer.Screen options={{headerShown: true, headerStyle:{
        backgroundColor: '#f61f07'
        }}} name="Perfil" component={Profile}/>
        */
      }
      
      

   </Drawer.Navigator>
  );
}


