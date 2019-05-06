import React from 'react'
import {View, Text,AsyncStorage} from 'react-native'
import firebase from '@firebase/app';
require('firebase/auth')
import {Button} from 'react-native-elements'


export default class OptionsScreen extends React.Component {
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
            console.error('Sign Out Error', error);
          });
      }
    render(){
        return(
            <View>
                <Button
                onPress={()=>this.onPressLogOut()}
                buttonStyle={{backgroundColor:'#33cccc'}}
                title='Cerrar Sesión'
                />
            </View>
        )
    }
}