import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas de autenticação
import RegisterScreen from '../frontEndPDSI/src/screens/RegistrerScreen';
import LoginScreen from './src/screens/LoginSreen';

// Telas principais
import HomeScreen from '../frontEndPDSI/src/screens/HomeScreen';
import ProfileScreen from '../frontEndPDSI/src/screens/ProfileScreen';
import ReservasScreen from '../frontEndPDSI/src/screens/ReservasScreen';
import OcorrenciasScreen from '../frontEndPDSI/src/screens/OcorrencyScreen';
import DenunciasScreen from '../frontEndPDSI/src/screens/DenunciasScreen';
import FinanceiroScreen from './src/screens/FinanceiroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Autenticação */}
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Home */}
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* Perfil */}
        <Stack.Screen name="Profile" component={ProfileScreen} />

        {/* Funcionalidades do condomínio */}
        <Stack.Screen name="Reservas" component={ReservasScreen} />
        <Stack.Screen name="Ocorrencias" component={OcorrenciasScreen} />
        <Stack.Screen name="Denuncias" component={DenunciasScreen} />
        <Stack.Screen name="Financeiro" component={FinanceiroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
