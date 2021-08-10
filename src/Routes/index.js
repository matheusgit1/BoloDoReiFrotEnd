import React, {useContext} from 'react';
import { View,Text, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AuthRoutes from './Auth.routes';
import AppRoutes from './App.routes';
import {AuthContext} from '../Contexts/Auth';



export default function Routes() {
    const {loading, signed} = useContext(AuthContext);
    //const loading = false;

    if(loading){
        return(
            <LinearGradient style={{flex: 1, height: '100%', width: '100%'}} colors={['rgb(255,199,0)','#ff8d00', 'rgb(255,0,0)']}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={71} color="#fff"/>
                    <Text style={{fontSize: 25, color: '#fff', marginTop: 35}}>BEM VINDO!</Text>
                </View>
            </LinearGradient>
            
        );
    }

    return (
        signed ? <AppRoutes/> : <AuthRoutes/>
    );
}
