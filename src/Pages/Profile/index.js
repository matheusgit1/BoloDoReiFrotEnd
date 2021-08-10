import React, {useState, useContext} from 'react';
import {AuthContext} from '../../Contexts/Auth';
import {View, Text, Button, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
export default function Profile(){
    const {singOut, user}= useContext(AuthContext);
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{justifyContent:'center', alignItems: 'center', backgroundColor: '#fff',}}>
                <Text style={{fontWeight: 'bold', fontSize: 23}}>Olá {user.nome}</Text>
            </View>

            <View style={{paddingTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.ButtonTouchable}>
                    <Text style={styles.TextButton}>Pedidos abertos</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.ButtonTouchable}>
                    <Text style={styles.TextButton}>Historico</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonTouchable}>
                    <Text style={styles.TextButton}>Total gasto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonTouchable}>
                    <Text style={styles.TextButton}>Editar minhas informações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.ButtonTouchableLogout} onPress={()=>{singOut()}}>
                    <Text style={styles.TextButtonLogout}>Sair</Text>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white', flex: 1, backgroundColor: 'red', 
    },
    ButtonTouchable:{
        width: '85%', paddingVertical: 5, borderRadius: 8, 
        alignItems: 'center', justifyContent:'center', backgroundColor: '#ff8305', marginBottom: 15
    },
    TextButton:{
        fontSize: 23, fontWeight: 'bold'
    },
    ButtonTouchableLogout:{
        width: '85%', paddingVertical: 5, borderRadius: 8, 
        alignItems: 'center', justifyContent:'center', backgroundColor: 'blue', marginBottom: 15,
    },
    TextButtonLogout:{
        fontSize: 23, fontWeight: 'bold', color: '#fff'
    },
});