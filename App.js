import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/home';
import Snacks from './src/pages/snacks';
import Cart from './src/pages/cart';
import Tickets from './src/pages/tickets';
import Order from './src/pages/order';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Início' }}
        />
        <Stack.Screen
          name="Tickets"
          component={Tickets}
          options={{ title: 'Ingressos' }}
        />
        <Stack.Screen name="Snacks" component={Snacks} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'Meu carrinho' }}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
