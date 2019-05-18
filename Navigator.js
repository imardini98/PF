import React from 'react'
import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import HomeScreen from './Screens/Home';
import DashboardScreen from './Screens/Dashboard';
import LoginScreen from './Screens/Login';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PreloaderScreen from './Screens/Preloader';
import OptionsScreen from './Screens/Options';

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `md-speedometer`;
    // We want to add badges to home tab icon
  } else if (routeName === 'Dashboard') {
    iconName = `md-analytics`;
  }else if ( routeName === 'Options'){
    iconName = 'md-options'
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};
     const AppNavigator = createBottomTabNavigator({
      Home: {
        screen: HomeScreen,
       },
       /* Dashboard : {
         screen: DashboardScreen
       }, */
       Options : {
         screen: OptionsScreen  
       }
       
    },{
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: '#33cccc',
        inactiveTintColor: 'gray',
      },
    });
    const Auth =createStackNavigator({Login: {
      screen: LoginScreen,
      navigationOptions: {
       header: null
      }
     }})
    
    const AppContainer = createAppContainer(createSwitchNavigator({
      AuthLoading : PreloaderScreen,
      AppNavigator,
      Auth

      },
      {
         initialRouteName:'AuthLoading'
       }
   ));

   export default AppContainer