import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, Dimensions  } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth')
import { Input } from 'AwesomeProject/components/Input';
import {Button} from 'AwesomeProject/components/Button';

const logo = require('AwesomeProject/assets/logo-tconbelt.png')


export default class LoginScreen extends React.Component {
  state = {
    email:'',
    password:'',
    authenticating:false,
    user: null,
    error: '',
  }
  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyCiN9p45gA0IwozM7lKSEKbSuILUNYmm-o",
      authDomain: "tconbelt.firebaseapp.com",
    }
    firebase.initializeApp(firebaseConfig)
  }
  onPressSignIn (){
    this.setState( 
      {authenticating:true,})
      const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }),() => this.props.navigation.navigate('Home'))
      .catch(() => this.setState({
        // Login was not successful
        authenticating: false,
        user: null,
        error: 'Authentication Failure',
      }))
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
                <Button onPress={()=>this.onPressSignIn()}>Iniciar sesión</Button>
                <Text>{this.state.error}</Text>
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