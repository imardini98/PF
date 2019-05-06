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
            c1 : [],
            c2 : [],
            c3 : [],
            vab : [],
            vbc : [],
            vca : [],
            date : [],
            sensor:[]
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
        firebase.database().ref('data').limitToLast(5).once('value',async function(snapshot){
            let data = await snapshot.val()
            data = await Object.values(data)
            data.forEach(element => {
                c1.push(element.C1)
                c2.push(element.C2)
                c3.push(element.C3)
                vab.push(element.VAB)
                vbc.push(element.VBC)
                vca.push(element.VCA)
                date.push(element.date)
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
        firebase.database().ref('data').limitToLast(5).on('value', async function(snapshot){
            let data_retrieved = await snapshot.val()
            data_retrieved = await Object.values(data_retrieved)
            await that.setState({c1:that.state.c1.push(data_retrieved[0].C1)})
            await that.setState({c2:that.state.c2.push(data_retrieved[0].C2)})
            await that.setState({c3:that.state.c3.push(data_retrieved[0].C3)})
            await that.setState({vab:that.state.vab.push(data_retrieved[0].VAB)})
            await that.setState({vbc:that.state.vbc.push(data_retrieved[0].VBC)})
            await that.setState({vca:that.state.vca.push(data_retrieved[0].VCA)})
            await that.setState({date:that.state.date.push(data_retrieved[0].date)})
            await that.setState({sensor : that.state.sensor.push(data_retrieved[0].Sensor)})
            console.log(that.state)
        })
    }
    render(){
        return(
            <View>
  <Text>
    Bezier Line Chart
  </Text>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ],
      },{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
        )
    }
}
