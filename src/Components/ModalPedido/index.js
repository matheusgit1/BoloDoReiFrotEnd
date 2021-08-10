import React, {useState} from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function ModalPedido({ stateModal, name = 'asdasdf', phone= '', date='', hour='', fillings = [{RCH: 'azul'},{RCH: 'amarelo'}], writte='', observation ='', weight=''}) {
    const [rchs,setRchs] = useState([]);
    function set_rchs(){
        fillings.forEach(element => {
            console.log("element");
            console.log(element);
            //setRchs(...element);
        });
        //console.log('rchs');
        //console.log(rchs)
    }
    return (
        <View style={styles.container}>
            {
                set_rchs()
            }
            <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={()=>{}}>
                <Feather name="x-circle" color="#111" size={25}/>
            </TouchableOpacity>
            <Text style={styles.TextGeneric}>Nome: {name}</Text>
            <Text style={styles.TextGeneric}>Telefone: {phone}</Text>
            <Text style={styles.TextGeneric}>Data: {date}</Text>
            <Text style={styles.TextGeneric}>Peso: {weight}</Text>
            <Text style={styles.TextGeneric}>Hora: {hour}</Text>
                
            
            <Text style={styles.TextGeneric}>Escrever: {writte}</Text>
            <Text style={styles.TextGeneric}>Observação: {observation}</Text>

            <TouchableOpacity activeOpacity={.6} style={styles.ButtonModal} onPress={()=>stateModal(false)}>
                <Text style={styles.TextButtonModal}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop: '35%',
        padding: 5,
        justifyContent:'center',
        //alignItems: "center",
        marginHorizontal: '11%',
        marginVertical: '17%',
        backgroundColor: "white",
        borderRadius: 15
    },
    ButtonModal:{
        justifyContent: 'center',alignItems: 'center', backgroundColor: 'blue', borderRadius: 9,
        marginTop: 25, 
    },
    TextButtonModal:{
        color: '#fff', fontSize: 25
    },
    TextGeneric:{
        fontSize: 19, fontWeight: 'bold',
    }
});