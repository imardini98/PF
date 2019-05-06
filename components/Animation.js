import React from 'react'
import {Animated,View,Image,Dimensions} from 'react-native'

const logo = require('../assets/logo-tconbelt.png')
const {height, width} = Dimensions.get('window');

export default class Animation extends React.Component{
    constructor () {
        super()
        this.state = {
            animate: new Animated.Value(0)
        }
    }
    componentWillMount(){
        Animated.timing(this.state.animate,{
            toValue:1,
            duration: 1000
        }).start()
    }
    render(){
        return(
            <View>
                <Animated.View
                style={{opacity:this.state.animate}}
                >
                    <Image 
                    source={logo}
                    style={{resizeMode:'stretch' ,width: width*0.5, height: height*0.3 }}
                    />
                </Animated.View>
            </View>
        )
    }
}

