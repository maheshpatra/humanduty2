
import React, { useState, useEffect } from 'react';
import { View,StyleSheet, Text, Image, Dimensions, Pressable, TouchableOpacity, ScrollView, StatusBar, TextInput, FlatList, Modal, ActivityIndicator, Alert,Platform,Button} from 'react-native';
import { Ionicons, Fontisto, Entypo, FontAwesome5, Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import {  Actionsheet, useDisclose, Icon, Box, Center, NativeBaseProvider, Progress } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import { _retrieveData } from "../../local_storage";
import * as ImagePicker from 'expo-image-picker';


import Svg, {
    G,
    Path,
    Defs,
    Mask,
    LinearGradient,
    Stop
} from "react-native-svg"
const ts = Dimensions.get('window').width / 100;
const tsh = Dimensions.get('window').height / 100;





const HelpFinder = ({ navigation, route }) => {
    const [email, setEmail] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [item, setItem] = React.useState()
    const [image, setImage] = useState(null);
    const [udata, setUserdata] = useState(null);
    const pickImage = async (option) => {

      if(option == 'camera'){
        let result = await ImagePicker.launchCameraAsync({

          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 5],
          quality: 1,
      });
      console.log(result);
    
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      }else{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
        // No permissions request is necessary for launching the image library
       
      };
      useFocusEffect(
        React.useCallback(() => {
            _retrieveData("USER_DATA").then((userdata) => {
                // console.log(user_mobile);
                if (userdata !== 'error') {
                  setUserdata(userdata)
                  console.log(userdata)
                    
                }
    
    
            });
        }, [])
      );


  

    return (
        <View style={{ flex: 1,paddingHorizontal:20, backgroundColor: '#fff',}}>
          <View style={{flexDirection: 'row', alignItems: 'center',height:tsh*10,width:'100%',alignSelf:'center',justifyContent:'space-between'}}>
      {  udata &&  <Image
                        source={{ uri: udata.profile }}
                        style={styles.sideMenuProfileIcon}
                    />}
                    <View style={{
                      marginLeft:10,
                      width:ts*45 
                    }}>
                     { udata &&<Text>{udata.username}</Text>}
                     {udata && <Text numberOfLines={1}>{udata.email}</Text>}
                    </View>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',backgroundColor:'tomato',padding:10,borderRadius:10,}}>
                      <Text style={{fontWeight:'bold',color:'#fff'}}>Publish</Text>
                    </TouchableOpacity>
          </View>
          <TextInput  cursorColor={'tomato'} numberOfLines={3} style={{fontSize:25}} placeholder='Whats on your mind ?...' />
          {!image && <View style={{flexDirection:'row',width:'100%',justifyContent:'space-around'}}> 
          <TouchableOpacity onPress={()=>
            pickImage('camera')
          } style={{alignItems:'center',padding:10,borderRadius:10,borderWidth:1.5,borderColor:'#999'}}>
          <AntDesign name="camera" size={ts * 10} color="#999" />
          <Text style={{color:'#999'}}>Open Camera</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={()=>
            pickImage('gallery')
          } style={{alignItems:'center',padding:10,borderRadius:10,borderWidth:1.5,borderColor:'#999'}}>
          <Fontisto name="photograph" color={'#999'} size={ts*10} />
          <Text style={{color:'#999'}}>Open Gallery</Text>


          </TouchableOpacity>
          </View>}
          

        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        <View>
        {image && <Image source={{ uri: image }} style={{ width: '100%', height: '80%', }} />}
       {image && <TouchableOpacity onPress={()=>{
         pickImage('gallery')
       }} style={{justifyContent:'center',top:10,right:40,position: 'absolute',backgroundColor:'#fff',borderRadius:5,padding:3}}>
          <Text style={{fontWeight:'bold',color:'tomato'}}>Replace</Text>
        </TouchableOpacity>}
       {image && <TouchableOpacity onPress={()=>{
          setImage(null)
        }} style={{justifyContent:'center',top:10,right:10,position: 'absolute',backgroundColor:'#fff',borderRadius:5,padding:3}}>
        <AntDesign name="delete" size={ts * 5.5} color="tomato" />
        </TouchableOpacity>}
        </View>
        
      </View>

    )
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
      resizeMode: 'center',
      width: 50,
      height: 50,
      borderRadius: 100 / 2,
      alignSelf: 'center',
  },
  iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
  },
  customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
  },
});
export default HelpFinder