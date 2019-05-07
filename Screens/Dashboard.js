import React from 'react'
import {View, Text, Dimensions} from 'react-native'
import firebase from '@firebase/app';
import Icon from 'react-native-vector-icons/FontAwesome'
require('firebase/database')
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [],
            c1 : [0,0,0,0,0],
            c2 : [0,0,0,0,0],
            c3 : [0,0,0,0,0],
            vab : [0,0,0,0,0],
            vbc : [0,0,0,0,0],
            vca : [],
            date : ['','','','',''],
            sensor:[0,0,0,0,0]
        }
    }
    static navigationOptions =({navigation})=> {
        return {
          title: 'DASHBOARD',
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

    async componentDidMount () {
        const that = this
        let c1 = []
        let c2 = []
        let c3 = []
        let vab = []
        let vbc = []
        let vca = []
        let date = []
        let sensor = []
        firebase.database().ref('data').limitToLast(1).on('value',async function(snapshot){
          if(c1.length == 5){
            c1 = [c1[0],c1[1],c1[2],c1[3]]
            c2 = [c2[0],c2[1],c2[2],c2[3]]
            c3 = [c3[0],c3[1],c3[2],c3[3]]
            vab = [vab[0],vab[1],vab[2],vab[3]]
            vbc = [vbc[0],vbc[1],vbc[2],vbc[3]]
            vca = [vca[0],vca[1],vca[2],vca[3]]
            date = [date[0],date[1],date[2],date[3]]
            sensor = [sensor[0],sensor[1],sensor[2],sensor[3]]
          }
        
            let data = await snapshot.val()
            data = await Object.values(data)
            data.forEach(element => {
                c1.push(element.C1)
                c2.push(element.C2)
                c3.push(element.C3)
                vab.push(element.VAB)
                vbc.push(element.VBC)
                vca.push(element.VCA)
                date.push(element.date.substring(11,18))
                sensor.push(element.Sensor)
            });
            await that.setState({c1 : c1})
            await that.setState({c2 : c2})
            await that.setState({c3 : c3})
            await that.setState({vab : vab})
            await that.setState({vbc : vbc})
            await that.setState({vca : vca})
            await that.setState({date:date})
            await that.setState({sensor:sensor})
        })
    }
    render(){
        return(
            <View>
  <Text>
    Consumo de corriente
  </Text>
  <LineChart
    data={{
      labels: this.state.date,
      datasets: [{
        data: this.state.c1,
      },
      {
        data: this.state.c2,
      },
      {
        data: this.state.c3,
      }]
    }}
    width={Dimensions.get('window').width*0.9} // from react-native
    height={Dimensions.get('window').height*0.5}
    yAxisLabel={'A'}
    chartConfig={{
      backgroundColor: '#000080',
      backgroundGradientFrom: '#00FFFF',
      backgroundGradientTo: '#008080',
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
        )
    }
}
