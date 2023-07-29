import React, { useEffect, useState } from "react";
import { Appbar, Modal, Title } from 'react-native-paper';
import { StyleSheet, View, Dimensions, Switch, TouchableOpacity, StatusBar, ScrollView, Pressable, SafeAreaView, FlatList, Text, Image, Alert, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons, Entypo, Feather, MaterialIcons, Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { DrawerActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';


// import { NavigationContainer } from "@react-navigation/native";
import Card from "../assets/component/Card";
import AnimatedSplash from "react-native-animated-splash-screen";
import { NativeBaseProvider, Input, Icon } from "native-base";
import { Ccrd } from "./abc";
import { _retrieveData } from "../local_storage";
import { BlogCard } from '../assets/component/BlogCard'


// import DrawerNav from '../components/Drawer';
const Donations = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];


const ts = Dimensions.get('window').width / 100;
const Home = ({ navigation, routes }) => {

    const [lang, setLang] = React.useState([{ title: 'food', icon: 'ios-fast-food' }, { title: 'Education', icon: 'book' }, { title: 'Water', icon: 'ios-water-sharp' }, { title: 'Home', icon: 'home' }, { title: 'Medical', icon: 'md-medkit' }, { title: 'More', icon: 'md-apps' }]);
    const [isEnabled, setisenabled] = React.useState(false);
    const [isloading, setIsloading] = React.useState(false);
    const [lupdate, setLupdate] = React.useState(false);
    const [liveText, setTextLive] = React.useState('Offline');
    const [activity, setActivity] = React.useState([]);
    const [project, setProject] = React.useState([]);
    const [sp, setsp] = React.useState(undefined);
    const [message, setMessage] = React.useState('');
    const [name, setName] = React.useState(null);
    const [weather, setWeather] = React.useState(null);
    const [loc, setLoc] = React.useState(null);
    const [aprofile, setProfile] = useState(null)
    const [blog, setBlog] = useState([])

    useEffect(() => {
        setIsloading(true);
        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {
                getStatus(userdata.userid)
            }
            good()
            get_activity()
            get_project()
            get_blog()

        });
    }, [])
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLoc(location)
            getWeather(location)
        })();
    }, []);


    const mont = new Object({
        "aop": "224",
        "description": "Please contribute for our Monthily Donation .",
        "donators": "67",
        "end_date": "null",
        "goal": "4000",
        "id": "3",
        "location": "null",
        "name": "Monthly Donation",
        "raised": "0",
        "src": "gallery6.jpg",
        "start_date": "null",
        "type": "rupee"
    })



    async function getWeather(location) {
        setLupdate(true)
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        console.log(location);
        const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + lat + ',' + lon;
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': 'c6fdd28c95msh368b43cb3d2f880p12e35cjsn49b65a7c80c2',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setWeather(result);
            setLupdate(false);
        } catch (error) {
            console.error(error);
            setLupdate(false);
        }
    }

    function good() {
        var today = new Date()
        var curHr = today.getHours()

        if (curHr < 12) {
            setMessage('Good Morning !')

        } else if (curHr < 18) {
            setMessage('Good Afternoon !')

        } else {
            setMessage('Good Evening !')

        }
    }

    function getStatus(id) {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_status");
        bodyContent.append("userId", id);
        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                const a = JSON.stringify(resp.status)

                setProfile(resp.profile_path)
                setName(resp.name)
                // console.log(JSON.stringify(resp.status))

                //   console.log(resp)
            })

    }
    function get_project() {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_project");

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    // console.log(resp)
                    setProject(resp)
                    setsp(resp[2])
                    setIsloading(false)
                }
                // console.log(JSON.stringify(resp.status))

                //   console.log(resp)
            })

    }
    function get_blog() {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_blog");

        fetch("http://192.168.43.37/human/humanduty/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    console.log(resp)
                    setBlog(resp)


                }
                // console.log(JSON.stringify(resp.status))

                //   console.log(resp)
            })

    }
    function get_activity() {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_activity");

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    // console.log(resp)
                    setActivity(resp)
                }
                // console.log(JSON.stringify(resp.status))

                //   console.log(resp)
            })

    }

    const toggle = () => {
        setisenabled(previousState => !previousState);
        setTextLive(liveText === "Offline" ? "Online" : "Offline")
    }

    if (isloading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />

                <LottieView
                    autoPlay
                    loop
                    style={{
                        width: 250,
                        height: 250,

                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../assets/eid.json')}
                />
            </View>)
    } else {
        return (

            <View style={{ flex: 1, backgroundColor: '#fff' }}>


                <StatusBar backgroundColor="#fff" barStyle="dark-content" />

                <View style={{ padding: 5, alignItems: 'center', height: 63 }}>


                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: ts * 5, }}>
                        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 2.5, }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 3, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                {aprofile && <Image
                                    style={{ height: ts * 10, width: ts * 9.5, borderRadius: ts * 2, borderWidth: 2, borderColor: 'tomato' }}
                                    source={{
                                        uri: aprofile !== 'null' ? aprofile : 'https://picsum.photos/id/237/200/200'
                                    }}

                                />}
                            </View>
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', left: ts * 18 }}>
                            <Text style={{ fontSize: ts * 5.4, fontWeight: 'bold', color: 'tomato' }}>{'Hii ' + name}</Text>
                            <Text style={{ fontSize: ts * 3.5 }}>{message}</Text>
                        </View>


                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 2.5, }} onPress={() => navigation.navigate("Notifications")}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{ padding: 5, alignItems: 'center', }}>




                        <NativeBaseProvider >
                            <Input onChangeText={(text) => { }} placeholder="Search People & Places" width="95%" borderRadius="17" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} />

                        </NativeBaseProvider>
                    </View>


                    <View style={{ elevation: 5, backgroundColor: '#ede4e1', borderRadius: ts * 4, marginHorizontal: ts * 5, marginTop: ts * 3, height: ts * 40, alignItems: 'center', justifyContent: 'center', }}>

                        {/* appointment body */}
                        <View style={{ borderTopLeftRadius: ts * 4, borderTopRightRadius: ts * 4, flexDirection: 'row' }}>


                            <View>

                                <Image
                                    style={{ height: ts * 39, width: ts * 90, borderRadius: ts * 5, alignSelf: 'center', opacity: .3 }}
                                    source={{
                                        uri: 'https://picsum.photos/400',
                                    }}
                                />
                            </View>
                            <Image
                                style={{ position: 'absolute', tintColor: 'tomato', height: ts * 22, width: ts * 20, borderRadius: ts * 5, alignSelf: 'center', left: ts * 8 }}
                                source={require('../assets/logo.png')}
                            />
                            <Entypo name="info" size={ts * 4} color="#63368a" style={{ alignSelf: 'center', position: 'absolute', right: ts * 4, top: ts * 4 }} />

                        </View>
                        <View style={{ alignContent: 'center', justifyContent: 'flex-end', width: ts * 65, marginLeft: ts, position: 'absolute', top: ts * 8, flexDirection: 'row' }}>

                            <Text style={{ width: ts * 40, fontSize: ts * 5, fontWeight: 'bold' }} numberOfLines={3}>Help is our main goal </Text>


                        </View>
                        <Pressable
                            style={{ alignSelf: 'flex-end', marginRight: ts * 8, backgroundColor: 'tomato', height: ts * 10, width: ts * 30, borderRadius: ts * 4, justifyContent: 'center', elevation: 5, borderWidth: 2, borderColor: '#fff', marginTop: -ts, position: 'absolute', bottom: ts * 5, right: -8 }}
                            onPress={() => navigation.navigate("DonationDetails", { item: mont })}>
                            <Text style={{ alignSelf: 'center', color: '#fff', fontFamily: 'novaBold' }}>Donate Now</Text>
                        </Pressable>



                    </View>
                    <View style={{ height: '100%', backgroundColor: '#fff', marginTop: 15, borderTopLeftRadius: ts * 8, borderTopRightRadius: ts * 8, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: ts * 6, marginTop: ts * 5, alignItems: 'center' }}>
                            <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold' }}>Cause</Text>
                            <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold' }}>see all</Text>

                        </View>
                        <View style={{ marginTop: ts * 3 }}>
                            {/* tell me a joke  
                                    
                            */}
                            <FlatList
                                data={lang}
                                horizontal={true}
                                keyExtractor={(item, index) => index.toString()}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <Pressable onPress={() => {
                                        Alert.alert('', 'contents are comming soon !')
                                    }} style={{
                                        justifyContent: 'center',
                                        width: ts * 19,
                                        height: ts * 19,
                                        backgroundColor: "#fff",
                                        // padding: ts * 4,
                                        borderWidth: 1.5,
                                        borderColor: "#ccc",
                                        marginLeft: ts * 5,
                                        borderRadius: 25,
                                        alignItems: 'center'
                                    }}

                                    >
                                        <Ionicons name={item.icon} size={ts * 7} color="tomato" />

                                        <Text style={{
                                            // padding: ts * 3,
                                            // alignSelf: 'center',
                                            textAlign: 'center',
                                            color: "#333",
                                            fontSize: ts * 2.7,
                                            fontFamily: 'novaBold',
                                            // width: '80%',
                                            letterSpacing: .5,
                                        }}>{item.title}</Text>

                                    </Pressable>

                                )}
                            />





                        </View>




                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: ts * 6, marginTop: ts * 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold' }}>Activitys</Text>
                            <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold' }}>see all</Text>

                        </View>
                        <View style={{ marginTop: ts * 3 }}>
                            <FlatList
                                data={activity}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View style={{ paddingLeft: 10, paddingRight: 2 }}>
                                        <NativeBaseProvider>
                                            <Card item={item} navigation={navigation} />
                                        </NativeBaseProvider>
                                    </View>

                                )}
                            />





                        </View>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: ts * 6, marginTop: ts * 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold' }}>Projects</Text>
                            <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold' }}>see all</Text>

                        </View>
                        <View style={{ marginTop: ts * 2 }}>
                            <FlatList
                                data={project}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <Pressable style={{
                                        justifyContent: 'center',
                                        width: ts * 75,
                                        height: ts * 45,
                                        backgroundColor: "#fff",
                                        borderWidth: 1.5,
                                        borderColor: "#ccc",
                                        marginLeft: ts * 5,
                                        borderRadius: 15,
                                        alignItems: 'center'
                                    }}

                                    >


                                        <Image style={{ height: '100%', width: '100%', borderRadius: ts * 4, alignSelf: 'center', opacity: .7 }}
                                            source={{
                                                uri: 'https://gamerpatra.000webhostapp.com/' + item.data,
                                            }} />
                                        <Text style={{
                                            // padding: ts * 3,
                                            // alignSelf: 'center',
                                            textAlign: 'center',
                                            color: "#333",
                                            position: 'absolute',
                                            fontSize: ts * 4,
                                            fontFamily: 'novaBold', bottom: 10,
                                            // width: '80%',
                                            letterSpacing: .5,
                                        }}>{item.projects_name}</Text>


                                    </Pressable>

                                )}
                            />

                            {weather &&
                                <View>
                                    <Text style={{ fontSize: ts * 4, fontFamily: 'novaBold', marginTop: ts * 5, marginLeft: ts * 5 }}>TODAY'S Weather</Text><ImageBackground style={{ backgroundColor: '#fff', height: ts * 50, width: ts * 92, alignSelf: 'center', marginTop: 10, borderRadius: 10, marginBottom: 5 }}>
                                        <View style={{ height: 40, width: ts * 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: ts * 3.5, borderRadius: 10, padding: 5, borderWidth: 1, marginTop: ts * 3.5, borderColor: 'tomato', backgroundColor: '#fff' }}>
                                            <Ionicons name={'location'} size={ts * 5} color="tomato" />
                                            <Text style={{ fontFamily: 'poppins' }} numberOfLines={1}>{weather.location.name + ' /' + weather.location.region}</Text>

                                        </View>
                                        {!lupdate ? <Ionicons onPress={() => getWeather(loc)} name={'reload'} size={ts * 6} color="tomato" style={{ position: 'absolute', top: ts * 3.5, right: ts * 2.5 }} />
                                            : <Ionicons name={'reload'} size={ts * 6} color="tomato" style={{ transform: [{ rotate: '180deg' }], position: 'absolute', top: ts * 3.5, right: ts * 2.5 }} />
                                        }
                                        {/* <Ionicons name={'reload'} size={ts * 6} color="tomato" style={{transform: [{ rotate: '180deg' }],position:'absolute',top:ts*3.5,right:ts*2.5}} /> */}
                                        <View style={{ flexDirection: 'row', marginLeft: ts * 5, marginTop: ts * 3 }}>
                                            <Ionicons name={'md-partly-sunny-sharp'} size={ts * 14} color="tomato" />
                                            <Text style={{ fontFamily: 'novaBold', fontSize: ts * 14, marginLeft: 5 }}>{weather.current.feelslike_c}</Text>
                                            <Text style={{ fontFamily: 'novaBold', fontSize: ts * 9 }}>{'° C'}</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', right: ts * 5 }}>
                                                <Ionicons name={'cloud'} size={ts * 4} color="tomato" />
                                                <Text style={{ fontFamily: 'novaBold', fontSize: ts * 3 }}>{"Cloud " + weather.current.cloud + '%'}</Text>

                                            </View>



                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: ts * 5 }}>
                                                <Ionicons name={'rainy-sharp'} size={ts * 4} color="tomato" />
                                                <Text style={{ fontFamily: 'novaBold', fontSize: ts * 3 }}>{"Humidity " + weather.current.humidity + "%"}</Text>

                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: ts * 5 }}>
                                                <FontAwesome5 name={'wind'} size={ts * 4} color="tomato" />
                                                <Text style={{ fontFamily: 'novaBold', fontSize: ts * 3 }}>{"Wind " + weather.current.gust_kph + "kph"}</Text>

                                            </View>


                                        </View>
                                        <Text style={{ fontFamily: 'novaBold', fontSize: ts * 2, position: 'absolute', top: 0, right: 0, backgroundColor: 'tomato', color: '#fff', paddingHorizontal: 5, paddingBottom: 1, borderBottomLeftRadius: 5, borderTopRightRadius: 20 }}>{'Last updated on: ' + weather.current.last_updated}</Text>


                                    </ImageBackground>
                                </View>}


                            <View style={{ marginTop: ts * 8 }}>
                                <NativeBaseProvider>
                                    {sp && <Ccrd item={sp} />}
                                </NativeBaseProvider>

                            </View>
                            <FlatList
                                data={blog}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                   
                                        <BlogCard item={item} />
                                   



                                )}
                            />











                        </View>



                    </View>









                </ScrollView>



            </View>



        )

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    background: {
        backgroundColor: '#63368a',
        height: ts * 53,
        // borderBottomRightRadius: ts * 4,
        // borderBottomLeftRadius: ts * 4,

    }
})
export default Home;