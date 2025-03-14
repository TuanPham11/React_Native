import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './sceens/HomeScreen';
import DetailsScreen from './sceens/DetailsScreen';
import SigninScreen from './sceens/SigninScreen';
import SignUpScreen from './sceens/SignUpScreen';
import ProductDetailScreen from './sceens/ProductDetailScreen';
import FirstScreen from './sceens/FirstScreen';
import WellcomeScreen from './sceens/WellcomeScreen';
import OrderScreen from './sceens/OrderScreen';
import ChangePassScreen from './sceens/ChangePassScren';
const Stack = createNativeStackNavigator();

const MyApp = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="First">
      <Stack.Screen options={{headerShown:false}} name="First" component={FirstScreen} />
      <Stack.Screen options={{headerShown:false}} name="Wellcome" component={WellcomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="Details" component={DetailsScreen} />
        <Stack.Screen options={{headerShown:false}} name="SignIn" component={SigninScreen} />
        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{headerShown:false}} name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen options={{headerShown:false}} name="Order" component={OrderScreen} />
        <Stack.Screen options={{headerShown:false}} name="ChangePass" component={ChangePassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MyApp

const styles = StyleSheet.create({
    container:{
    backgroundColor:'#f59c72',
    flex:1,
    flexDirection:'column'
    //alignItems:'center',
    //justifyContent:'center'
    },
    container1:{
        flex:1,
        backgroundColor:'#d75a9b'
    },
    container2:{
        flex:1,
        backgroundColor:'#5c5ad7'
    },
    container11:{
        flex:1,
        backgroundColor:'#46842a'
    },
    container12:{
        flex:1,
        backgroundColor:'#b27d11'
    },
    styleh1:{
        fontSize:30,
        color:'#fff',
    },
})