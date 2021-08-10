import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Pages/Login';
import SingIn from '../Pages/SingIn';
import ForgotPassword from '../Pages/ForgotPassword';

export default function AuthRoutes(){
    const Stack = createStackNavigator();
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>

            <Stack.Screen options={{headerShown: true,headerTintColor: 'black', headerStyle:{
                backgroundColor: 'red',
            }}} name="Crie uma conta" component={SingIn}/>

            <Stack.Screen options={{headerShown: true, headerTintColor: 'black', headerStyle:{
                backgroundColor: 'red',
            }}} name="Recuperar senha" component={ForgotPassword}/>
            
        </Stack.Navigator>
    );
}
