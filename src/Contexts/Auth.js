import React,{useState, createContext, useEffect} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
export const AuthContext = createContext({});

function AuthProvider({children}) {


    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);
    //const [UID,setUID] = useState(''); ->usar caso necessario

    useEffect(()=>{
        async function loadStorage(){
            const storageuser = await AsyncStorage.getItem('devApp');
            if(storageUser){
                setUser(JSON.parse(storageuser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    },[]);

    async function singUp(email,password,name){
        setLoadingAuth(true);
        await auth().createUserWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            setUID(uid);
            await firestore().collection('acounts').doc(uid).set({
                nome: name,
            })
            .then(()=>{
                let data = {uid: uid, nome: name, email: value.user.email};
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })
            .catch(()=>{
                Alert.alert("ops...","Algo não saiu com esperado");
                setLoadingAuth(false);
            });
        })
        .catch((erro)=>{
            Alert.alert("ops...","Algo não saiu com esperado");
            setLoadingAuth(false);
        });
    }

    async function singIn(email,password){
        setLoadingAuth(true);
        await auth().signInWithEmailAndPassword(email,password)
        .then(async (value)=>{
            let uid = value.user.uid;
            //buscar nome do usuario logado
            const uidProfile = await firestore().collection('acounts').doc(uid).get();
            //console.log(uidProfile.data().nome);
            //setUser(true);
            let data = {uid: uid, nome: uidProfile.data().nome, email: value.user.email};
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);

        })
        .catch((erro)=>{
            Alert.alert("ops...","Algo não saiu com esperado");
            setLoadingAuth(false); 
            //console.log(erro)
        });
    }

    async function ForgotPassword(email){
        setLoadingAuth(true); 
        await auth().sendPasswordResetEmail(email)
        .then(()=>{
            Alert.alert("Sucesso","Um link para redefinição de senha foi enviado para seu email");
            setLoadingAuth(false); 
        })
        .catch(()=>{
            Alert.alert("ops...","Algo não saiu com esperado");
            setLoadingAuth(false); 
        })
    }

    async function singOut(){
        await auth().signOut();
        await AsyncStorage.clear()
        .then(()=>{
            setUser(null);
        })      
    }

    async function storageUser(data){
        await AsyncStorage.setItem('devApp',JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user,ForgotPassword, singIn, singUp, singOut, loadingAuth, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;