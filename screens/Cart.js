import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';


function Cart({ route, navigation }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (route.params && route.params.name) {
      const { name, url, price, quantity } = route.params;
      const newItem = { name, url, price, quantity };
      setCartItems([...cartItems, newItem]);
    }
  }, [route.params]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const updateQuantity = (index, newQuantity) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = newQuantity;
    setCartItems(newCartItems);
  };

  const increaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  const decreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = Math.max(1, newCartItems[index].quantity - 1);
    setCartItems(newCartItems);
  };

  const handleCheckout = () => {
    // Handle payment logic here
    Alert.alert('Payment Successful', `Tổng tiền: ${calculateTotal()}.000vnđ`, [
      { text: 'OK', onPress: () => setCartItems([]) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác nhận đơn hàng</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.url }} style={styles.itemImage} />

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Giá: {item.price}.000vnđ</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(index)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.quantityInput}
                  value={item.quantity.toString()}
                  onChangeText={(newQuantity) => updateQuantity(index, parseInt(newQuantity))}
                  keyboardType="numeric"
                />

                <TouchableOpacity onPress={() => increaseQuantity(index)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => removeFromCart(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Tổng tiền: {calculateTotal()}.000 vnđ</Text>

      <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}> Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    color: 'blue',
    fontSize: 20,
    marginHorizontal: 8,
  },
  quantityInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 8,
    paddingHorizontal: 8,
    width: 50,
    textAlign: 'center',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 50,
    marginHorizontal: 50,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Cart;
