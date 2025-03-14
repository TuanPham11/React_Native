import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DetailsScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={{ backgroundColor:'#d84040', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:40}}>Details Screen</Text>
      <Button
        title="Go to SigIn"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button color={'#0040ff'} title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  
})