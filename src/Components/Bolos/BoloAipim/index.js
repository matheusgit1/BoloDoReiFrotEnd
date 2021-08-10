import React,{useLayoutEffect, useEffect, useContext, useState} from 'react';
import { View,Text, SafeAreaView, StyleSheet, TouchableOpacity,
  TextInput, Platform,FlatList,ActivityIndicator, ScrollView, Alert, Modal, KeyboardAvoidingView , Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import {AuthContext} from '../../../Contexts/Auth'
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import ListItem from '../../ListItem';
import SpecialListItemRicePaper from '../../ListItem/SpecialListItemRicePaper';
import DatePicker from '../../DatePicker';
import TimePicker from '../../TimePicker';
import BoloC from './index';
import {} from 'date-fns';
import ModalPedido from '../../ModalPedido';
console.disableYellowBox = true;




export default function BoloConfeitado() {

  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  //massa branca-chocolate

  const [ToggleCheckBoxWhiteMass, setToggleCheckBoxWhiteMass] = useState(false);
  const [ToggleCheckBoxChocolateMass, setToggleCheckBoxChocolateMass] = useState(false);

  //formato do bolo
  const [acess, setAcsses] = useState(true);
  const [ToggleCheckBoxTypeCircle, setToggleCheckBoxTypeCircle] = useState(false);
  const [ToggleCheckBoxTypeSquare, setToggleCheckBoxTypeSquare] = useState(false);

  //recheios
  const [ToggleCheckBoxRCHMilkWithCoco, setToggleCheckBoxRCHMilkWithCoco] = useState(false);
  const [ToggleCheckBoxRCHPlum, setToggleCheckBoxRCHPlum] = useState(false);
  const [ToggleCheckBoxRCHChocolate, setToggleCheckBoxRCHChocolate] = useState(false);
  const [ToggleCheckBoxRCHLimon, setToggleCheckBoxRCHLimon] = useState(false);
  const [ToggleCheckBoxRCHStrawberry, setToggleCheckBoxRCHStrawberry] = useState(false);
  const [ToggleCheckBoxRCHGuava, setToggleCheckBoxRCHGuava] = useState(false);
  const [ToggleCheckBoxRCHSweetMilk, setToggleCheckBoxRCHSweetMilk] = useState(false);
  const [ToggleCheckBoxRCHPassionFruit, setToggleCheckBoxRCHPassionFruit] = useState(false);
  const [GlobalRCH,setGlobalRCH] = useState([]);
  const [AuxGlobalRCH,setAuxGlobalRCH] = useState();

  //coberturas
  const [ToggleCheckBoxCBChantilly, setToggleCheckBoxCBChantilly ] = useState(false);
  const [ToggleCheckBoxCBgnl, setToggleCheckBoxCBgnl ] = useState(false);

  //papel de arroz
  const [ToggleCheckBoxRicePaper,setToggleCheckBoxRicePaper] = useState(false);

  //buscar e armazenar imagnes do banco de dados
  const [dataImage, setDataImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false)


  //dados
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Weight, setWeight] = useState('');
  const [Writte, setWritte] = useState('');
  const [Observ, setObserv] = useState('');
  const [SelectedDateEUAFormat, setSelectedDateEUAFormat] = useState('');
  const [SelectedDateBRAZILIANFormat, setSelectedDateBRAZILIANFormat] = useState('');
  const [TimeSelected, setTimeSelected] = useState('');
  const [ValorToBuy, setValorToBuy] = useState(0);
  const [Price,setPrice] = useState(0);
  const [aux,setaux] = useState();
  //const [SelectdDate, setSelectedDate] = useState('');


  //cores android
  const ColorCheckBoxViewedInAndroid = {true: 'white', false: 'black'};



  //cores ios
  const ColorCheckBoxViewedInIos = {__true: 'blue', __false: 'white'}



  //modal DateTimePicker
  const [ModalDatePicker, setModalDatePicker] = useState(false);
  const [ModalTimePicker, setModalTimePicker] = useState(false);
  
  //modal see my order
  const [ModalOrder, setModalOrder] = useState(false);

  //offset Price
  const offset = 1.13;
  const Correctoffset = 1.21;
  const [OffsetPrice, setOffsetPrice] = useState(offset);

  useEffect(()=>{
    
    getCakeImagesFromStorage();
    getPrice();
    
  },[acess]);

  async function getCakeImagesFromStorage(){
    setLoading(true);
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

  
  //setAcsses(false);

  //console.log(dataImage);

  async function getPrice() {

    await firestore().collection('bolo_aipim').onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        //doc.foto == null
        if(doc.id == 'preco'){
          let valor = doc.data();
          setPrice(valor.valor);
          setPrice(parseFloat(valor.valor).toFixed(2));
          console.log("price:    "+Price);
          //console.log("GlobalVars.ValorBoloAipim :  " + GlobalVars.ValorBoloAipim );
          //console.log(price);
        }
      });  
    }) 
  }

  async function handleSubmitOrder(){
    
    if(Name === '' || Weight < 2 || Phone === ''){
      Alert.alert("Ops...","Algumas informações não forma inseridas corretamente");
      return;
    }
      
    if(Observ == '' || Observ.length <=15){
      Alert.alert("Observação","Use o campo de observação para nos dizer como voce quer sua encomenda, como: cores, detalhales, masculino feminino...etc")
      return;
    }
    //console.log(OrderRCH.lenght())

    let mass = OrderMASS();

    if(mass == null ){
      Alert.alert("Massa","Indique uma massa");
      return;
    }

    let format = OrderFORMAT();

    if(format == null){
      Alert.alert("Formato","Indique um formato valido");
      return;
    }

    let cb = OrderCB();

    
    if(cb == null){
      Alert.alert("COBERTURA","Indique uma cobertura");
      return;
    }
    let OrderRCH = Array();
    OrderRCH = compareRCH();
    console.log("rchs:  -->  "+OrderRCH);
    //console.log(GlobalRCH + '\n\n');
    

    if(OrderRCH.length == 0 || OrderRCH.length > 3){
      if(OrderRCH.length === 0){
        Alert.alert("Recheios", "Você esqueceu os recheios");
        return;
      }
      Alert.alert("Recheios", "Você sô pode escolher 3 (três) recheios");
      return;
    }

    setLoadingRegister(true);
    //setLoading(true);
    try{
      //setLoading(true);
      await firestore().collection('users').add({
        tipo: 'Bolo Confeitado',
        nome: Name,
        telefone: Phone,
        data: SelectedDateBRAZILIANFormat,
        data_padrao_internacional: SelectedDateEUAFormat,
        hora: TimeSelected,
        peso: Weight,
        recheios: OrderRCH.join(' , '),
        massa: mass,
        cobertura: cb,
        formato: format,
        idOrder: user.uid,
        escrever: Writte,
        oberservacao: Observ,
        valor: (Price*parseFloat(Weight)*OffsetPrice).toFixed(2),
      })
      .then(()=>{
        Alert.alert("SUCESSO","pedido registrado");
        setLoadingRegister(false);
      })
      .catch(()=>{
        Alert.alert("ERRO", "um erro inesperado aconteceu");
        setLoadingRegister(false);
      })


    }catch(e){
      Alert.alert("Erro","um erro inesperado aconteceu :'(");
      setLoadingRegister(false);
    } 

  }

  function OrderCB(){
    let cb = 'chocolate';
    if(ToggleCheckBoxCBChantilly || ToggleCheckBoxCBgnl){
      if(ToggleCheckBoxCBChantilly && ToggleCheckBoxCBgnl){
        Alert.alert("Cobetura","Escolha uma cobertura apenas");
        return;
      }
      else if(ToggleCheckBoxCBChantilly){
        cb = 'chantilly';
        return cb;
      }
      else if(ToggleCheckBoxCBgnl){
        cb = 'chocolate granulado';
        return cb;
      }
    }
    return null;
  }

  function  OrderFORMAT(){
    let format = 'redondo';
    if(ToggleCheckBoxTypeCircle || ToggleCheckBoxTypeSquare){
      if(ToggleCheckBoxTypeCircle && ToggleCheckBoxTypeSquare){
        Alert.alert("Formato","Escolha um unico formato");
        return;
      }
      else if(ToggleCheckBoxTypeCircle){
        if(Weight < 6){
          format = 'redondo';
          return format;
        }
        else{
          Alert.alert("Peso","para o peso informado, o ideal é que seja quadrado!isso nos ajuda");
          setToggleCheckBoxTypeSquare(true);
          setToggleCheckBoxTypeCircle(false);
          
          format = 'quadrado';
          return format;
        }   
      }
      else if(ToggleCheckBoxTypeSquare){
        format = 'quadrado';
        return format;
      }
    }
    return null;
  }



  function OrderMASS(){
    let mass = 'branca';
    if(ToggleCheckBoxWhiteMass || ToggleCheckBoxChocolateMass){
      if(ToggleCheckBoxWhiteMass && ToggleCheckBoxChocolateMass){
        Alert.alert("Massa","Escolha uma massa apenas");
        return;
      }
      else if(ToggleCheckBoxWhiteMass){
        mass = 'branca';
        return mass;
      }
      else if(ToggleCheckBoxChocolateMass){
        mass = 'chocolate';
        return mass;
      }
    }
    return null;
  }

  function compareRCH(){

    let listRCH = Array();
    let count = 0;


    if(ToggleCheckBoxRCHChocolate){
      //setOffsetPrice(1.23);
      count ++;
      listRCH.push(
        'chocolate',
      )
      
    }


    if(ToggleCheckBoxRCHLimon){

      count ++;
      listRCH.push(
       'limao',
      )
      
    }


    if(ToggleCheckBoxRCHMilkWithCoco){
      count ++;
      listRCH.push(
        'leite condensado com coco',
      )

    }


    if(ToggleCheckBoxRCHPlum){
      //setOffsetPrice(1.23);
      count ++;
      listRCH.push(
        'ameixa',
      )
    }


    if(ToggleCheckBoxRCHStrawberry){
      count ++;
      listRCH.push(
        'morango',
      )

    }


    if(ToggleCheckBoxRCHSweetMilk){
      count ++;
      listRCH.push(
        'doce de leite',
      )

    }


    if(ToggleCheckBoxRCHGuava){
      count ++;
      listRCH.push(
        'goiabada',
      )

    }


    if(ToggleCheckBoxRCHPassionFruit){
      count ++;
      listRCH.push(
        'maracuja'
      )

    }

    return listRCH;
    

  }


  useLayoutEffect(()=>{
    async function headerConstruct(){
      await firestore().collection('bolo_aipim').onSnapshot(snapshot => {
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

  
  function setMouthInNumber(mouth){
    let mth = '';
   
    if(mouth === 'Jan'){
      mth = 1;
      return mth;
    }

    if(mouth === 'Feb'){
      mth = 2;
      return mth;
    }

    if(mouth === 'Mar'){
      mth = 3;
      return mth;
    }

    if(mouth === 'Apr'){
      mth = 4;
      return mth;
    }

    if(mouth === 'May'){
      mth = 5;
      return mth;
    }

    if(mouth === 'Jun'){
      mth = 6;
      return mth;
    }

    if(mouth === 'Jul'){
      mth = 7;
      return mth;
    }
    if(mouth === 'Aug'){
      mth = 8;
      return mth;
    }

    if(mouth === 'Sep'){
      mth = 9;
      return mth;
    }
    if(mouth === 'Oct'){
      mth = 10;
      return mth;
    }

    if(mouth === 'Nov'){
      mth = 11;
      return mth;
    } 

    if(mouth === 'Dec'){
      mth = 12;
      return mth;
    }

  }

  function showDateSelected(_data){

   
    //setSelectedDate(_data);
    let new_data = _data.toString().substr(4,11);
    
    //console.log("component: "+ new_data);

    let mouth = new_data.substr(0,3);
    let mth = setMouthInNumber(mouth);

    let day = new_data.substr(4,2);
    let year = new_data.substr(7,4);
    //console.log("mes: "+ mouth + ':  dia: ' + day + ': year: '+  year);
    let date_brazilian_format = `${day}/${mth}/${year}`;
    let date_eua_format = `${year}-${mth}-${day}`;
    setSelectedDateBRAZILIANFormat(date_brazilian_format);
    setSelectedDateEUAFormat(date_eua_format);
  }

  function showTimeSelected(__data){
    
    setTimeSelected(__data);
    console.log(TimeSelected);
    //alert('ok ok ok');
  }

  return (

   <SafeAreaView style={styles.container}>
     <KeyboardAvoidingView enabled behavior={Platform.OS === 'android' ? '' : 'padding'} onPress={()=>Keyboard.dismiss()}>

     <ScrollView>  
      <View>
        {
          ModalDatePicker && <DatePicker
          preesed={(value)=>setModalDatePicker(value)}
          selectedDateInPage={(_data)=>{showDateSelected(_data)}}
          />
        }
      </View>

      <View>
        {
          ModalTimePicker && <TimePicker
          preesed={(value)=>setModalTimePicker(value)}
          selectedTimeInPage={(__data)=>{showTimeSelected(__data)}}
          /> 
        }
      </View>


      




      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput autoCapitalize="none" autoCorrect={false} value={Name} placeholder="seu nome" placeholderTextColor="#111" style={styles.Text_Input}
           onChangeText={(text)=>{setName(text)}} multiline={false} numberOfLines={1} maxLength={45}/>
        </TouchableOpacity>
      </View>


      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput autoCapitalize="none" autoCorrect={false} value={Phone} keyboardType='number-pad' placeholder="telefone" placeholderTextColor="#111" style={styles.Text_Input}
          onChangeText={(text)=>{setPhone(text)}} multiline={false} numberOfLines={1} maxLength={12}/>
        </TouchableOpacity>
      </View>


      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput autoCapitalize="none" autoCorrect={false} value={Weight} keyboardType='number-pad' placeholder="peso" placeholderTextColor="#111" style={styles.Text_Input}
          onChangeText={(text)=>{setWeight(text)}} multiline={false} numberOfLines={1} maxLength={2}/>
        </TouchableOpacity>
      </View>

      <View style={styles.ViewContainerVariant}>
        {
          SelectedDateBRAZILIANFormat === '' ?
          <TouchableOpacity style={styles.VarianteView} onPress={()=>setModalDatePicker(true)}>
            <Feather name="calendar" size={25} color="#111" style={{marginRight: 8}}/><Text style={styles.ButtonText}>Data</Text>  
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.VarianteView} onPress={()=>setModalDatePicker(true)}>
            <Text style={styles.ButtonText}>Data: {SelectedDateBRAZILIANFormat}</Text>  
          </TouchableOpacity>
        }
        {
          TimeSelected === '' ?
          <TouchableOpacity style={styles.VarianteView} onPress={()=>setModalTimePicker(true)}>
            <Feather name="clock" size={25} color="#111" style={{marginRight: 8}}/><Text style={styles.ButtonText}>Hora</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.VarianteView} onPress={()=>setModalTimePicker(true)}>
            <Feather name="clock" size={25} color="#111" style={{marginRight: 8}}/><Text style={styles.ButtonText}>Hora: {TimeSelected}</Text>
          </TouchableOpacity>
        }

        
      </View>
      


      <View style={{justifyContent: 'flex-start', margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Massa:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Branca : </Text>
          {
            Platform.OS === 'android'  ? (
            <CheckBox disabled={false} value={ToggleCheckBoxWhiteMass}
              onValueChange={(value)=>{setToggleCheckBoxWhiteMass(value)}}
              tintColors={ColorCheckBoxViewedInAndroid} 
              
              />
            ) : (
              <CheckBox disabled={false} value={ToggleCheckBoxWhiteMass}
              onValueChange={(value)=>{setToggleCheckBoxWhiteMass(value)}}
              tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
              />
            )
          }
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Chocolate : </Text>
          {
            Platform.OS === 'android' ? (
            <CheckBox disabled={false} value={ToggleCheckBoxChocolateMass}
              onValueChange={(value)=>{setToggleCheckBoxChocolateMass(value)}}
              tintColors={ColorCheckBoxViewedInAndroid} 
              />
            ) : (
              <CheckBox disabled={false} value={ToggleCheckBoxChocolateMass}
              onValueChange={(value)=>{setToggleCheckBoxChocolateMass(value)}}
              tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
              />
            )
          }
        </View>    
      </View>




      <View style={{justifyContent: 'flex-start', margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Tipo:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Quadrado : </Text>
          {
            Platform.OS === 'android' ? (
            <CheckBox disabled={false} value={ToggleCheckBoxTypeSquare}
              onValueChange={(value)=>{ setToggleCheckBoxTypeSquare(value)}}
              tintColors={ColorCheckBoxViewedInAndroid}
              />
            ) : (
              <CheckBox disabled={false} value={ToggleCheckBoxTypeSquare}
              onValueChange={(value)=>{ setToggleCheckBoxTypeSquare(value)}}
              tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
              />
            )
          }
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Redondo : </Text>
          {
            Platform.OS === 'android' ? (
            <CheckBox disabled={false} value={ToggleCheckBoxTypeCircle}
              onValueChange={(value)=>{setToggleCheckBoxTypeCircle(value)}}
              tintColors={ColorCheckBoxViewedInAndroid}
              />
            ) : (
              <CheckBox disabled={false} value={ToggleCheckBoxTypeCircle}
              onValueChange={(value)=>{setToggleCheckBoxTypeCircle(value)}}
              tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
              />
            )
          }
        </View> 
      </View>

      <View style={{justifyContent: 'flex-start', margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Cobertura:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Chantilly : </Text>
          {
            Platform.OS === 'android' ? (
            <CheckBox disabled={false} value={ToggleCheckBoxCBChantilly}
              onValueChange={(value)=>{setToggleCheckBoxCBChantilly(value)}}
              tintColors={ColorCheckBoxViewedInAndroid}
              
              />
            ) : (
              <CheckBox disabled={false} value={ToggleCheckBoxCBChantilly}
              onValueChange={(value)=>{setToggleCheckBoxCBChantilly(value)}}
              tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
              
              />
            )
          }
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Chocolate Granulado : </Text>
          {
            Platform.OS === 'android' ? (
            <CheckBox disabled={false} value={ToggleCheckBoxCBgnl}
              onValueChange={(value)=>{setToggleCheckBoxCBgnl(value)}}
              tintColors={ColorCheckBoxViewedInAndroid}
              onChange={()=>{ ToggleCheckBoxCBgnl ? setOffsetPrice(offset): setOffsetPrice(Correctoffset) }}
              />
            ) : (
              <CheckBox disabled={false} value={ToggleCheckBoxCBgnl}
              onValueChange={(value)=>{ToggleCheckBoxCBgnl(value)}}
              tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
              onChange={()=>{ ToggleCheckBoxCBgnl ? setOffsetPrice(offset): setOffsetPrice(Correctoffset) }}
              />
            )
          }
        </View>    
      </View>

      <View style={{justifyContent: 'flex-start', margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Recheios: (MÁX 3)</Text>
        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>


          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Chocolate: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHChocolate}
                onValueChange={(value)=>{setToggleCheckBoxRCHChocolate(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                onChange={()=>{setOffsetPrice(1.2)}}
                onChange={()=>{ ToggleCheckBoxRCHChocolate ? setOffsetPrice(offset): setOffsetPrice(Correctoffset) }}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHChocolate}
                onValueChange={(value)=>{setToggleCheckBoxRCHChocolate(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
                onChange={()=>{ ToggleCheckBoxRCHChocolate ? setOffsetPrice(offset): setOffsetPrice(Correctoffset) }}
                />
              )
            }
          </View>


          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Limão: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHLimon}
                onValueChange={(value)=>{setToggleCheckBoxRCHLimon(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHLimon}
                onValueChange={(value)=>{setToggleCheckBoxRCHLimon(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
                />
              )
            }
          </View>
        
          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Ameixa: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHPlum}
                onValueChange={(value)=>{setToggleCheckBoxRCHPlum(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                onChange={()=>{ ToggleCheckBoxRCHPlum ? setOffsetPrice(offset): setOffsetPrice(Correctoffset) }}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHPlum}
                onValueChange={(value)=>{setToggleCheckBoxRCHPlum(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
                onChange={()=>{ ToggleCheckBoxRCHPlum ? setOffsetPrice(offset): setOffsetPrice(Correctoffset) }}
                />
              )
            }
          </View>
          

          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Morango: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHStrawberry}
                onValueChange={(value)=>{setToggleCheckBoxRCHStrawberry(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHStrawberry}
                onValueChange={(value)=>{setToggleCheckBoxRCHStrawberry(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
                />
              )
            }
          </View>
          
          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Goiabada: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHGuava}
                onValueChange={(value)=>{setToggleCheckBoxRCHGuava(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHGuava}
                onValueChange={(value)=>{setToggleCheckBoxRCHGuava(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true} 
                />
              )
            }
          </View>
          

          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Doce de Leite: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHSweetMilk}
                onValueChange={(value)=>{setToggleCheckBoxRCHSweetMilk(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHSweetMilk}
                onValueChange={(value)=>{setToggleCheckBoxRCHSweetMilk(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
                />
              )
            }
          </View>
          

          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Maracujá: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHPassionFruit}
                onValueChange={(value)=>{setToggleCheckBoxRCHPassionFruit(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHPassionFruit}
                onValueChange={(value)=>{setToggleCheckBoxRCHPassionFruit(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
                />
              )
            }
          </View>

          <View style={styles.ViewRCHContainer}>
            <Text style={styles.ViewRCHContainerText}>Leite condensado com coco: </Text>
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRCHMilkWithCoco}
                onValueChange={(value)=>{setToggleCheckBoxRCHMilkWithCoco(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRCHMilkWithCoco}
                onValueChange={(value)=>{setToggleCheckBoxRCHMilkWithCoco(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
                />
              )
            }
          </View>
          
        </View>
      </View>

      {/**list item papel_arroz */}
      <View style={{justifyContent: 'flex-start',flexDirection: 'column',  margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
        <View style={{justifyContent: 'flex-start',flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', }}>Papel de Arroz:</Text>
          <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
            
            {
              Platform.OS === 'android' ? (
              <CheckBox disabled={false} value={ToggleCheckBoxRicePaper}
                onValueChange={(value)=>{setToggleCheckBoxRicePaper(value)}}
                tintColors={ColorCheckBoxViewedInAndroid}
                />
              ) : (
                <CheckBox disabled={false} value={ToggleCheckBoxRicePaper}
                onValueChange={(value)=>{setToggleCheckBoxRicePaper(value)}}
                tintColor={ColorCheckBoxViewedInIos.__false} onCheckColor={ColorCheckBoxViewedInIos.__true}
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
          <TextInput  autoCapitalize="none" autoCorrect={false} value={Writte} placeholder="escrever" placeholderTextColor="#111" style={styles.Text_Input}
           onChangeText={(text)=>{setWritte(text)}} multiline={false} maxLength={45}/>
        </TouchableOpacity>
      </View>
      
     
      <View style={styles.ViewContainer}>
        <TouchableOpacity style={styles.input}>
          <TextInput autoCapitalize="none" autoCorrect={false} value={Observ} placeholder="observação" placeholderTextColor="#111" style={styles.Text_Input}
           onChangeText={(text)=>{setObserv(text)}} multiline={true} maxLength={255}/>
        </TouchableOpacity>
      </View>


      {
        Weight === '' ? (
          <View style={{justifyContent: 'space-between', alignItems: 'center', margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Valor aproximado a pagar: 0</Text>
          </View>
        ) : (
          <View style={{justifyContent: 'space-between', alignItems: 'center', margin: 11, backgroundColor: '#f61f07', borderRadius: 17, padding: 15}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Valor aproximado a pagar: {(Price*parseFloat(Weight)*OffsetPrice).toFixed(2)}</Text>
          </View>
        )
      }


      <View style={{justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1.5,
      margin: 15, padding: 5}}>
        <Text style={{color: '#111', fontWeight: '500', fontSize: 15}}>*NOTA : o valor total a pagar,
        é uma estimativa do quanto você pagara no ato de recebimento da sua encomenda!</Text>
      </View>


      <View style={styles.ViewContainerButtonFinish}>
        {
          loadingRegister ? <ActivityIndicator style={{padding: 7}} color="#fff" size={35}/> : (
            <TouchableOpacity style={styles.ButtonFinish} onPress={()=>{handleSubmitOrder()}}>
              <Text style={{margin: 12, color: '#fff', fontWeight: 'bold', fontSize: 22}}>Finalizar Pedido</Text>
            </TouchableOpacity> 
          )
        }
      </View>
       
     </ScrollView>
     </KeyboardAvoidingView>
   </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container:{
    backgroundColor: '#ff8305' , flex: 1, width: '100%', height:  '100%',
  },
  input:{
    backgroundColor: '#f61f07', borderRadius: 9, alignItems: 'center'
  },
  Text_Input:{
    fontSize: 21, textAlign: 'center', justifyContent: 'center', alignItems: 'center'
  },
  ViewContainer:{
    margin: 8, justifyContent: 'center', 
  },
  ViewContainerVariant:{
    margin: 1, flexDirection: 'row', justifyContent: 'center', 
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