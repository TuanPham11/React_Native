import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SecondRoute = () => {
  return (
 
       <View style={[styles.scene, { backgroundColor: '#95c443' }]} />

  )
}

export default SecondRoute

const styles = StyleSheet.create({
    scene: {
        flex: 1,
      },
})