import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deviceHeight, deviceWidth } from './Dimensions';
import Cards from './Cards';

const Home = ({ navigation }) => {

  const [city, setCity] = useState('');
  const cities = [
    {
      name: 'New Delhi',
      image: require('../assets/image3.jpg'),
    },
    {
      name: 'New York',
      image: require('../assets/image4.jpg'),
    },
    {
      name: 'London',
      image: require('../assets/image5.jpg'),
    },
    {
      name: 'San Francisco',
      image: require('../assets/image6.jpg'),
    },
    {
      name: 'New Jersey',
      image: require('../assets/image7.jpg'),
    }
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/image1.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      />

      <View style={styles.absoluteContainer}>
        <View style={styles.header}>
          <Icon name='bars' size={25} color="#ffffff" style={styles.icon} />
          <Image source={require('../assets/user.jpg')} style={styles.userImage} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.subtitle}>Search the city</Text>

          <View style={styles.searchContainer}>
            <TextInput
              value={city}
              onChangeText={(val) => setCity(val)}
              placeholder='Search here'
              placeholderTextColor='white'
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Details', { name: city })}>
              <Icon name='search' size={22} color='white' />
            </TouchableOpacity>
          </View>
          <Text style={styles.locationsTitle}>My Locations</Text>
          <FlatList
            horizontal
            data={cities}
            renderItem={({ item }) => (
              <Cards name={item.name} image={item.image} navigation={navigation}/>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    height: deviceHeight,
    width: deviceWidth,
  },
  backgroundImageStyle: {
    opacity: 0.6,
    backgroundColor: "#000000",
  },
  absoluteContainer: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    width: deviceWidth - 20,
  },
  icon: {
    marginRight: 10,
  },
  userImage: {
    height: 46,
    width: 46,
    borderRadius: 50,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 150,
  },
  title: {
    fontSize: 40,
    color: "#ffffff",
  },
  subtitle: {
    color: "white",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 16
  },
  locationsTitle: {
    color: "white",
    fontSize: 22,
    paddingHorizontal: 10,
    marginTop: 170,
    marginBottom: 20,
  },
});

export default Home;
