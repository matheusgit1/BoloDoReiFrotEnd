import Swipeable, {} from 'react-native-gesture-handler/Swipeable';
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import ListItem from '../../ListItem';
import Buttons from '../../Buttons/AddPromotion';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import GlobalVars from '../../VariaveisGlobais/GlobalVars';


export default function BoloFuba(){

    const [dataImage, setDataImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [promotion,setPromotion] = useState(false);
    const [price, setPrice] = useState('15,99');

    useEffect(()=>{
      setLoading(true);
      async function getCakeImagesFromStorage(){
        await firestore().collection('bolo_fuba').onSnapshot(snapshot => {
        const listImage = [];
          snapshot.forEach(doc => {
            //doc.foto == null
            if(doc.id == 'preco'){
              let valor = doc.data();
              setPrice(valor.valor);
              setPrice(valor.valor);
              GlobalVars.ValorBoloFuba = parseFloat(price).toFixed(2);
            }

            if(doc.id == 'promocao'){
              let promotion = doc.data()
              if(promotion.promo == 'sim'){
                setPromotion(true);
              }
              else{
                setPromotion(false);
              }
              //console.log(promotion.promo)
            }
            else{
              listImage.push({
                ...doc.data(),
                id: doc.id,
              });
              setDataImage(listImage);
            }
            //console.log(dataImage);
          });  
        })
        setLoading(false);
      }
      getCakeImagesFromStorage();
      //console.log(dataImage);
    },[])

    return (
    <SafeAreaView style={styles.Primary_Container}>
        <ScrollView>
            <ScrollView style={{marginBottom: 5}} showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.container}>
                <View style={styles.Cab}>
                    <Text style={styles.Title}>Bolo de Fubá</Text>
                    <Text style={styles.Preco}>R${price} Un</Text>
                </View>
                {
                    loading ? <ActivityIndicator color="red" size={145}/> :
                    <FlatList horizontal={true} style={styles.FlatListContainer}  data={dataImage}
                    keyExtractor={(item)=>item.id} renderItem={({item})=><ListItem data={item}/>}/>
                }
                <Buttons promo={promotion} screenNavigation="Bolo de Fubá"/>
                </View>
            </View>
            </ScrollView>
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
    backgroundColor: 'red',
  }
});
