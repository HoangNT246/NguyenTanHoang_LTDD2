import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert("Vui lòng nhập đầy đủ tên người dùng và mật khẩu");
      return;
    }
    try {
      const response = await fetch(`https://65a63f2474cf4207b4ef8c55.mockapi.io/Camera/api/account?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length === 1) {
        await AsyncStorage.setItem('loginInfo', JSON.stringify(data[0]));
        navigation.navigate('MainContainer');
      } else {
        Alert.alert('Đăng nhập không thành công', 'Sai tên đăng nhập hoặc mật khẩu');
      }
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      Alert.alert('Đã xảy ra lỗi khi đăng nhập');
    }

  };
  const navigateToRegistration = () => {
    navigation.navigate('Signin');
  };
  return (
    <ImageBackground
      source={require('../assets/images/6.2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chuyên Camera</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={doLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={navigateToRegistration}>
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 90,
    textAlign: 'center',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10, // Adjust the spacing as needed
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
