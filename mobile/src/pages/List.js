import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client'; //fazer download de socket.io-cliente (yarn add socket.io-client)
import { View, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, Text } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png';
import api from '../services/api';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id =>{
      const socket = socketio('http://192.168.1.124:3333', {
        query : { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then( storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  function handleLogout() {
    navigation.navigate('Login');
    back = true;
  };

  


  return (
    <SafeAreaView style = {styles.container}>

      <Image style = {styles.logo} source = {logo} />

      <ScrollView>
        {techs.map(tech =>  <SpotList key = {tech} tech = {tech}/>)}
      </ScrollView>
      <View>
        <TouchableOpacity onPress = {handleLogout} style = {styles.button}>
          <Text style = {styles.buttonText}>
            Logout
          </Text>
        </TouchableOpacity>

      </View>

      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 32
  },

  button:{
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2 
  },

  buttonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }

});