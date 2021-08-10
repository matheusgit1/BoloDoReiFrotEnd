import React from 'react';
import { View, Text } from 'react-native';

export default function AllRights() {
 return (
   <View style={{justifyContent: 'center', alignItems:'center', alignContent: 'center', marginBottom: 11}}>
       <Text>Todos os direitos reservados a <Text style={{fontWeight: 'bold'}}>Bolo do Rei</Text></Text>
   </View>
  );
}