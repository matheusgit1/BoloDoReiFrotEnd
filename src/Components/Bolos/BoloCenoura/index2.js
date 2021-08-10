
import React,{useLayoutEffect, useEffect, useContext, useState} from 'react';
import { View,Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Platform,FlatList,ActivityIndicator, ScrollView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../../Contexts/Auth'
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import ListItem from '../../ListItem';
import SpecialListItemRicePaper from '../../ListItem/SpecialListItemRicePaper';
import BoloC from './index';




export default function BoloConfeitado() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  //massa branca-chocolate

  const [ToggleCheckBoxWhiteMass, setToggleCheckBoxWhiteMass] = useState(false);
  const [ToggleCheckBoxChocolateMass, setToggleCheckBoxChocolateMass] = useState(false);

  //formato do bolo

  const [ToggleCheckBoxTypeCircle, setToggleCheckBoxTypeCircle] = useState(false);
  const [ToggleCheckBoxTypeSquare, setToggleCheckBoxTypeSquare] = useState(false);

  //recheios
  const [ToggleCheckBoxRCHMilkWithCoco, setToggleCheckBoxRCHMilkWithCoco] = useState(false);
  const [ToggleCheckBoxRCHPlum, setToggleCheckBoxRCHPlum] = useState(false);
  const [ToggleCheckBoxRCHChocolate, setToggleCheckBoxRCHChocolate] = useState(false);
  const [ToggleCheckBoxRCHLimon, setToggleCheckBoxRCHLimon] = useState(false);
  const [TogleCheckBoxRCHStrawberry, setTogleCheckBoxRCHStrawberry] = useState(false);
  const [TogleCheckBoxRCHGuava, setTogleCheckBoxRCHGuava] = useState(false);
  const [TogleCheckBoxRCHSweetMilk, setTogleCheckBoxRCHSweetMilk] = useState(false);
  const [TogleCheckBoxRCHPassionFruit, setTogleCheckBoxRCHPassionFruit] = useState(false);
  
  //coberturas
  const [TogleCheckBoxCBChantilly, setTogleCheckBoxCBChantilly ] = useState(false);
  const [TogleCheckBoxCBgnl, setTogleCheckBoxCBgnl ] = useState(false);

  //papel de arroz
  const [TogleCheckBoxRicePaper,setTogleCheckBoxRicePaper] = useState(false);

  //buscar e armazenar imagnes do banco de dados
  const [dataImage, setDataImage] = useState([]);
  const [loading, setLoading] = useState(false);


  //dados
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Weight, setWeight] = useState('');
  const [Writte, setWritte] = useState('');
  const [Observ, setObserv] = useState('');

  useEffect(()=>{
    setLoading(true);
    async function getCakeImagesFromStorage(){
    await firestore().collection('papel_arroz').onSnapshot(snapshot => {
      const listImage = [];
        
      snapshot.forEach(doc => {
      //doc.foto == null
          listImage.push({
            ...doc.data(),
            id: doc.id,
          });
          setDataImage(listImage);
        
        //console.log(dataImage);
        });  
    })
    setLoading(false);
  }
  getCakeImagesFromStorage();
  //console.log(dataImage);
},[])


  useLayoutEffect(()=>{
    async function headerConstruct(){
      await firestore().collection('bolo_cenoura').onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          //doc.foto == null
          if(doc.id == 'promocao'){
            let promotion = doc.data()
            if(promotion.promo == 'sim'){
              const options = navigation.setOptions({
                headerRight:()=>(
                  <View style={{backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', margin: 5, padding: 5, borderRadius: 7}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}> promoção</Text>
                  </View>
                )
              })
            }
          }
        });  
      })
    }
    headerConstruct();
  },[]);


 return (
   <SafeAreaView style={styles.container}>
     <ScrollView>
      
      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput value={user.nome} placeholder="seu nome" placeholderTextColor="#111" style={styles.Text_Input}
           onChangeText={(text)=>{setName(text)}}/>
        </TouchableOpacity>
      </View>


      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput keyboardType='number-pad' placeholder="telefone" placeholderTextColor="#111" style={styles.Text_Input}
          onChangeText={(text)=>{setPhone(text)}}/>
        </TouchableOpacity>
      </View>


      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput keyboardType='number-pad' placeholder="peso" placeholderTextColor="#111" style={styles.Text_Input}
          onChangeText={(text)=>{setWeight(text)}}/>
        </TouchableOpacity>
      </View>

      <View style={styles.ViewContainerVariant}>

        <TouchableOpacity style={styles.VarianteView}>
          <Feather name="calendar" size={25} color="#111" style={{marginRight: 8}}/><Text style={styles.ButtonText}>Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.VarianteView}>
          <Feather name="clock" size={25} color="#111" style={{marginRight: 8}}/><Text style={styles.ButtonText}>Hora</Text>
        </TouchableOpacity>
      </View>
      


      
      

      {/**list item papel_arroz */}
      <View style={{justifyContent: 'flex-start',flexDirection: 'column',  margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
        <View style={{justifyContent: 'flex-start',flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', }}>Papel de Arroz:</Text>
          <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
            
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={TogleCheckBoxRicePaper}
                onValueChange={(value)=>{setTogleCheckBoxRicePaper(value)}}
                tintColors={"#f61f07", "#fff" }
                />
              ) : (
                <CheckBox disabled={false} value={TogleCheckBoxRicePaper}
                onValueChange={(value)=>{setTogleCheckBoxRicePaper(value)}}
                tintColor="#fff" onCheckColor="#f61f07" 
                />
              )
            }
          </View>  
        </View>
        <View style={{margin: 1, justifyContent: 'flex-start', backgroundColor: '#f61f07', padding: 11}}>     
          {
            loading ? <ActivityIndicator color="red" size={145}/> :
            <FlatList horizontal={true} style={styles.FlatListContainer}  showsHorizontalScrollIndicator={false} data={dataImage}
            keyExtractor={(item)=>item.id} renderItem={({item})=><SpecialListItemRicePaper data={item}/>}/>
          } 
        </View>  
      </View>


      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput value={Writte} placeholder="escrever" placeholderTextColor="#111" style={styles.Text_Input}
           onChangeText={(text)=>{setWritte(text)}}/>
        </TouchableOpacity>
      </View>


      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput value={Observ} placeholder="observação" placeholderTextColor="#111" style={styles.Text_Input}
           onChangeText={(text)=>{setObserv(text)}}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.ViewContainerButtonFinish}>
        <TouchableOpacity style={styles.ButtonFinish} onPress={()=>{navigation.navigate('Home')}}>
          <Text style={{margin: 12, color: '#fff', fontWeight: 'bold', fontSize: 22}}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>


     </ScrollView>
   </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ff8305' , flex: 1,
  },
  input:{
    backgroundColor: '#f61f07', borderRadius: 9,
  },
  Text_Input:{
    fontSize: 21, textAlign: 'center', justifyContent: 'center', alignItems: 'center'
  },
  ViewContainer:{
    margin: 8, justifyContent: 'center', 
  },
  ViewContainerVariant:{
    margin: 1, flexDirection: 'row', justifyContent: 'space-between',
  },
  VarianteView:{
    marginHorizontal: 15, marginVertical: 9, backgroundColor: '#f61f07',
    paddingHorizontal: 25, paddingVertical: 15, borderRadius: 9, flexDirection: 'row', alignItems: 'baseline'
  },
  ButtonText:{
    fontSize: 18, color: '#111'
  },
  ViewRCHContainer:{
    flexDirection: 'row', alignItems:'center'
  },
  ViewRCHContainerText:{
    fontSize: 18, fontWeight: 'bold'
  },
  FlatListContainer:{
    flexDirection: 'row'
  },
  ViewContainerButtonFinish:{
    margin: 8, justifyContent: 'center', backgroundColor: 'blue', borderRadius: 9, alignItems: 'center'
  },
  ButtonFinish:{

  }

});


//#f61f07
//#ff8305