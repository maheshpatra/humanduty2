// import react from "react";
import React, { useEffect } from 'react';
import { Box, Heading, AspectRatio,   Center, HStack, Stack, NativeBaseProvider } from "native-base";
import { Image,Dimensions,View,Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, Feather, MaterialIcons, Fontisto, FontAwesome5,AntDesign,FontAwesome } from "@expo/vector-icons";



export function BlogCard(props) {
  //  console.log(props.item)
  const item =props.item;
 const data = JSON.parse(props.item.data);
 console.log(data)

  const ts = Dimensions.get('window').width / 100;

    return (
      <View style={{width:ts*100,alignSelf:'center',paddingTop:15,marginBottom:50,backgroundColor:'#fff'}}>
        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',marginLeft:20}}>
        <Image
                        source={{ uri: data.profile }}
                        style={styles.sideMenuProfileIcon}
                    />
                    <View style={{
                      marginLeft:10,
                      width:ts*45 
                    }}>
                    <Text style={{fontWeight:'bold',fontSize:17}}>{data.username}</Text>
                     <Text style={{fontWeight:'bold',fontSize:11,width:'50%'}} numberOfLines={1}>{data.email}</Text>
                    </View>
                   

        </View>
        <Text style={{fontFamily:'novaBold',marginLeft:20,marginBottom:10}}>wjsegrh elweurw;loeuirwie rlwe rwerwgler ;wekrgw ewhge rlg iwgr wlhekwbwohr wkyrowyerhweirgwer wer wehe fskg<Text style={{color:'blue',fontFamily:'novaBold',paddingLeft:5}}> See More..</Text></Text>
        
        <Image source={{uri: item.image}} style={{height:400,width:'100%'}}/>
        <View style={{height:40,width:'90%',justifyContent:'space-between',flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
          <Text><AntDesign name={'like1'} size={ts * 4} color="tomato" />34</Text>
          <Text>9 comment . 1 share</Text>
        </View>

        <View style={{height:50,width:'100%',flexDirection:'row',justifyContent:'space-between',borderTopWidth:.5,}}>
<TouchableOpacity style={{height:'100%',width:ts*30,alignItems:'center',justifyContent:'center'}}><AntDesign name={'like2'} size={ts * 7} color="tomato" /><Text style={{fontSize:10,fontFamily:'novaBold'}}>Like</Text></TouchableOpacity>
<TouchableOpacity style={{height:'100%',width:ts*30,alignItems:'center',justifyContent:'center'}}><FontAwesome name={'commenting-o'} size={ts * 7} color="tomato" /><Text style={{fontSize:10,fontFamily:'novaBold'}}>comment</Text></TouchableOpacity>
<TouchableOpacity style={{height:'100%',width:ts*30,alignItems:'center',justifyContent:'center'}}><FontAwesome name={'share-square-o'} size={ts * 7} color="tomato" /><Text style={{fontSize:10,fontFamily:'novaBold'}}>Share</Text></TouchableOpacity>


        </View>

      </View>
    )
  };
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