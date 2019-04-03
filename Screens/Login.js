import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, Alert } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth')
import { Input } from 'AwesomeProject/components/Input';
import {Button} from 'AwesomeProject/components/Button';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const logo = require('AwesomeProject/assets/logo-tconbelt.png')

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'imardinig@gmail.com',
            password:'ivandavid98',
            authenticating:false,
            user: null,
            error: '',
          }
    }
  onPressSignIn (){
      console.log('running')
    this.setState( 
      {authenticating:true})
      const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {this.setState({
        authenticating: false,
        user,
        error: '',
      }); this.props.navigation.navigate('Home')})
      .catch(() => {this.setState({
        // Login was not successful
        authenticating: false,
        user: null,
        error: 'Authentication Failure',
      });Alert.alert('Las credenciales no coinciden')})
  }
  onPress (){
      this.onPressSignIn()
      if(!this.state.user && this.state.email == '' && this.state.password == ''){
        Alert.alert('Ingrese las credenciales')
      }
}
  onPressLogOut(){
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }
  render() {
    return (
            <View style={styles.form}>
                <View style={{alignItems:'center', justifyContent:'center'}}>
                <Image source={logo} style={styles.logo}/>
                </View>
            
                <Input
                placeholder = 'Ingresa tu email...'
                label = 'Email'
                onChangeText = {email => this.setState({email})}
                value = {this.state.email}
                />
                <Input
                placeholder = 'Ingresa tu contraseña...'
                label = 'Contraseña'
                onChangeText = {password => this.setState({password})}
                value = {this.state.password}
                secureTextEntry = {true}
                />
                <Button onPress={()=>this.onPress()}>Iniciar sesión</Button>
            </View>
        
    );
  }
}



const styles = StyleSheet.create({
  form:{
    flex:1
  },
  logo: {
    width: 200,
    height:200
  }
});