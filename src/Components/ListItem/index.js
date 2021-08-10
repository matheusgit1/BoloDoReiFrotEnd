import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function ListItem({data}) {
    function handlePress(){
        //alert('presserd');
    }
    return (
    <TouchableOpacity style={styles.ListView} onPress={()=>{handlePress()}}>
        {
            data?.foto != null ? <Image style={{borderRadius: 15, width: 125, height: 125}} source={{uri: data?.foto}}/> : <View style={{margin: -10, borderWidth: 1, borderColor: '#111'}}/>
        }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    ListView:{
        flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'red', borderRadius: 10,
    }
});