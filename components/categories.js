import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
function Category() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu

  const getApi = () => {
    fetch('https://65a63f2474cf4207b4ef8c55.mockapi.io/Camera/api/product')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false); // Đã tải xong dữ liệu
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  
    const filtered = products.filter(item =>
      item.name && typeof item.name === 'string' &&
      item.name.toLowerCase().includes(text.toLowerCase())
    );
  
    setFilteredProducts(filtered);
  };
  
  return (
    <View style={{ width: '100%', backgroundColor: 'white', flex: 70 }}>

    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginStart: 10,
                paddingLeft: 10,
              }}
              placeholder="Search..."
              value={searchText}
              onChangeText={handleSearch}
            />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={filteredProducts}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  name: item.name,
                  url: item.image,
                  price: item.price,
                })
              }
              style={styles.productCard}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
              <Text style={styles.productPrice}>{item.price} vnđ</Text>
              <Text style={styles.productTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginStart: 10,
    paddingLeft: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 10,
  },
  productImage: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productPrice: {
    color: 'red',
    marginTop: 5,
  },
  productTitle: {
    color: 'black',
    marginTop: 5,
  },
});

export default Category;