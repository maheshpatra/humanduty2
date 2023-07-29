import React, { useEffect, useState } from "react";
import { Appbar, Title } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, StatusBar, ScrollView, Alert, Pressable, TextInput, ActivityIndicator } from "react-native";
import { _retrieveData, } from "../local_storage";
import LottieView from 'lottie-react-native';
import { Button, Actionsheet, useDisclose, Icon, Box, Center, NativeBaseProvider, Progress } from "native-base";
import { Entypo, AntDesign, MaterialIcons, Feather, MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
// import DrawerNav from '../components/Drawer';

const ts = Dimensions.get('window').width / 100;
const th = Dimensions.get('window').height / 100;
const tsh = Dimensions.get('window').height / 100;
const Settings = ({ navigation, routes }) => {
    const [isEnabled, setisenabled] = React.useState(false);
    const [profile_image, setProfile_image] = React.useState();
    const [liveText, setTextLive] = React.useState('Offline');
    const [active, setActive] = React.useState('');
    const [password, setPassword] = React.useState(null);
    const [npass, setNpass] = React.useState(null);
    const [sdata, setSdata] = React.useState(null);
    const [changesucess, setChangesucess] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [userid, setuserid] = React.useState(null);
    const [image, setImage] = useState(null);
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const toggle = () => {
        setisenabled(previousState => !previousState);
        setTextLive(liveText === "Offline" ? "Online" : "Offline")
    }


    useEffect(() => {
        _retrieveData("USER_DATA").then((userdata) => {
            console.log(userdata);
            if (userdata !== 'error') {
                // getBalance(userdata.email)
                getuserdata(userdata.userid)
                setuserid(userdata.userid)
                // setData(userdata)
            }


        });

    }, [])

    // function upload_profile_image() {
    //     //open gallery/camera
    //     Alert.alert(
    //         "",
    //         "Choose source",
    //         [
    //             {
    //                 text: "Gallery",
    //                 onPress: async () => {
    //                     let result = await ImagePicker.launchImageLibraryAsync({
    //                         mediaTypes: ["png", "jpg", "jpeg"],
    //                         allowsEditing: true,
    //                         aspect: [1, 1],
    //                         quality: 1,
    //                     });

    //                     if (!result.cancelled) {
    //                         setProfile_image(result.uri);
    //                         //upload photo


    //                                 const name = result.uri.split("/").pop();
    //                                 const type = "image/" + result.uri.split(".").pop();
    //                                 const uri = result.uri;
    //                                 const fd = new FormData();
    //                                 fd.append("id", data.user_id );
    //                                 fd.append("email", data.email);
    //                                 fd.append("fileToUpload", { uri: uri, name: name, type });

    //                                 fetch("https://gamerpatra.000webhostapp.com/appapi/upload_profile_image.php", {
    //                                     method: "POST",
    //                                     body: fd,
    //                                 })
    //                                     .then((response) => response.text())
    //                                     .then((responseJson) => {
    //                                         // fetch_user();
    //                                        // console.log("response: ", responseJson);
    //                                         // setProfile_image(responseJson + "?date=" + new Date());
    //                                         // navigation.navigate('ProfileDetails');
    //                                     })
    //                                     .catch((error) => {
    //                                         console.log(error);
    //                                     })
    //                                     .finally(() => {
    //                                         //    setProfile_image();
    //                                     });


    //                     }
    //                 },
    //             },



    //             {
    //                 text: "Cancel",
    //                 onPress: () => { },
    //                 // style: 'cancel',
    //             },
    //         ],
    //         { cancelable: false }
    //     );
    // }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 3,
        });

        console.log(result.assets[0]);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log(result.assets[0].uri)
            const name = result.assets[0].uri.split("/").pop();
            const type = "image/" + result.assets[0].uri.split(".").pop();
            const uri = result.assets[0].uri;
            // setProfilepic(userid, result.assets[0].uri)
            const bodyContent = new FormData();
            bodyContent.append("case", "profile_pick");
            bodyContent.append("userid", userid);
            bodyContent.append("fileToUpload", { uri: uri, name: name, type });

            fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
                method: "post",
                body: bodyContent,
            })
                .then((data) => data.json())
                .then((resp) => {

                    console.log(resp)
                    setData(resp)
                    if (resp !== 0){
                        setLoading(false)
                        const KEY = 'USER_DATA'
                        // console.log(resp)
                            var data = new Object({ username: resp.name, email: resp.email, userid: resp.user_id, ustatus: resp.status, profile: resp.profile_path,mobile:resp.user_number })
                            _storeData(KEY, data)
                                .then(v => {
    
                                    if (v === "saved") {
                                        console.log(v)
                                        setLoading(false)
                                        navigation.replace('Drawer')
                                    }
                                })
                                .catch(err => console.log(err));
    
                      }
                    // setisenabled(false)


                })
        }
    };

    function setProfilepic(uid, img) {
        console(uid)


    }





    function getuserdata(userid) {
        setisenabled(true)
        const bodyContent = new FormData();
        bodyContent.append("case", "get_status");
        bodyContent.append("userId", userid);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    console.log(resp)
                    setData(resp)
                    setisenabled(false)
                }

            })
    }

    function changepass(email) {
        if (!password) {
            Alert.alert('', 'Please enter your Password !')
            return
        }
        else if (!npass) {

            Alert.alert('', 'Please enter A Password !')
            return;

        } else if (npass == password) {

            Alert.alert('', 'You have enter same password !')
            return;

        }
        else {
            setisenabled(true)
            const bodyContent = new FormData();
            bodyContent.append("case", "change_pass");
            bodyContent.append("email", email);
            bodyContent.append("password", password);
            bodyContent.append("n_pass", npass);

            fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
                method: "post",
                body: bodyContent,
            })
                .then((data) => data.json())
                .then((resp) => {
                    if (resp !== 1) {
                        console.log(resp)
                        setData(resp)
                        setChangesucess(true)
                        setisenabled(false)
                        getuserdata(userid);
                    }

                })
        }

    }

    const handelsettings = (settings) => {
        onOpen()
        setSdata(settings);

    }




    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ height: ts * 18, backgroundColor: '#fff', paddingTop: ts, }}>
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
            {!isEnabled ?
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    {/* <StatusBar backgroundColor="#e7008a" barStyle="light-content" /> */}
                    {data && <View>
                        <View style={{ flexDirection: 'row', marginTop: ts * 3, alignSelf: 'center' }}>

                            <View style={{ flexDirection: 'column', width: ts * 50, }}>
                                <TouchableOpacity onPress={pickImage}>
                                    {data.profile_path !== 'null' ? <Image
                                        style={{ height: ts * 24, width: ts * 24, alignSelf: 'center', borderRadius: ts * 30, borderWidth: 4, borderColor: '#f2a399' }}
                                        source={{
                                            uri: data.profile_path,
                                        }}
                                    /> : <Image
                                        style={{ height: ts * 24, width: ts * 24, alignSelf: 'center', borderRadius: ts * 30, borderWidth: 4, borderColor: '#f2a399' }}
                                        source={require('../assets/logo.png')}
                                    />}
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'novaBold', fontSize: ts * 5, color: '#333', alignSelf: 'center' }}>{data.name}</Text>
                                <Text style={{ fontFamily: 'novaBold', fontSize: ts * 3, marginTop: ts * 0.25, color: '#999', alignSelf: 'center' }}>{data.email}</Text>
                                <View style={{ height: ts * 10, backgroundColor: 'tomato', flexDirection: 'row', borderRadius: ts * 5, justifyContent: 'center', marginLeft: ts * 2.5, alignSelf: 'center', marginTop: ts * 2, alignItems: 'center', paddingHorizontal: ts * 4 }}>
                                    <Text style={{ fontFamily: 'novaBold', alignSelf: 'center', color: '#fff' }}>Edit Profile</Text>

                                    <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#fff" style={{ marginLeft: ts * 2 }} />

                                </View>

                            </View>




                        </View>
                        <View style={{ backgroundColor: '#eee', height: ts * 8, marginTop: ts * 2.5, marginHorizontal: ts * 5, justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.2, color: '#999' }}>PERSONAL</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            handelsettings('password')
                        }} style={styles.itemback}>
                            <Feather name="lock" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.6, color: '#555' }}>Password</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={{ position: 'absolute', right: ts * 5 }} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'Feature Comming Soon !')
                        }} style={styles.itemback}>
                            <Feather name="globe" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.6, color: '#555' }}>Language</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={{ position: 'absolute', right: ts * 5 }} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'Feature Comming Soon !')
                        }} style={styles.itemback}>
                            <MaterialCommunityIcons name="wallet-outline" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.6, color: '#555' }}>Payment</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={{ position: 'absolute', right: ts * 5 }} />

                        </TouchableOpacity>




                        {/* prefarence */}
                        <View style={{ backgroundColor: '#eee', height: ts * 8, marginTop: ts * 2.5, marginHorizontal: ts * 5, justifyContent: 'center', borderRadius: 5 }}>
                            <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.2, color: '#999' }}>PREFARENCE</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'Feature Comming Soon !')
                        }} style={styles.itemback}>
                            <Feather name="moon" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={styles.maintext}>Night Mode</Text>
                            <View style={{ position: 'absolute', right: ts * 5 }} >

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'Feature Comming Soon !')
                        }} style={styles.itemback}>
                            <MaterialIcons name="notifications-none" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={styles.maintext}>Notifications</Text>
                            <View style={{ position: 'absolute', right: ts * 5 }} >

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'Feature Comming Soon !')
                        }} style={styles.itemback}>
                            <MaterialCommunityIcons name="wallet-outline" size={ts * 7} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={styles.maintext}>Payment</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'App already Upto date .')
                        }} style={{ backgroundColor: '#fff', height: ts * 13, marginHorizontal: ts * 5, alignItems: 'center', flexDirection: 'row', }}>
                            <MaterialIcons name="system-update" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={styles.maintext}>Check for Update</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('', 'Feature Comming Soon !')
                        }} style={styles.itemback}>
                            <Feather name="headphones" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={styles.maintext}>Help & Support</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('Slogan', 'We are with you . You stay with someone too ! ')
                        }} style={styles.itemback}>
                            <AntDesign name="questioncircleo" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                            <Text style={styles.maintext}>About</Text>
                            <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

                        </TouchableOpacity>
                    </View>}








                </View> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: th * 90 }}><Text>Loading...</Text></View>
            }
            <NativeBaseProvider>
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>




                        {sdata == 'password' && <View style={{ height: tsh * 50, width: '100%' }}>
                            {changesucess && <View style={{ justifyContent: 'center', height: tsh * 27, alignItems: 'center' }}>


                                <LottieView
                                    autoPlay
                                    loop
                                    style={{
                                        width: 120,
                                        height: 120,

                                    }}
                                    // Find more Lottie files at https://lottiefiles.com/featured
                                    source={require('../assets/tick.json')}
                                />



                            </View>}
                            {!changesucess && <View>

                                <TextInput
                                    style={{ marginHorizontal: ts * 5, backgroundColor: '#ddd', height: tsh * 7, borderRadius: ts * 5, textAlign: 'center', fontSize: ts * 4, fontFamily: 'novaBold', padding: ts * 2, marginTop: ts * 5 }}
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    secureTextEntry
                                    placeholder="Enter Your Old Password !"


                                />
                                <TextInput
                                    style={{ marginHorizontal: ts * 5, backgroundColor: '#ddd', height: tsh * 7, borderRadius: ts * 5, textAlign: 'center', fontSize: ts * 4, fontFamily: 'novaBold', padding: ts * 2, marginTop: ts * 5 }}
                                    onChangeText={(text) => setNpass(text)}
                                    value={npass}
                                    secureTextEntry
                                    placeholder="Enter A New Password !"


                                />
                            </View>}




                            <View>



                                {changesucess ?
                                    <Pressable onPress={() => {
                                        onClose()
                                        setChangesucess(false)
                                        setPassword(null)
                                        setNpass(null)

                                    }} style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 5, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                                        <Text style={{ fontSize: ts * 5, fontWeight: 'bold', color: '#fff' }}>Done</Text>
                                    </Pressable> :

                                    !isEnabled ?
                                        <Pressable onPress={() => {
                                            changepass(data.email)

                                        }} style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 5, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                                            <Text style={{ fontSize: ts * 5, fontWeight: 'bold', color: '#fff' }}>Done</Text>
                                        </Pressable> :
                                        <Pressable style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 5, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                                            <ActivityIndicator color={'#fff'} size={'large'} />
                                        </Pressable>

                                }

                            </View>





                        </View>}






                    </Actionsheet.Content>
                </Actionsheet>
            </NativeBaseProvider>
        </ScrollView>

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

    },
    itemback: {
        backgroundColor: '#fff', height: ts * 13, marginHorizontal: ts * 5, alignItems: 'center', flexDirection: 'row'
    },
    maintext: {
        marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 4, color: '#555'
    },
    iconstyle: {
        position: 'absolute', right: ts * 5

    }
})
export default Settings