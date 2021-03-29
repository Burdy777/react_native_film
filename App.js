import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './components/search'
import FilmDetail from './components/filmDetail'
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'

const Stack = createStackNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      {/* <Navigation/> */}
      <Provider store={Store}>
            <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
      </Stack.Navigator>

      </NavigationContainer>
      </Provider>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
