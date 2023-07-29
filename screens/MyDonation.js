import React, { useEffect, useState } from "react";
import { Appbar, Title } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, Switch, TouchableOpacity, StatusBar, FlatList, ActivityIndicator } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { _retrieveData } from "../local_storage";
import Dhistry from '../assets/component/Dhistry'
// import DrawerNav from '../components/Drawer';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Progress, Center, NativeBaseProvider, } from "native-base";

import { Entypo, AntDesign, MaterialIcons, Feather, MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
import { isLoading } from "expo-font";


const ts = Dimensions.get('window').width / 100;
const MyDonation = ({ navigation, routes }) => {
    const [isEnabled, setisenabled] = React.useState(false);
    const [isloading, setIsloading] = React.useState(false);
    const [liveText, setTextLive] = React.useState('Offline');
    const [active, setActive] = React.useState('');
    const [donation, setDonation] = React.useState([])
    const [activ, setAct] = React.useState({})
    const [details, setDetails] = React.useState({})
    useEffect(() => {
        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {
                // getBalance(userdata.email)
                // setEmail(userdata.email)
                getDonation(userdata.email)
            }


        });

    }, [])

    const getimage = (data) => {
        const a = JSON.parse(data)

        return (a.src)



    }
    const gettitle = (data) => {
        const a = JSON.parse(data)
        return (a.name)
    }
    const getdescription = (data) => {
        const a = JSON.parse(data)
        return (a.description)
    }
    const cal = (data) => {
        const a = JSON.parse(data)
        const r = a.raised
        const g = a.goal
        const d = (r / g) * 100;
        return (d)
    }
    const raised = (data) => {
        const a = JSON.parse(data)
        return (a.raised)
    }
    const goal = (data) => {
        const a = JSON.parse(data)
        return (a.goal)
    }
    const handelDonateagain = (data) => {
        const a = JSON.parse(data)
        navigation.navigate("DonationDetails", { item: a })

    }



    function getDonation(emmail) {
        setIsloading(true)
        const bodyContent = new FormData();
        bodyContent.append("case", "get_history");
        bodyContent.append("email", emmail);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    console.log(resp)
                    setDonation(resp)
                    setIsloading(false)




                }

            })

    }
    useFocusEffect(
        React.useCallback(() => {
            _retrieveData("USER_DATA").then((userdata) => {
                // console.log(user_mobile);
                if (userdata !== 'error') {
                    getDonation(userdata.email)
                }


            });
        }, [])
    );

    const toggle = () => {
        setisenabled(previousState => !previousState);
        setTextLive(liveText === "Offline" ? "Online" : "Offline")
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: ts * 18, backgroundColor: '#fff', paddingTop: ts, borderBottomWidth: 1, borderColor: '#eee' }}>
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
            {!isloading ? <View>
                {donation.length > 0 ? <FlatList
                    contentContainerStyle={{paddingBottom:65}}
                    data={donation}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ backgroundColor: '#eee', height: ts * 52, borderRadius: ts * 5, margin: ts * 2.5, borderWidth: 1, elevation: 5, borderColor: '#ccc' }}>
                            <View style={{ flexDirection: 'row', height: ts * 35, marginBottom: ts * 2.5 }}>
                                <View style={{ width: ts * 35, marginTop: ts * 5, marginLeft: ts * 2.5 }}>
                                    <Image

                                        style={{ height: '100%', width: '100%', alignSelf: 'center', borderRadius: ts * 3, borderWidth: 6, borderColor: '#ede4e1', }}
                                        source={{
                                            uri: 'https://gamerpatra.000webhostapp.com/apis/upload/' + getimage(item.details),
                                        }}
                                    />
                                </View>
                                <View style={{ width: ts * 52, marginTop: ts * 7, marginLeft: ts * 2.5 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: ts * 5, alignSelf: 'center' }}>{gettitle(item.details)}</Text>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: ts * 2, alignSelf: 'center', color: 'tomato', marginTop: ts * 1.5, marginBottom: ts * 3 }}>{getdescription(item.details)}</Text>
                                    <NativeBaseProvider>
                                        <Center>
                                            <Box w="100%" maxW="361">
                                                <Progress bg="#ddd" _filledTrack={{
                                                    bg: "tomato"
                                                }} value={cal(item.details)} mx="1" />
                                            </Box>
                                        </Center>
                                    </NativeBaseProvider>
                                    <View style={{ flexDirection: 'row', width: '96%', justifyContent: 'space-between' }}>
                                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: ts * 3, alignSelf: 'center', color: 'tomato', marginTop: ts * 1.5, marginBottom: ts * 2 }}>{'Raised :' + raised(item.details)}</Text>
                                        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: ts * 3, alignSelf: 'center', color: 'tomato', marginTop: ts * 1.5, marginBottom: ts * 2 }}>{'Goal :' + goal(item.details)}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: ts * 10 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 3, marginLeft: ts * 3.5 }}>You Have Donated  <Text style={{
                                    color: 'tomato', fontWeight: 'bold', fontSize: ts * 3,
                                }}>₹ {item.amount}</Text></Text>
                                <TouchableOpacity onPress={() => handelDonateagain(item.details)} style={{ fontSize: ts * 3, marginRight: ts * 3, backgroundColor: '#eee', padding: 5.5, borderRadius: ts * 5, borderWidth: 2, borderColor: 'green', }}>
                                    <Text style={{ fontWeight: 'bold', color: 'green', marginHorizontal: 3 }}>Donate Again</Text>
                                </TouchableOpacity>

                            </View>
                            <Text style={{ fontWeight: 'bold', borderBottomLeftRadius: ts * 3, paddingBottom: 2, color: 'tomato', position: 'absolute', top: 0, right: 0, color: '#fff', backgroundColor: 'tomato', paddingHorizontal: 10, borderTopRightRadius: ts * 5, fontSize: ts * 3 }}>{item.time_date}</Text>

                        </View>
                    )}

                /> : <View style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ marginTop: ts * 5, fontSize: ts * 4.5, fontFamily: 'pippins_medium' }}>No Donation Found !</Text></View>}

            </View> : <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>

                <ActivityIndicator size={'large'} color='tomato' />
            </View>}





        </View>





    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    background: {
        backgroundColor: '#63368a',
        borderBottomRightRadius: ts * 4,
        borderBottomLeftRadius: ts * 4,

    }
})
export default MyDonation