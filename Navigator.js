import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import HomeScreen from './Screens/Home';
import DashboardScreen from './Screens/Dashboard';
import LoginScreen from './Screens/Login';


     const AppNavigator = createBottomTabNavigator({
      Home: {
        screen: HomeScreen,
       },
       Dashboard : {
         screen: DashboardScreen
       }
    });
    const Auth =createStackNavigator({Login: {
      screen: LoginScreen,
      navigationOptions: {
       header: null
      }
     }})
    
    const AppContainer = createAppContainer(createSwitchNavigator({
      AppNavigator,
      Auth
      },
      {
         initialRouteName:'Auth'
       }
   ));

   export default AppContainer