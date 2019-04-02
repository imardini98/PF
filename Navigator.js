import {createStackNavigator, createAppContainer} from 'react-navigation';

const AppNavigator = createStackNavigator({
      Login: LoginScreen,
      Home: HomeScreen,
     },{
        initialRouteName: 'Login'
     });