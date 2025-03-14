import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FirstRoute = () => {
  return (

       <View style={[styles.scene, { backgroundColor: '#5bc9e4' }]} />

  )
}

export default FirstRoute

const styles = StyleSheet.create({
    scene: {
        flex: 1,
      },
})