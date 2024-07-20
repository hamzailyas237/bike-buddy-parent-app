import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CStyles from '../style'
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SwipeButton from 'rn-swipe-button';

const Accident = () => {
    const [counter, SetCounter] = useState("00:30")
    return (
        <View style={[CStyles.AppBg1, CStyles.alignItemsCenter, CStyles.justifyContentCenter, { flex: 1 }]}>
            {/* <View style={[CStyle]}> */}
            <Text style={[CStyles.textWhite, CStyles.fs2, CStyles.textBold]}>Accident Detected!</Text>
            <View style={[CStyles.positionRelative, CStyles.alignItemsCenter, CStyles.justifyContentCenter, CStyles.mt4]} >
                <View style={[CStyles.positionAbsolute, CStyles.bgWhite, CStyles.p5, CStyles.w45, CStyles.h75, { flex: 1, borderRadius: 200 }]}>
                </View>

                <CircularProgress
                    value={"30"}
                    radius={120}
                    duration={2000}
                    progressValueColor={'#000'}
                    maxValue={60}

                    title={'KM/H'}
                    titleColor={'black'}
                    titleStyle={{ fontWeight: 'bold', color: "black" }}

                    activeStrokeWidth={15}
                    inActiveStrokeColor='transparent'

                />
            </View>
            <Text style={[CStyles.textWhite, CStyles.fs1, CStyles.textBold, CStyles.my2]}>{counter}</Text>
            <Text style={[CStyles.textWhite, CStyles.fs6, CStyles.w80, CStyles.textCenter]}>When the countdown is completed your
                Emergency Contact will be notified of your
                accident.</Text>
            <View style={[CStyles.flexRow, CStyles.w90, CStyles.bgWhite, CStyles.p2, CStyles.rounded, CStyles.alignItemsCenter, CStyles.my2,]}>
                <Icon name="location-on" size={30} color={CStyles._danger} />
                <View style={[CStyles.mx1]}>
                    <Text style={[CStyles.fs5, CStyles.textBlack, CStyles.textBold]}>North Nazimabad, block 02</Text>
                    <Text style={[CStyles.fs5, CStyles.textBlack]}>Near Moosa Colony</Text>
                </View>
            </View>
            {/* </View> */}
            <SwipeButton
                // onSwipeSuccess={() => updateSwipeStatusMessage('Slide success!')}
                railBackgroundColor="#a493d6"
                thumbIconBackgroundColor="#FFFFFF"
           
                title="Slide to cancel"
                height={50}
                width={'70%'}
            />

        </View>
    )
}


export default Accident