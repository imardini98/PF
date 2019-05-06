import React from 'react'
import {View,StyleSheet,Image,Dimensions} from 'react-native'
import firebase from '@firebase/app';
require('firebase/database')
import { Slider ,Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
const logo = require('AwesomeProject/assets/logo-tconbelt.png')
import { NavigationActions } from 'react-navigation';
let value_slider;
const {width,height} = Dimensions.get('window')
export default class HomeScreen extends React.Component {
    static navigationOptions =({navigation})=> {
        return {
          title: 'CONTROL',
          headerStyle : {
            backgroundColor:'#083b66',
            color: 'white'
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
          },
          headerRight: (
            <Icon
              onPress={
                ()=> navigation.dispatch(
                    NavigationActions.navigate({routeName:'Login'})
                   )
              }
              name="sign-out"
              color="#fff"
              size={30}
            />
          )
        } 
      };
    componentDidMount = () => {
        const that =this
            firebase.database().ref('commands').on('value', function(snapshot) {
               that.setState({update :snapshot.val()})
               value_slider =that.state.update.DIN3.toString()+that.state.update.DIN2.toString()+that.state.update.DIN1.toString()
               console.log(value_slider)
               switch(value_slider){
                   case "000":
                   that.setState({value:0})
                   break;
                   case "001":
                   that.setState({value:9})
                   break;
                   case "010":
                   that.setState({value:18})
                   break;
                   case "011":
                   that.setState({value:27})
                   break;
                   case "100":
                   that.setState({value:36})
                   break;
                   case "101":
                   that.setState({value:45})
                   break;
                   case "110":
                   that.setState({value:54})
                   break;
                   case "111":
                   that.setState({value:60})
                   break;
               }
               
              });
    }
    componentWillUnmount (){
        firebase.database().ref('commands').update({
            DIN1:0,
            DIN2:0,
            DIN3:0,
        })
    }
    
    constructor(props){
        super(props)
        this.state={value:0, update:{
            DIN1:0,
            DIN2:0,
            DIN3:0,
        }}
    }
    onSlidingComplete = async (value)=>{
        switch(value){
            case 0:
            await this.setState({update : {
                DIN1:0,
                DIN2:0,
                DIN3:0,
            }})
            break;
            case 9:
            await this.setState({update : {
                DIN1:1,
                DIN2:0,
                DIN3:0,
            }})
            break;
            case 18:
            await this.setState({update : {
                DIN1:0,
                DIN2:1,
                DIN3:0,
            }})
            break;
            case 27:
            await this.setState({update : {
                DIN1:1,
                DIN2:1,
                DIN3:0,
            }})
            break;
            case 36:
            await this.setState({update : {
                DIN1:0,
                DIN2:0,
                DIN3:1,
            }})
            break;
            case 45:
            await this.setState({update : {
                DIN1:1,
                DIN2:0,
                DIN3:1,
            }})
            break;
            case 54:
            await this.setState({update : {
                DIN1:0,
                DIN2:1,
                DIN3:1,
            }})
            break;
            case 60:
            await this.setState({update : {
                DIN1:1,
                DIN2:1,
                DIN3:1,
            }})
            break;
        }
        await firebase.database().ref('commands').update(this.state.update)
    }
    render(){
        return (
            
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', height:500 }}>
              <Text style={{justifyContent:'center',alignItems:'center'}} h3>Belt Conveyor's RPM</Text>
              <Slider
                style={{marginLeft:width*0.4 ,height:height*0.7 }}
                value={this.state.value}
                step={9}
                invert orientation={'vertical'}
                trackStyle={{width:20,borderWidth:2,borderRadius:2}}
                maximumValue={60}
                thumbImage={logo}
                animationType={'spring'}
                animateTransitions={true}
                onValueChange={value => this.setState({ value })}
                onSlidingComplete={value =>this.onSlidingComplete(value)}
                thumbStyle={{backgroundColor: '#33cccc',borderWidth: 2,width:60,height:60,borderRadius:60}} 
                thumbTouchSize={{width: 100, height: 100}} 
                minimumTrackTintColor={'#2eb8b8'} 
                maximumTrackTintColor={'#0f3d3d'}
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