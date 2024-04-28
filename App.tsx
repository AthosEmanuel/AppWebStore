import React from 'react';
import {NativeRouter, Route} from 'react-router-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddScreen, FormScreen, HomeScreen} from './src/modules';

export type RootStackParamList = {
  Produtos: undefined;
  Editar: {body: {}};
  Adicionar: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Produtos">
        <Stack.Screen name="Produtos" component={HomeScreen} />
        <Stack.Screen name="Editar" component={FormScreen} />
        <Stack.Screen name="Adicionar" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
