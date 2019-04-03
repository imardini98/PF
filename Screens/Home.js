import React from 'react'
import {Text,View,StyleSheet,Image} from 'react-native'
import firebase from '@firebase/app';
require('firebase/database')
import { Slider , Header} from 'react-native-elements';
const logo = require('AwesomeProject/assets/logo-tconbelt.png')
export default class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={value:0}
    }
    onSlidingComplete (value){
        switch(value){
            case 0:
            this.update = {
                DIN1:0,
                DIN2:0,
                DIN3:0,
            }
            break;
            case 9:
            this.update = {
                DIN1:1,
                DIN2:0,
                DIN3:0,
            }
            break;
            case 18:
            this.update = {
                DIN1:0,
                DIN2:1,
                DIN3:0,
            }
            break;
            case 27:
            this.update = {
                DIN1:1,
                DIN2:1,
                DIN3:0,
            }
            break;
            case 36:
            this.update = {
                DIN1:0,
                DIN2:0,
                DIN3:1,
            }
            break;
            case 45:
            this.update = {
                DIN1:1,
                DIN2:0,
                DIN3:1,
            }
            break;
            case 54:
            this.update = {
                DIN1:0,
                DIN2:1,
                DIN3:1,
            }
            break;
            case 60:
            this.update = {
                DIN1:1,
                DIN2:1,
                DIN3:1,
            }
            break;
        }
        firebase.database().ref('commands').update(this.update)
    }
    render(){
        return (
            
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', height:500 }}>
            <View style={{alignItems:'center'}}>
                <Image source={logo} style={styles.logo}/>
            </View>
            <Slider
              value={this.state.value}
              step={9}
              maximumValue={60}
              orientation='horizontal'
              onValueChange={value => this.setState({ value })}
              onSlidingComplete={value =>this.onSlidingComplete(value)}
            />
            <Text>Frequency: {this.state.value} Hz</Text>
          </View>

        )
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