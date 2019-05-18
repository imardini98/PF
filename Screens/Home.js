import React from 'react'
import {View,StyleSheet,Image,Dimensions, Alert} from 'react-native'
import firebase from '@firebase/app';
require('firebase/database')
import { Slider ,Text,Button} from 'react-native-elements';
import Tools from '../utils/tools'
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
        } 
      };
    componentDidMount = () => {
      Alert.alert('¡Bienvenido!','-Controla velocidad de la banda transportadora deslizando el slider. \n-Oprime el botón para detener o dejar avanzar el proceso de producción.')
        const that = this
            firebase.database().ref('commands').on('value', function(snapshot) {
               that.setState({update :snapshot.val()})
               value_slider =that.state.update.DIN3.toString()+that.state.update.DIN2.toString()+that.state.update.DIN1.toString()
               console.log(value_slider)
               value = Tools.convertToHertz(value_slider)
               that.setState({value: value})
            });
            firebase.database().ref('PISTON').on('value', function(snapshot){
              let data = snapshot.val()
              that.setState({pressedPiston:data})
            })
              firebase.database().ref('data').limitToLast(1).on('value',async function(snapshot){
              let data = Object.values(await snapshot.val())
              
              await that.setState({c1 : data[0].C1})
              await that.setState({c2 : data[0].C2})
              await that.setState({c3 : data[0].C3})
              await that.setState({vab : data[0].VAB})
              await that.setState({vbc : data[0].VBC})
              await that.setState({vca : data[0].VCA})
              await that.setState({date:data[0].date})
              await that.setState({sensor:data[0].Sensor})
              await that.setState({pa:data[0].PA})
              await that.setState({pb:data[0].PB})
              await that.setState({pc:data[0].PC})
            }) 
            firebase.database().ref('PLC').on('value',async function(snapshot){
              let data = await snapshot.val()
              freq = Tools.convertToHertz(data.DIN3.toString()+data.DIN2.toString()+data.DIN1.toString())
              await that.setState({freqAct : freq})
              await that.setState({piston : data.PISTON})
            }) 
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
        this.state={
          c1:0,
          c2:0,
          c3:0,
          vab:0,
          vbc:0,
          vca:0,
          sensor:0,
          date:'',
          value:0, 
          freqAct:0,
          pa:0,
          pb:0,
          pc:0,
          piston:false,
          update:{
            DIN1:0,
            DIN2:0,
            DIN3:0,
            
          },
          pressedPiston:false
      }
    }
    onSlidingComplete = async (value)=>{
        valueToUpdate = await Tools.convertToBits(value)
        await this.setState({update:valueToUpdate})
        await firebase.database().ref('commands').update(this.state.update)
    }
    render(){
        return (
            
            <View style={{ flex: 1,flexDirection:'row', alignItems: 'stretch', justifyContent: 'center', height:height*0.8 }}>
            <View style={{flex:1, borderRadius:10, backgroundColor:'#33cccc', alignItems:'center',height:height*0.8}}>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>Vel. RPM: </Text><Text style={styles.text}>{this.state.sensor.toFixed(1)+' rpm'}</Text>
              </View> 
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>Frec. Actual: </Text><Text style={styles.text}>{this.state.freqAct+' Hz'}</Text>
              </View>
               <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>C-A: </Text><Text style={styles.text}>{this.state.c1+' A'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>C-B: </Text><Text style={styles.text}>{this.state.c2+' A'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>C-C: </Text><Text style={styles.text}>{this.state.c3+' A'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>V-AB: </Text><Text style={styles.text}>{this.state.vab+' V'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>V-BC: </Text><Text style={styles.text}>{this.state.vbc+' V'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>V-CA: </Text><Text style={styles.text}>{this.state.vca+' V'}</Text>
              </View> 
               <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>P-A: </Text><Text style={styles.text}>{this.state.pa+' W'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>P-B: </Text><Text style={styles.text}>{this.state.pb+' W'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>P-C: </Text><Text style={styles.text}>{this.state.pc+' W'}</Text>
              </View> 
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>Pistón: </Text><Text style={styles.text}>{this.state.piston ? 'Activado':'Desactivado'}</Text>
              </View>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={styles.text}>Fecha: </Text><Text style={styles.text}>{this.state.date.substring(11,19)}</Text>
              </View> 
              
            </View>
              <View style={{flex:1,marginLeft:width*0.05}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <Slider
                      style={{height:height*0.8 }}
                      value={this.state.value}
                      step={9}
                      invert orientation={'vertical'}
                      trackStyle={{width:width*0.05,borderWidth:width*0.005,borderRadius:width*0.01}}
                      maximumValue={60}
                      thumbImage={logo}
                      animationType={'spring'}
                      animateTransitions={true}
                      onValueChange={value => this.setState({ value })}
                      onSlidingComplete={value =>this.onSlidingComplete(value)}
                      thumbStyle={{backgroundColor: '#33cccc',borderWidth: 2,width:60,height:60,borderRadius:60}} 
                      thumbTouchSize={{width: width*0.2, height: width*0.2}} 
                      minimumTrackTintColor={'#2eb8b8'} 
                      maximumTrackTintColor={'#0f3d3d'}
                    />
                  </View>
                  <View style={{flex:0,marginLeft:width*0.1 }}>
                    <Text>Frecuencia: {this.state.value} Hz</Text>
                    <Button
                      title={this.state.pressedPiston ?'Pistón abajo':'Pistón arriba'}
                      buttonStyle={[{ borderRadius:width*0.27, height:width*0.27, width:width*0.27,marginTop:height*0.4 },!this.state.pressedPiston ?{backgroundColor:'#00C851'}:{backgroundColor:'#ff4444'}]}
                      onPress={async ()=>{
                        await this.setState({pressedPiston:!this.state.pressedPiston})
                        await firebase.database().ref('/').update({PISTON:this.state.pressedPiston ? 1:0})

                      }
                      }
                    />
                  </View>
                </View>
              </View>
          </View>

        )
    }
    
}
const styles = StyleSheet.create({
    form:{
      flex:1
    },
    text:{
      color:'white',
      fontWeight:'bold',
      fontSize:15
    },
  });
  