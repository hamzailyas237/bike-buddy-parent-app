import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import CStyles from '../style'

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Parent')
        }, 2000)
    }, [])
    return (
        <View style={[CStyles.alignItemsCenter,CStyles.justifyContentCenter,CStyles.AppBg1,{flex:1}]}>
            <Text style={[{fontSize:50},CStyles.textBold,CStyles.textWhite,CStyles.mb3]}>Bike Buddy</Text>
            <Text style={[CStyles.fs2,CStyles.textBold,CStyles.textDanger]}>Safety in Every Spin</Text>
        </View>
    )
}

export default Splash