import { View, Text, StatusBar, Dimensions, Image, Modal, Linking, Alert, TextInput, StyleSheet,Pressable } from 'react-native';
import React, { useEffect } from 'react';

import LinearGradient from 'react-native-linear-gradient';

// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Button } from 'react-native-paper';
const ts = Dimensions.get('window').width / 100;
const tsh = Dimensions.get('window').height / 100;
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Login=({ navigation, props })=> {






    const [visible, setVisible] = React.useState(true);     //login button
    const [forgot, setForgot] = React.useState(false);      //forgot password
    const [loginInputView, setLoginInputView] = React.useState(false);
    const [userid, setuserid] = React.useState('');
    const [pass, setpass] = React.useState('');

    const [otp, setOtp] = React.useState(false);





        
    
    return (
        <View style={{backgroundColor:'#3b86ff'}}>
            <StatusBar backgroundColor="#3b86ff" barStyle="light-content" />



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




            {
                visible == true && <View style={{ height: tsh * 59 }}>
                    <Text style={{ color: '#000966', fontFamily: 'pop', fontSize: ts * 7.5, alignSelf: 'center' }}>Human Duty</Text>
                    <Text style={{ color: '#00ff3c', fontFamily: 'pop', fontSize: ts * 3.2, alignSelf: 'center' }}>A Social Organization</Text>
                    <Text style={{ color: '#ff00ee', fontFamily: 'pop', fontSize: ts * 4.2, textAlign: 'center', marginTop: tsh * 2, marginHorizontal: ts * 5, alignSelf: 'center', padding: ts * 2, borderRadius: ts * 3, width: '70%' }}>We are with you. You stay with someone to.</Text>

                    <Pressable
                        onPress={() => {

                        //    setLoginInputView(true)
                        navigation.navigate('Loginwith')

                        }}
                        style={{ alignSelf: 'center', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
                        <Text style={{ marginTop: ts * 9, color: '#fff', backgroundColor: '#e7008a', paddingHorizontal: ts * 10, paddingVertical: ts * 4, borderRadius: ts * 6, fontSize: ts * 4.5, fontFamily: 'novaBold' }}>Get Started <AntDesign name="arrowright" size={ts * 4.5} color="#fff" /></Text>


                    </Pressable>






                </View>
}
            {otp &&
                // oto modal
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={otp}
                    style={{
    
                        backgroundColor: 'transparent',
    
                        padding: 20
                    }}>
                    <Pressable onPress=
                        {() => {
                            setVisible(false);
                            setLoginInputView(false);
                            setForgot(true);
                            setOtp(false);
                        }}
    
                        style={{ marginTop: ts * 5, marginLeft: ts * 5 }}>
                        <AntDesign name="arrowleft" size={ts * 7} color="#fff" />
                    </Pressable>
    
                    <View style={{ marginTop: ts * 5, marginHorizontal: ts * 5, backgroundColor: '#fff', borderRadius: ts * 4, padding: ts * 5, marginTop: ts * 60.5 }}>
                        <Text style={{ color: '#999', fontFamily: 'novaBold', fontSize: ts * 4, width: '80%', }}>Please Check Your email id & enter The OTP</Text>
    
    
                        <TextInput label="OTP" outlineColor="#eee" style={{ color: '#fff', marginBottom: 10, backgroundColor: 'transparent' }} right={<TextInput.Icon size={ts * 6} color={'#ccc'} name="eye" />} />
    
    
                        <Pressable
                            style={{ alignSelf: 'center', justifyContent: 'center', }}
                            onPress={() => {
                                setVisible(false);
                                setLoginInputView(false);
                                setForgot(false);
                                setOtp(true);
                            }}>
                            <Text style={{ marginTop: ts * 3, color: '#fff', backgroundColor: '#ff00ee', paddingHorizontal: ts * 10, paddingVertical: ts * 3, borderRadius: ts * 4, fontSize: ts * 3.8, fontFamily: 'novaBold' }}>Submit</Text>
    
                        </Pressable>
    
                    </View>
    
    
    
                </Modal>
    
    
    
        }
    
       
               {forgot && <Modal
                    animationType="fade"
                    transparent={true}
                    visible={forgot}
                    style={{
    
                        backgroundColor: 'transparent',
    
                        padding: 20
                    }}>
                    <Pressable onPress=
                        {() => {
                            setVisible(false);
                            setLoginInputView(true);
                            setForgot(false);
                        }}
    
                        style={{ marginTop: ts * 5, marginLeft: ts * 5 }}>
                        <AntDesign name="arrowleft" size={ts * 7} color="#fff" />
                    </Pressable>
    
    
                    <View style={{ marginTop: ts * 5, marginHorizontal: ts * 5, backgroundColor: '#fff', borderRadius: ts * 4, padding: ts * 5, marginTop: '60%' }}>
                        <Text style={{ color: '#999', fontFamily: 'novaBold', fontSize: ts * 4, width: '80%', }}>Enter Your Email Id</Text>
    
    
                        <TextInput label="Email" outlineColor="#eee" activeOutlineColor="#fff" style={{ color: '#fff', marginBottom: 10, backgroundColor: 'transparent' }} right={<TextInput.Icon size={ts * 6} color={'#ccc'} name="email" />} />
    
    
                        <Pressable
                            style={{ alignSelf: 'center', justifyContent: 'center', }}
                            onPress={() => {
                                setVisible(false);
                                setLoginInputView(false);
                                setForgot(false);
                                setOtp(true);
                            }}>
                            <Text style={{ marginTop: ts * 3, color: '#fff', backgroundColor: '#ff00ee', paddingHorizontal: ts * 10, paddingVertical: ts * 3, borderRadius: ts * 4, fontSize: ts * 3.8, fontFamily: 'novaBold' }}>Send OTP</Text>
    
                        </Pressable>
    
                    </View>
    
    
    
                </Modal>}
            
      
               {loginInputView && <Modal
                    animationType="fade"
                    transparent={false}
                    visible={loginInputView}
                    style={{
    
                        backgroundColor: 'transparent',
    
                        padding: 20
                    }}>
                    <Pressable onPress={() => {
                        setVisible(true);
                        setLoginInputView(false);
                        setForgot(false);
                    }} style={{ marginTop: ts * 5, marginLeft: ts * 5 }}>
                        <AntDesign name="arrowleft" size={ts * 7} color="#000" />
                    </Pressable>
    
                    <View style={{ marginTop: ts * 5, marginHorizontal: ts * 5, borderRadius: ts * 4, padding: ts * 5, marginTop: '55%', backgroundColor: '#ccc' }}>
    
    
    
                        <TextInput
                            style={styles.input}
                            onChange={text => setuserid(text)}
                            value={userid}
                            placeholder="Enter Your user id"
                        />
                        <TextInput
                            style={styles.input}
                            onChange={text => setpass(text)}
                            value={pass}
                            placeholder="Enter Your Password"
                        />
    
                        <Text onPress={() => {
                            setVisible(false);
                            setLoginInputView(false);
                            setForgot(true);
                        }} style={{ alignSelf: 'flex-end', color: 'tomato', fontFamily: 'novaBold', fontSize: ts * 4, paddingVertical: ts * 2 }}> Forgot Password ?</Text>
    
    
                        <Pressable
                            style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: '#ff00ee', borderRadius: ts * 4, }}
                            >
                            <Text style={{ color: '#fff', backgroundColor: '#ff00ee', paddingHorizontal: ts * 10, paddingVertical: ts * 3, borderRadius: ts * 4, fontSize: ts * 3.8, fontFamily: 'novaBold' }}>Log In</Text>
    
                        </Pressable>
    
    
                    </View>
    
    
                </Modal>}










        </View>


    )






}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
export default Login
