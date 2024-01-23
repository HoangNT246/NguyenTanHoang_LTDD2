import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ImageBackground } from 'react-native'; // Import thêm Alert
import { useNavigation } from '@react-navigation/native'; // Import để sử dụng navigation

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  const doRegister = async () => {
    if (username.length === 0 || password.length === 0) {
      Alert.alert("Vui lòng nhập đầy đủ tên người dùng và mật khẩu");
      return;
    }
    try {
      const response = await fetch('https://65a63f2474cf4207b4ef8c55.mockapi.io/Camera/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Đăng kí thành công');
        navigation.navigate('Login');
      } else {
        Alert.alert('Đăng ký không thành công', 'Có lỗi xảy ra trong quá trình đăng ký');
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      Alert.alert('Đã xảy ra lỗi khi đăng ký');
    }
  };

  return (
    <ImageBackground
    source={require('../assets/images/mc1.jpg')}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        onChangeText={(text) => setUsername(text)}
        value={username}
        accessibilityLabel="Tên người dùng"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
        accessibilityLabel="Mật khẩu"
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={doRegister}
        accessibilityLabel="Đăng Ký"
      >
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);
};

const styles = StyleSheet.create({
background: {
  flex: 1,
  resizeMode: 'cover', // or 'stretch' for different image resize modes
},
container: {
  flex: 1,
  padding: 16,
  justifyContent: 'center',
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 50,
  textAlign: 'center',
  color: 'white', // Set text color to be visible on the background
},
input: {
  height: 40,
  borderColor: 'white', // Set border color to be visible on the background
  borderWidth: 1,
  marginBottom: 16,
  paddingHorizontal: 10,
  color: 'white', // Set text color to be visible on the background
},
registerButton: {
  backgroundColor: 'blue',
  paddingVertical: 12,
  borderRadius: 20,
  alignItems: 'center',
},
buttonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
},
});

export default Signin;
