import { View, Text,ImageBackground,StyleSheet,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from "@react-navigation/native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { deviceHeight, deviceWidth } from './Dimensions';
import axios from 'axios';
import { API_KEY } from './Constants';

export default function Details({route}) {
    // console.warn(props.route.params)
    const [data,setData] = useState()
    const {name} = route.params
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`;
    const Data = ({title, value}) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 22}}>{title}</Text>
          <Text style={{color: 'white', fontSize: 22}}>{value}</Text>
        </View>
      );
    useEffect(()=>{
        axios({
            method: 'GET',
            url: `${BASE_URL}`,
          })
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    },[])

  return (
    <View>
      <Image
        source={require('../assets/image2.jpg')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      />

      <View style={styles.absoluteContainer}>
        <View style={styles.header}>
          <Icon name='bars' size={25} color="#ffffff" style={styles.icon} />
          <Image source={require('../assets/user.jpg')} style={styles.userImage} />
        </View>
        {data ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              height: deviceHeight - 100,
            }}>
            <View>
              <Text style={{color: 'white', fontSize: 40}}>{name}</Text>
              <Text style={{fontSize: 22, color: 'white', textAlign:"center"}}>
                {data['weather'][0]['main']}
              </Text>
            </View>

            <Text style={{color: 'white', fontSize: 64}}>
              {(data['main']['temp'] - 273).toFixed(2)}&deg; C
            </Text>

            <View>
            <Text style={{color: 'white', fontSize: 22, marginBottom: 16}}>Weather Details</Text>
            <View style={{width: deviceWidth - 60}}>
              <Data value={data['wind']['speed']} title="Wind" />
              <Data value={data['main']['pressure']} title="Pressure" />
              <Data value={`${data['main']['humidity']}%`} title="Humidity" />
              <Data value={data['visibility']} title="Visibility" />
            </View>
            </View>
          </View>
        ) : null}
        </View>

      

    </View>
  )
}
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