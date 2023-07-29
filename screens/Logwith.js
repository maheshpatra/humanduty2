import React from 'react';
import { View, Text, Dimensions, Pressable, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons, Octicons, AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { _storeData, _retrieveData } from '../local_storage';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
// import { _retrieveData } from '../local_storage';

// const ts = Dimensions.get('window').width / 100;
const tsh = Dimensions.get('window').height / 100;



const ts = Dimensions.get('window').width / 100;
const Loginwith = ({ navigation, props }) => {
    const [email, setEmail] = React.useState(undefined);
    const [pass, setpss] = React.useState(undefined);
    const [spass, setspss] = React.useState(undefined);
    const [sname, setsname] = React.useState(undefined);
    const [semail, setsemail] = React.useState(undefined);
    const [sphone, setsphone] = React.useState(undefined);
    const [loading, setLoading] = React.useState(false);
    const [hide, setHide] = React.useState(true);
    const [sup, setsup] = React.useState(false);
    const [data, setdata] = React.useState();


    function Signup() {
        setLoading(true)

        if(sphone && sphone.length < 10){
            Alert.alert("", 'phone number should be 10 digit')
            setLoading(false)
            return;
        }
        else  {
            const bodyContent = new FormData();
            bodyContent.append("case", "signup");
            bodyContent.append("name", sname);
            bodyContent.append("email", semail);
            bodyContent.append("pass", spass);
            bodyContent.append("phone", sphone);
            fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
                method: "post",
                body: bodyContent,
            })
                .then((data) => data.json())
                .then((resp) => {
                    // console.log(resp)
                  if (resp !== "5" ){
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
                  else {
                        Alert.alert("", 'Email already registered !')
                        setLoading(false)
                        
                    } 

                    // const KEY = 'USER_DATA'
                    // if(resp !== 5){
                    //     
                    //     console.log(resp)
                    //     var data = new Object({ username: resp.name, email: resp.email, userid: resp.user_id, ustatus: resp.status, profile: resp.profile_path })
                    //     _storeData(KEY, data)
                    //         .then(v => {

                    //             if (v === "saved") {
                    //                 console.log(v)
                    //                 setLoading(false)
                    //                 navigation.navigate('Drawer')
                    //             }
                    //         })
                    //         .catch(err => console.log(err));

                        
                    // }
                    // else {
                    //     Alert.alert("", 'Email already registered !')
                    //     setLoading(false)
                        
                    // } 
                })
        }

    }


    function login() {
        setLoading(true)
        if (email && pass) {
            const bodyContent = new FormData();
            bodyContent.append("case", "login");
            bodyContent.append("email", email);
            bodyContent.append("password", pass);
            fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
                method: "post",
                body: bodyContent,
            })
                .then((data) => data.json())
                .then((resp) => {
                    // console.log(resp)
                    

                    if (resp!== "1") {
                        const KEY = 'USER_DATA'
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

                    } else {
                        setLoading(false)
                        Alert.alert("", 'Please Enter A valid User Id and Password')
                    }
                })
        }
        else {
            setLoading(false)
            Alert.alert("", 'Enter Your user id and password')
        }


    }



    return (

        <View style={{ flex: 1, backgroundColor: '#3b86ff' }}>
            <LinearGradient style={{ position: 'absolute', height: tsh * 120, width: '100%', }} colors={['#3b86ff', '#011342']}>

                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -55 800 200" {...props}>
                    <Path
                        fill="#e7008a"
                        fillOpacity={1}
                        d="M0,32L60,74.7C120,117,240,203,360,229.3C480,256,600,224,720,176C840,128,960,64,1080,58.7C1200,53,1320,107,1380,133.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    />
                </Svg>




            </LinearGradient>

            <Image resizeMode={'center'}
                style={{ height: ts * 40, width: ts * 40, alignSelf: 'center', marginTop: ts * 15 }}
                source={require('../assets/logo.png')}
            />
            {!sup && <ScrollView keyboardShouldPersistTaps={'handled'} style={{ marginBottom: 20 }}>
                <Text style={{ marginLeft: ts * 2.5, color: '#fff', fontWeight: 'bold', fontSize: ts * 5 }}>Enter Login Details : ~</Text>
                <TextInput
                    required
                    multiline={false}
                    activeOutlineColor={'#fff'}
                    activeUnderlineColor={'#e7008a'}
                    style={styles.input}
                    label="Enter Your User Id"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    required
                    style={styles.input}
                    label="Enter Your Password"
                    value={pass}
                    activeOutlineColor={'#fff'}
                    activeUnderlineColor={'#e7008a'}
                    secureTextEntry={hide?true:false}
                    right={<TextInput.Icon onPress={()=>{
                        if(hide){
                            setHide(false)
                        }else{
                            setHide(true)
                        }
                    }} icon={hide?'eye':'eye'}/>}
                    onChangeText={text => setpss(text)}
                />
                <Text style={{ alignSelf: 'flex-end', marginRight: ts * 2.5, color: '#e7008a', fontWeight: 'bold', fontSize: ts * 4 }}>Forgot Password ?</Text>

                <Pressable
                    onPress={() => {

                        login()
                    }}
                    style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: ts * 15, backgroundColor: '#e7008a', width: ts * 45, borderRadius: ts * 6, marginTop: ts * 5 }}>
                    {/* {!loading ? 
                    :<ActivityIndicator/>
                } */}
                    {loading ? <ActivityIndicator size="large" color="#fff" /> :
                        <Text style={{ color: '#fff', fontSize: ts * 4.5, fontFamily: 'novaBold' }}> LOG IN <AntDesign name="arrowright" size={ts * 4.5} color="#fff" /></Text>
                    }



                </Pressable>
                <Pressable
                    onPress={() => {

                        setsup(true)
                        setHide(true)
                    }}
                    style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: ts * 15, backgroundColor: 'transparent', width: ts * 45, borderRadius: ts * 6, marginTop: ts * 5 }}>
                    {/* {!loading ? 
                    :<ActivityIndicator/>
                } */}

                    <Text style={{ color: '#fff', fontSize: ts * 4.5, fontFamily: 'novaBold' }}>Sign UP </Text>




                </Pressable>

            </ScrollView>}
            {sup && <ScrollView keyboardShouldPersistTaps={'handled'} style={{ marginBottom: 20 }}>
                <Text style={{ marginLeft: ts * 2.5, color: '#fff', fontWeight: 'bold', fontSize: ts * 5 }}>Enter Login Details : ~</Text>
                <TextInput
                    required
                    multiline={false}
                    activeOutlineColor={'#fff'}
                    activeUnderlineColor={'#e7008a'}
                    style={styles.input}
                    label="Enter Your Name"
                    value={sname}
                    onChangeText={text => setsname(text)}
                />

                <TextInput
                    required
                    multiline={false}
                    activeOutlineColor={'#fff'}
                    activeUnderlineColor={'#e7008a'}
                    style={styles.input}
                    label="Enter Your Email"
                    value={semail}
                    onChangeText={text => setsemail(text)}
                />
                <TextInput
                    required
                    multiline={false}
                    keyboardType='number-pad'
                    activeOutlineColor={'#fff'}
                    activeUnderlineColor={'#e7008a'}
                    style={styles.input}
                    label="Enter Your Phone Number"
                    value={sphone}
                    onChangeText={text => setsphone(text)}
                />
                <TextInput
                    required
                    secureTextEntry={hide?true:false}
                    right={<TextInput.Icon onPress={()=>{
                        if(hide){
                            setHide(false)
                        }else{
                            setHide(true)
                        }
                    }} icon={hide?'eye':'eye'}/>}
                    activeOutlineColor={'#fff'}
                    activeUnderlineColor={'#e7008a'}
                    style={styles.input}
                    label="Enter A Password"
                    value={spass}
                    onChangeText={text => setspss(text)}
                />


                <Pressable
                    onPress={() => {

                        Signup()
                    }}
                    style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: ts * 15, backgroundColor: '#e7008a', width: ts * 45, borderRadius: ts * 6, marginTop: ts * 5 }}>
                    {/* {!loading ? 
                    :<ActivityIndicator/>
                } */}
                    {loading ? <ActivityIndicator size="large" color="#fff" /> :
                        <Text style={{ color: '#fff', fontSize: ts * 4.5, fontFamily: 'novaBold' }}> Sign Up <AntDesign name="arrowright" size={ts * 4.5} color="#fff" /></Text>
                    }



                </Pressable>
                <Pressable
                    onPress={() => {

                        setsup(false)
                        setHide(true)
                    }}
                    style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: ts * 15, backgroundColor: 'transparent', width: ts * 45, borderRadius: ts * 6, marginTop: ts * 5 }}>
                    {/* {!loading ? 
                    :<ActivityIndicator/>
                } */}

                    <Text style={{ color: '#fff', fontSize: ts * 4.5, fontFamily: 'novaBold' }}>Log IN </Text>




                </Pressable>

            </ScrollView>}

        </View>
    )




}
const styles = StyleSheet.create({
    input: {
        height: 59,
        margin: 10,
        borderWidth: 1,
        paddingVertical: 3, backgroundColor: '#fff'
        // borderRadius:10

    },
    inview: {
        height: 59,
        backgroundColor: '#fff',

    }
});

export default Loginwith