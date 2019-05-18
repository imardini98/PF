import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Image, Dimensions, Alert, AsyncStorage,Linking } from 'react-native';
import firebase from '@firebase/app';
require('firebase/auth')
import { NavigationActions } from 'react-navigation';
import {CheckBox,Input,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'

const logo = require('AwesomeProject/assets/logo-tconbelt.png')

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            authenticating:false,
            user: null,
            error: '',
            checked:false,
            pressed:false
          }
    }
  onPressSignIn (){
    console.log('running')
    this.setState( 
      {authenticating:true})
      const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( async user => {
        await AsyncStorage.setItem('Auth',JSON.stringify(user))
        this.setState({
        authenticating: false,
        user,
        error: 'logueo' });

        this.props.navigation.dispatch(
          NavigationActions.navigate({ routeName: "AppNavigator" })
         );
      })
      .catch((error) => {
        console.log('cratch')
        this.setState({pressed:false})
        this.setState({
        // Login was not successful
        authenticating: false,
        user: null,
        error: error,
      });Alert.alert(''+error)})
  }
  onPress (){
    this.setState({pressed:true})
    this.onPressSignIn()
    console.log(this.state)
      if(!this.state.user && this.state.email == '' && this.state.password == ''){
        Alert.alert('Ingrese las credenciales')
      }
}
youNeddHelp (){
  Alert.alert('Comuniquese a:' ,'3012507547',
    [
      {
      text:'Llamar', 
      onPress: ()=>{this.makePhoneCall()}
      },
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
    ])
}
async RememberMe () {
 await this.setState({checked:!this.state.checked})
 await AsyncStorage.setItem('remember_me',JSON.stringify(this.state.checked)) 
 if(this.state.checked){
  await AsyncStorage.setItem('user',this.state.email)
  await AsyncStorage.setItem('password',this.state.password)
  }
  else{
  await AsyncStorage.getItem('user') !== '' ? await AsyncStorage.removeItem('user'):''
  await AsyncStorage.getItem('password') !== '' ? await AsyncStorage.removeItem('password'):''
  }
  console.log(await AsyncStorage.getItem('user'))
  console.log(await AsyncStorage.getItem('password'))
}
makePhoneCall (){
  const phone = 3012507547
  phoneNumber = `telprompt:${phone}`;
  phoneNumber = `tel:${phone}`;
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
  if (!supported) {
    Alert.alert('Phone number is not available');
  } 
  else {
    return Linking.openURL(phoneNumber);
  }
  })
  .catch(err => console.log(err));
}
  async componentWillMount(){
    let remember_me = (await AsyncStorage.getItem('remember_me', (value) =>{
      return JSON.parse(value)
    }))
     let usuario = await AsyncStorage.getItem('user')
     let clave = await AsyncStorage.getItem('password')
     await this.setState({checked: remember_me === 'true' ? true:false}) 
     await this.setState({email:usuario})
     await this.setState({password:clave})
  }
  render() {
    return (
            <View style={styles.form}>
              <View style={{alignItems:'center', justifyContent:'center'}}>
                <Image source={logo} style={styles.logo}/>
              </View>
              <Input
                  inputStyle={{fontSize:17,
                  marginTop:20}}
                  placeholder = '   Ingresa tu email...'
                  leftIcon={<Icon
                  name='user'
                  size={24}
                  color='#33cccc'
                  />}
                  onChangeText = {email => this.setState({email})}
                  value = {this.state.email}
                />
                <Input
                  inputStyle={{fontSize:17,
                  marginTop:12}}
                  placeholder = '   Ingresa tu contraseña...'
                  leftIcon={{ type: 'font-awesome', name: 'lock', color:'#33cccc' }}
                  onChangeText = {password => this.setState({password})}
                  value = {this.state.password}
                  secureTextEntry = {true}
                />
                <View style={{flex:0,flexDirection:'row'}}>
                  <CheckBox
                    title='Recordarme'
                    containerStyle={{backgroundColor:'white',borderColor:'white'}}
                    onPress={() => {this.RememberMe()}}
                    checked={this.state.checked}
                    checkedColor={'#33cccc'}
                    textStyle={{color:'black'}}
                    containerStyle={{flex:1}}
                  />
                  <View style={{justifyContent:'center'}}>
                    <Text  
                      style={{color:'#33cccc'}}
                      onPress={()=> this.youNeddHelp()}
                    >¿Necesitas ayuda?</Text>
                  </View>
                </View>
              <Button 
              title={'Iniciar Sesión'}
              buttonStyle={{backgroundColor:'#33cccc',marginTop:20,height:50}}
              loading={this.state.pressed}
              onPress={() => this.onPress()}
              />
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