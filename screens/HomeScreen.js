import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Category from '../components/categories'

export default function HomeScreen() {

  return (
    <SafeAreaView >
  
    <ScrollView>
       <Category/>
    </ScrollView>
      
    </SafeAreaView>
  )
}