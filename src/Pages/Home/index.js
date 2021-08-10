import Swipeable, {} from 'react-native-gesture-handler/Swipeable';
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import BoloConfeitado from '../../Components/Bolos/BoloConfeitado';
import BoloPitangado from '../../Components/Bolos/BoloPitangado';
import BoloLeiteNinho from '../../Components/Bolos/BoloLeiteNinho';
import BoloGelado from '../../Components/Bolos/BoloGelado';
import BoloCacarola from '../../Components/Bolos/BoloCacarola';
import BoloCenoura from '../../Components/Bolos/BoloCenoura';
import BoloFuba from '../../Components/Bolos/BoloFuba';
import BoloAipim from '../../Components/Bolos/BoloAipim';
import AllRights from '../../Components/AllRights';
import PizzaCalabresa from '../../Components/Pizzas/PizzaCalabresa';
import PizzaFrango from '../../Components/Pizzas/PizzaFrango';
import PizzaMista from '../../Components/Pizzas/PizzaMista';
import PizzaPortuguesa from '../../Components/Pizzas/PizzaPortuguesa';
import PaoDeQueijo from '../../Components/PaoDeQueijo/PaoQueijo';
import TortaFrango from '../../Components/Tortas/TortaDeFrango';
import TortaRequeijao from '../../Components/Tortas/TortaDeRequeijao';
import PaoCaseiro from '../../Components/PaoDeQueijo/PaoCaseiro';
import Salgados from '../../Components/Salgados/Salgados';
import Topper from '../../Components/Topper/Topper';
import Docinho from '../../Components/Docinhos/DocinhoCaseiro';
import KitFesta from '../../Components/KitFesta/Kit';
import Empadao from '../../Components/Empadao/Empada';

/**
 * <PizzaCalabresa/>
      <PizzaFrango/>
      <PizzaMista/>
      <PizzaPortuguesa/>
      <PaoDeQueijo/>
      <TortaFrango/>
      <TortaRequeijao/>
      <PaoCaseiro/>
      <Salgados/>
      <Topper/>
      <Docinho/>
      <KitFesta/>
      <Empadao/>
 */





export default function Home() {

 return (
  <SafeAreaView style={styles.Primary_Container}>
    <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <Text style={styles.Primary_Title}>O que vai pedir pra hoje? </Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <BoloConfeitado/>
      <BoloPitangado/>
      <BoloLeiteNinho/>
      <BoloGelado/>
      <BoloCacarola/>
      <BoloCenoura/>
      <BoloFuba/>
      

      <AllRights/>
    </ScrollView>
  </SafeAreaView>    
  );
}


const styles = StyleSheet.create({
  container:{
    paddingVertical: 15,  backgroundColor: '#f2ab23', 
  },
  FlatListContainer:{
    flexDirection: 'row'
  },
  Title:{
    fontSize: 18, marginLeft: 12, paddingLeft: 3, fontWeight: 'bold'
  },
  Preco:{
    fontSize: 18, marginRight: 12, paddingRight: 3, fontWeight: 'bold'
  },
  Cab:{
    justifyContent: 'space-between', flexDirection: 'row', 
  },
  Primary_Title:{
    paddingVertical: 5,
    fontSize: 25, fontWeight: 'bold', color: '#111'
  },
  Primary_Container:{
    backgroundColor: 'red', flex: 1,
  }
});

