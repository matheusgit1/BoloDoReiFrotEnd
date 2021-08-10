import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';




export default function Buttons({promo, screenNavigation}) {
    const navigation = useNavigation();
    return (
        promo  ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity activeOpacity={.3} style={styles.ButtonAdd} onPress={()=>{navigation.navigate(`${screenNavigation}`)}}>
                <Text style={styles.TextButtonAdd}>Pedir</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.95} style={styles.ButtonPromotion}>
                <Text style={styles.TextButtonAdd}>Promoção</Text>
            </TouchableOpacity>
        </View> ) : (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
            <TouchableOpacity activeOpacity={.3} style={styles.ButtonAdd} onPress={()=>{navigation.navigate(`${screenNavigation}`)}}>
                <Text style={styles.TextButtonAdd}>Pedir</Text>
            </TouchableOpacity>
            
        </View>)
    );
}

const styles= StyleSheet.create({
    ButtonAdd:{
        width: 155, backgroundColor: 'blue', marginHorizontal: 5,
        paddingVertical:3, justifyContent: 'center', alignItems: 'center', borderRadius: 7
    },
    TextButtonAdd:{
        fontWeight: 'bold', color: '#fff', fontSize: 15
    },
    ButtonPromotion:{
        width: 155, backgroundColor: 'red', marginHorizontal: 5,
        paddingVertical:3, justifyContent: 'center', alignItems: 'center', borderRadius: 7
    },
    TextButtonAdd:{
        fontWeight: 'bold', color: '#fff', fontSize: 15
    }
});