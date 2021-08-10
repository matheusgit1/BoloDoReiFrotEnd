import React, {useState, useContext} from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image,
  Alert,  ActivityIndicator } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Contexts/Auth';

export default function Login() {


  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const {singIn, loadingAuth} = useContext(AuthContext);
  //const [loading,setLoading] = useState(false);


  async function handleLogin(){
    if(email === '' || password === ''){
      Alert.alert("Opss...","Alguma informação invalida");
      return;
    }
    //setLoading(true);
    singIn(email,password);
    //setLoading(false);
  }
  
  return (
  
   <SafeAreaView style={styles.Container}>
     <LinearGradient style={{flex: 1, height: '100%', width: '100%'}} colors={['rgb(255,199,0)','#ff8d00', 'rgb(255,0,0)']}>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require("../../assets/random.png")} style={{ width: 250, height: 250, padding: 5}} /> 
        </View>


        <View style={styles.Text_view}>
          <Text style={styles.Text_Style}>Email</Text>
        </View>
        <View style={styles.General_viewer}>
          <TextInput value={email} style={styles.Input_Name} textContentType='emailAddress' placeholder="email"
          onChangeText={(text)=>{setEmail(text)}}/>
        </View>


        <View style={styles.Text_view}>
          <Text style={styles.Text_Style}>Senha</Text>
        </View>
        <View style={styles.General_viewer}>
          <TextInput value={password} secureTextEntry={true} textContentType='password' style={styles.Input_Name} placeholder="senha"
          onChangeText={(text)=>{setPassowrd(text)}}/>
        </View>    

        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={()=>{handleLogin()}}>
          <View style={styles.General_viewer,{marginBottom: 0, backgroundColor: '#fff',
           width: '91%', justifyContent: 'center', alignItems: 'center', paddingVertical: 8, borderRadius: 8}}>
            {
              
              loadingAuth ? (<ActivityIndicator size={30} color="#ff8d00"/>)
               : (<Text style={{fontSize: 18}}>Entrar</Text> )
            }
            
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button_navigation} onPress={()=>{navigation.navigate('Crie uma conta')}}>
          <Text style={styles.Text_navigation}>Novo aqui? crie uma conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button_navigation} onPress={()=>{navigation.navigate('Recuperar senha')}}>
          <Text style={styles.Text_navigation}>Recuperar senha</Text>
        </TouchableOpacity>

     </LinearGradient>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  Input_Name:{
    backgroundColor: '#fff', width: '90%', height: 40, borderRadius: 7, padding: 5, fontSize: 20,
  },
  General_viewer:{
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
  },
  Text_view:{
    marginLeft: 20,
  },
  Text_Style:{
    fontSize: 18, marginBottom: 5,
  },
  General_viewer_Botton:{
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 8,
    width: '90%', borderRadius: 7,
  },
  Button_navigation:{
    justifyContent: 'center', alignItems: 'center', marginTop: 15,
  },
  Text_navigation:{
    color: '#fff', fontSize: 13
  }
})