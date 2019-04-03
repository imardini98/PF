import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, Dimensions,Alert  } from 'react-native';
import  LoginScreen  from './Screens/Login';
import  HomeScreen  from './Screens/Home';
import firebase from '@firebase/app';
require('firebase/auth')
require('firebase/database')
import {createStackNavigator, createAppContainer} from 'react-navigation'

export default class App extends React.Component {
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyCiN9p45gA0IwozM7lKSEKbSuILUNYmm-o",
      authDomain: "tconbelt.firebaseapp.com",
      databaseURL: "https://tconbelt.firebaseio.com",
      projectId: "tconbelt",
      storageBucket: "tconbelt.appspot.com",
      messagingSenderId: "99500468615"
    }
    firebase.initializeApp(firebaseConfig)
  
  }
  render() {
    return (
      <View style = {styles.container}>
      <AppContainer/>
      </View>
    );
  }
}
const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen,
  
});

const AppContainer = createAppContainer(AppNavigator);
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex:1,
    padding:20,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'

  },
  form:{
    flex:1
  },
  logo: {
    width: 200,
    height:200
  }
});