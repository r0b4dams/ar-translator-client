import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen, Languages } from '../screens';
import AppRoutes from './AppRoutes';
import AppContext from '../store/context';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [state] = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        {state.user ? (
          <>
            <Stack.Group>
              <Stack.Screen
                name='Translator'
                component={AppRoutes}
                options={{ headerShown: false }}
              />
            </Stack.Group>

            {state.languages && (
              <Stack.Group screenOptions={{ presentaion: 'modal' }}>
                <Stack.Screen name='Languages' component={Languages} />
              </Stack.Group>
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
