import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SplashScreen,
  LoginScreen,
  RegisterScreen,
  Languages,
} from '../screens';
import AppRoutes from './AppRoutes';
import AppContext from '../store/context';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [state] = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        {state.init ? (
          <Stack.Screen
            name='Init'
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : state.user ? (
          <>
            <Stack.Screen
              name='Translator'
              component={AppRoutes}
              options={{
                headerShown: false,
              }}
            />
            {state.languages && (
              <Stack.Screen
                name='Languages'
                options={{ presentation: 'modal' }}
                component={Languages}
              />
            )}
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
