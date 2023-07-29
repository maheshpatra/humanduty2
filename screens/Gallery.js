import React, { useEffect } from 'react';
import { Appbar, Title } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, Switch, TouchableOpacity, StatusBar, FlatList, Pressable, ActivityIndicator } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons } from 'react-native-vector-icons'
import StaggeredList from '@mindinventory/react-native-stagger-view';
// import { FlatList } from 'react-native-gesture-handler';
// import DrawerNav from '../components/Drawer';

const ts = Dimensions.get('window').width / 100;
const SCREEN_WIDTH = Dimensions.get('window').width;
const Gallery = ({ navigation, routes }) => {
  // const [isEnabled, setisenabled] = React.useState(false);
  const [isLoading, setisloading] = React.useState(false);
  const [liveText, setTextLive] = React.useState('Offline');
  const [active, setActive] = React.useState('');
  const [gallery, setGallery] = React.useState('');

  useEffect(()=>{
    getgallery()
  },[])

  function getgallery(){
    setisloading(false)
    const bodyContent = new FormData();
        bodyContent.append("case", "get_gallery");
        
        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if(resp !==1){
                    console.log(resp)
                    setGallery(resp)
                    setisloading(false)
                }
               
            })
  }

  const data = [{
    id: 1,
    url: 'https://picsum.photos/200/300'
  }, {
    id: 2,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  },
  {
    id: 3,
    url: 'https://picsum.photos/200/300'
  }
  ]
  // Number(Math.random() * 20 + 12) * 10,
  const toggle = () => {
    setisenabled(previousState => !previousState);
    setTextLive(liveText === "Offline" ? "Online" : "Offline")
  }
  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar backgroundColor="#e7008a" barStyle="light-content" /> */}
      <View style={{ height: ts*18, backgroundColor: '#fff',paddingTop:ts }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: ts * 5, }}>
        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 3.5, }} onPress={() => navigation.navigate('Home')}>
            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
              <Ionicons name="arrow-back" size={ts * 7.5} color="tomato" />
            </View>
          </TouchableOpacity>
          


          <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 3.5, }} onPress={() => navigation.navigate("Notifications")}>
            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
              <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <StaggeredList
        data={gallery}
        animationType={'FADE_IN_FAST'}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderChildren(item)}
        isLoading={isLoading}
        LoadingView={
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator color={'black'} size={'large'} />
          </View>
        }
      />



    </View>

  )
}

const renderChildren = item => {
  return (
    <View style={getChildrenStyle()} key={item.id}>
      <View style={styles.avatarImage}>
        <Image
          onError={() => { }}
          style={styles.img}
          source={{
            uri: 'http://192.168.43.37/humanduty/'+item.src,
          }}
          resizeMode={'cover'}
        />
      </View>
    </View>
  );
};

const getChildrenStyle = () => {
  return {
    width: (SCREEN_WIDTH - 18) / 2,
    height: Number(Math.random() * 20 + 12) * 10,
    backgroundColor: 'gray',
    margin: 4,
    borderRadius: 18,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  background: {
    backgroundColor: '#63368a',
    borderBottomRightRadius: ts * 4,
    borderBottomLeftRadius: ts * 4,

  },
  avatarImage: {

  },
  img: {
    height: '100%',
    width: '100%'
  }
  , contentContainer: {

  },
  activityIndicatorWrapper: {
    height: 50,
    width: 50
  }


})
export default Gallery