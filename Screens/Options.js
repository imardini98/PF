import React from 'react'
import {View, Text,AsyncStorage, Linking, Dimensions, Image} from 'react-native'
import firebase from '@firebase/app';
require('firebase/auth')
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
const logo = require('../assets/logo-tconbelt.png')
const {width,height} = Dimensions.get('window')
export default class OptionsScreen extends React.Component {
  static navigationOptions =({navigation})=> {
    return {
      title: 'OPCIONES',
      headerStyle : {
        backgroundColor:'#083b66',
        color: 'white'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff'
      },
    } 
  };
   async onPressLogOut(){
        firebase.auth().signOut()
          .then(async () => {
            await AsyncStorage.removeItem('Auth')
            this.setState({
              email: '',
              password: '',
              authenticating: false,
              user: null,
            })
            this.props.navigation.navigate('Login')
          }, error => {
            console.error('Error al cerrar sesión', error);
          });
      }
      aboutUs (){
        const url = 'http://tconbelt.firebaseapp.com'
        Linking.canOpenURL(url)
        .then(response => {
        if (!response) {
           Alert.alert('Url no válido');
        } 
        else {
          return Linking.openURL(url);
        }
      })
    .catch(err => console.log(err));
      }
    render(){
        return(
            <View>
                <View
                style={{marginBottom:height*0.3, justifyContent:'center',alignItems:'center'}}
                >
                <Image 
                    source={logo}
                    style={{resizeMode:'stretch' ,width: width*0.5, height: height*0.3 }}
                    />
                </View>
                <Button
                  onPress={()=> this.onPressLogOut()}
                  buttonStyle={{backgroundColor:'#33cccc'}}
                  title='Cerrar Sesión'
                  leftIcon={{ type: 'font-awesome', name: 'sign-out', color:'white' }}
                />
                <Button 
                  onPress={() => this.aboutUs()}
                  buttonStyle={{backgroundColor:'#33cccc',marginTop:height*0.02}}
                  title={"¡Conócenos!"}
                  leftIcon={{ type: 'font-awesome', name: 'users', color:'white' }}
                />
            </View>
        )
    }
}