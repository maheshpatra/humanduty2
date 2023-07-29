
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, Pressable, TouchableOpacity, ScrollView, StatusBar, TextInput, FlatList, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, Fontisto, Entypo, FontAwesome5, Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Button, Actionsheet, useDisclose, Icon, Box, Center, NativeBaseProvider, Progress } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import { _retrieveData } from "../local_storage";
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





const CauseDetails = ({ navigation, route }) => {
    const [email, setEmail] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [item, setItem] = React.useState(route.params.item)


    useEffect(() => {
        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {

                setEmail(userdata.email)
            }


        });

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            getitem()

        }, [])
    );

    function getitem() {

        const bodyContent = new FormData();
        bodyContent.append("case", "get_adata");
        bodyContent.append("aop", item.aop);
        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                setLoading(false)
                
                    setItem(resp)
                

            })
    }




    function donate() {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_rise");
        bodyContent.append("email", email);
        bodyContent.append("aop", item.aop);
        bodyContent.append("amount", amount);
        bodyContent.append("rais_amount", item.raised);
        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                setLoading(false)
                // console.log()
                if (resp == '506') {
                    Alert.alert('Low balance !', 'Your wallet balance is low recharge Now',[
                       
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'RECHARGE NOW', onPress: () => {navigation.navigate('home')}},
                      ])
                } else if (resp !== '1') {
                    setItem(resp)
                }


                onClose()

            })

    }
    //  console.log(route.params.item)


    const [amount, onChangeAmount] = React.useState(null);
    const [raised, setRaised] = React.useState(item.raised);
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const [selectedIndex, setSelectedIndex] = useState(1);
    const [types, setTypes] = useState(["10", "30", "50", "70", "90", "100"]);
    const [selectedTypes, setSelectedTypes] = useState("50");
    return (
        <View style={{
            background: {
                width: '100%',
                height: '100%',
                flex: 1
            }
        }}>

            <ScrollView>
                <View>
                    <Image
                        style={{ height: tsh * 35, width: ts * 100, borderRadius: ts * 5, alignSelf: 'center', borderBottomRightRadius: 0 }}
                        source={{
                            uri: 'http://192.168.43.37/humanduty/apis/upload/' + item.src,
                        }}
                    />
                    <View style={{ marginTop: ts * 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: ts * 2, position: 'absolute', left: 0, right: 0 }}>
                        <Pressable onPress={() => navigation.pop()} style={{ justifyContent: 'center', marginLeft: ts * 5 }}>
                            <View style={{ elevation: 5, padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Ionicons name="chevron-back" size={ts * 7} color="#333" />
                            </View>
                        </Pressable>



                        {/* search bar */}
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', height: ts * 20, width: '85%', backgroundColor: '#fff', marginTop: -ts * 10, borderTopRightRadius: ts * 2.5, borderBottomRightRadius: ts * 2.5, elevation: 5 }}>
                        <Text numberOfLines={1} style={{ width: '80%', fontSize: ts * 4.5, fontWeight: 'bold', marginHorizontal: ts * 4 }}>{item.name}</Text>
                        <AntDesign name='heart' size={ts * 6} color='tomato' style={{
                            position: 'absolute', right: ts * 2.5

                        }} />
                    </View>
                    <View style={{ marginTop: ts * 3, }}>
                        <Text style={{ color: '#555', fontWeight: 'bold', fontSize: ts * 4, marginLeft: ts * 5, marginBottom: ts * 3 }}><Text style={{
                            color: 'tomato', fontWeight: 'bold', fontSize: ts * 4,
                        }}>{item.raised}</Text> fund raised from rs <Text style={{
                            color: 'tomato', fontWeight: 'bold', fontSize: ts * 4,
                        }}>{item.goal}</Text></Text>
                        <NativeBaseProvider>
                            <Center>
                                <Box w="100%" maxW="361">
                                    <Progress bg="#ddd" _filledTrack={{
                                        bg: "tomato"
                                    }} value={90} mx="1" />
                                </Box>
                            </Center>
                        </NativeBaseProvider>
                        <View style={{ flexDirection: 'row', width: ts * 93, justifyContent: 'space-between', marginHorizontal: ts * 3, alignSelf: 'center', marginTop: ts * 2 }}>
                            <Text style={{ color: '#555', fontWeight: 'bold', fontSize: ts * 4, marginLeft: ts }}><Text style={{
                                color: 'tomato', fontWeight: 'bold', fontSize: ts * 4,
                            }}>{item.donators}</Text> Donators</Text>
                            <Text style={{ color: '#555', fontWeight: 'bold', fontSize: ts * 4, alignSelf: 'flex-end', marginRight: ts }}><Text style={{
                                color: 'tomato', fontWeight: 'bold', fontSize: ts * 4,
                            }}>9</Text> Days left</Text>
                        </View>
                    </View>

                    {/* timing */}
                    <Pressable style={{ justifyContent: 'center', marginLeft: ts * 2.5, marginTop: ts * 2 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: 'tomato', padding: 6, }}>

                            <Ionicons style={{ padding: 5, backgroundColor: 'tomato', borderRadius: ts * 2 }} name="calendar" color={'#fff'} size={ts * 6} />
                            <View style={{ marginLeft: ts * 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 4, color: '#333' }}>{item.start_date + ' TO ' + item.end_date}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 3.2, color: '#555' }}>10:10 - 21:40</Text>


                            </View>

                        </View>

                    </Pressable>


                    <Pressable style={{ justifyContent: 'center', marginLeft: ts * 2.5, marginTop: ts * 2 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: 'tomato', padding: 6, }}>

                            <FontAwesome5 style={{ padding: 5, backgroundColor: 'tomato', borderRadius: ts * 2 }} name="donate" color={'#fff'} size={ts * 6} />
                            <View style={{ marginLeft: ts * 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 4, color: '#333' }}>Donation Goal {item.goal + ' ' + item.type}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 3.2, color: '#555' }}>10:10 - 21:40</Text>


                            </View>

                        </View>

                    </Pressable>
                    <Pressable style={{ justifyContent: 'center', marginLeft: ts * 2.5, marginTop: ts * 2 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', borderColor: 'tomato', padding: 6, }}>

                            <Feather style={{ padding: 5, backgroundColor: 'tomato', borderRadius: ts * 2 }} name="map" color={'#fff'} size={ts * 6} />
                            <View style={{ marginLeft: ts * 5 }}>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 4, color: '#333' }}>{item.location}</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: ts * 3.2, color: '#555' }}>Pin Code-712148</Text>


                            </View>

                        </View>

                    </Pressable>
                    {item.type == 'rupee' && <Pressable onPress={onOpen} style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 3, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                        <Text style={{ fontSize: ts * 5, fontWeight: 'bold', color: '#fff' }}>Donate Now</Text>
                    </Pressable>
                    }
                    <Text style={{ marginTop: ts * 3, marginLeft: ts * 5, fontSize: ts * 5, fontWeight: 'bold', color: '#555' }}>About this Donation</Text>
                    <Text style={{ marginTop: ts * 2, marginHorizontal: ts * 5, fontSize: ts * 3.8, color: '#555' }}>{item.description}</Text>
                </View>

            </ScrollView>

            {/* bottom sheet */}
            <NativeBaseProvider>
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>



                        <View style={{ height: tsh * 60, width: '100%' }}>
                            <Text style={{ alignSelf: 'center', color: '#999', fontSize: ts * 4.8, fontWeight: 'bold', marginTop: ts * 3 }}>How much you wanna to Donate</Text>
                            <View style={{ flexDirection: 'row', marginTop: ts * 5, height: ts * 37 }}>
                                <FlatList
                                    data={types}
                                    // horizontal={true}
                                    numColumns={3}
                                    // contentContainerStyle={{ flexWrap: "wrap", flexDirection: "column" }}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Pressable style={{

                                            backgroundColor: selectedIndex == index ? "tomato" : "#fff",
                                            flexDirection: 'column',
                                            // width: '30%', 
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            marginLeft: ts * 2.8, marginTop: ts * 2.8,
                                            width: ts * 28,
                                            borderWidth: 1.5,
                                            borderColor: selectedIndex == index ? "#fff" : "#ccc",

                                            borderRadius: 5,
                                            height: ts * 15
                                        }}
                                            onPress={() => {
                                                setSelectedIndex(index);
                                                setSelectedTypes(item);
                                                onChangeAmount(item)
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'novaBold', alignSelf: 'center', color: selectedIndex == index ? '#fff' : 'tomato', fontSize: ts * 5 }}>{item}</Text>



                                        </Pressable>

                                    )}
                                />



                            </View>


                            <Text style={{ alignSelf: 'center', color: '#999', fontSize: ts * 4.8, fontWeight: 'bold', marginTop: ts * 5 }}>OR</Text>

                            <View>

                                <TextInput
                                    style={{ marginHorizontal: ts * 5, backgroundColor: '#ddd', height: tsh * 7, borderRadius: ts * 5, textAlign: 'center', fontSize: ts * 4, fontFamily: 'novaBold', padding: ts * 2, marginTop: ts * 5 }}
                                    onChangeText={onChangeAmount}
                                    value={amount}
                                    placeholder="Enter amount"
                                    keyboardType="numeric"

                                />
                                {loading && <Pressable style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 5, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                                    <ActivityIndicator color={'#fff'} size={'large'} />
                                </Pressable>}
                                {!loading && <Pressable onPress={() => {
                                    setLoading(true)
                                    donate()
                                }} style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 5, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                                    <Text style={{ fontSize: ts * 5, fontWeight: 'bold', color: '#fff' }}>Continue</Text>
                                </Pressable>}
                            </View>





                        </View>






                    </Actionsheet.Content>
                </Actionsheet>
            </NativeBaseProvider>
        </View>

    )
}
export default DonationDetails