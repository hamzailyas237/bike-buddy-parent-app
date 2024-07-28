import * as React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import CStyles from '../style';

const AppLoader = () => (
  <ActivityIndicator
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    animating={true}
    color={MD2Colors.blue800}
    size={30}
  />
);

export default AppLoader;
