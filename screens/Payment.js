import React, { useEffect, useState } from 'react'
import { View, Text,BackHandler,Alert,Modal,ActivityIndicator,Pressable,Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
import { _storeData, _retrieveData } from '../local_storage';




const Payment = ({ navigation,route }) => {
    const [data, setdata] = React.useState({})
    const [tnx_id, setTnx_id] = React.useState(undefined)
    const [urla, setUrla] = React.useState()
    const [loading, setisLoading] = React.useState(false)
    const [loader, setLoader] = useState(false);
    const ts = Dimensions.get('window').width / 100;
    const [loaderpay, setLoaderPay] = useState(true);
    const bal=route.params.item;

    const uid = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    // console.log(route.params.item); 
    useEffect(() => {
        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {
                // getBalance(userdata.email)
                console.log(userdata)
                // setEmail(userdata.email)
                setdata(userdata)
                setTnx_id(uid());
                 
            }


        });

    }, [])


    function addbal(abalance) {
        setLoader(true);
        setLoaderPay(true);
        const bodyContent = new FormData();
        bodyContent.append("case", "update_bal");
        bodyContent.append("email", data.email);
        bodyContent.append("balance", abalance);
        bodyContent.append("tnx", tnx_id);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp == 'updated') {
                    console.log(resp)
                    // getBalance(email)
                    setLoaderPay(false);

                }

            })

    }



    useEffect(() => {

        const backAction = () => {
            Alert.alert("", "Are you sure you want to cancel this Transection ?", [
                {
                    text: "Cancel",
                    onPress: () => {
                        //console.log(route.params.m_cash);
                    },
                    style: "cancel"
                },
                { text: "YES", onPress: () => navigation.pop() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={{flex:1}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loader}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                }}
            >

                <View style={{ flex: 1, backgroundColor: '#fff', padding: ts * 2, borderRadius: ts * 2, backgroundColor: '#555', opacity: .9 }}>
                    <View style={{
                        marginTop: '50%',
                        alignSelf: 'center',
                        marginBottom: ts * 10,
                        backgroundColor: '#fff',
                        width: ts * 95,
                        borderRadius: ts * 5,
                        height: '55%',
                    }}>
                        {loaderpay == true &&
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <ActivityIndicator size={120} animating={true} color={'#63368a'} />
                            </View>

                        }
                        {loaderpay == false &&
                            <View>

                                <LottieView
                                    autoPlay
                                    loop={false}
                                    style={{
                                        width: 160,
                                        height: 160,
                                        alignSelf: 'center',
                                        backgroundColor: '#eee',
                                    }}

                                    source={require('../assets/tick.json')}
                                />
                                <Text style={{ alignSelf: 'center', fontFamily: 'poppins_medium', fontSize: ts * 5, marginTop: ts * 3,fontFamily:'novaBold' }}>Payment Sucessfull</Text>
                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: ts * 5.5, marginTop: ts * 8 }}>
                                    <Text style={{ fontFamily: 'poppins_medium', fontSize: ts * 4, width: ts * 30, color: '#333',fontFamily:'novaBold' }}>Order Id</Text>
                                    <Text numberOfLines={1} style={{ fontFamily: 'poppins_bold', fontSize: ts * 3.5, width: ts * 34,alignSelf:'flex-end',fontFamily:'novaBold' }}>{tnx_id}</Text>

                                </View>
                               

                                <Pressable style={{ alignSelf: 'center', marginTop: ts * 16, backgroundColor: '#fff', padding: ts * 2, borderRadius: ts * 2, width: ts * 50, height: ts * 12, justifyContent: 'center', borderWidth: 1.5, borderColor: 'tomato' }} onPress={() => {
                                    setLoaderPay(true);
                                    setTimeout(() => {

                                        navigation.replace('Drawer')
                                        setLoaderPay(false);
                                    }, 1000);

                                }}>
                                    <Text style={{ fontFamily: 'poppins_medium', fontSize: ts * 4, color: 'tomato', alignSelf: 'center',fontFamily:'novaBold' }}>Done</Text>
                                </Pressable>



                            </View>

                        }


                    </View>
                </View>

            </Modal>

       

        {data && tnx_id!==undefined &&bal!==undefined &&<WebView
            source={{
                uri: "https://gamerpatra.000webhostapp.com/pay/index.php?tid="+tnx_id+"&email="+data.email+"&amount="+bal+"&number="+data.mobile+"&name="+data.username+""
            }}
            // onLoadProgress={({ nativeEvent }) => {
            //     //console.log(nativeEvent);
            //     setUrla(nativeEvent.url);


            // }}
            onLoadStart={() => {setisLoading(true) }}
            onLoadEnd={() => {
                setisLoading(false)

                if (urla === "https://gamerpatra.000webhostapp.com/sucess") {
                            // console.log('sadfssd');
                            addbal(bal);
                        }
                        else if (urla === "https://gamerpatra.000webhostapp.com/failure") {

                            Alert.alert("Payment Failed", "Your payment has been failed", [
                                {
                                    text: "Retry",
                                    onPress: () => {
                                        navigation.navigate('OrderDashboard');
                                    }
                                },
                                {
                                    text: "Go to home",
                                    onPress: () => {
                                        navigation.replace('Tabs')
                                    }
                                }
                            ]);



                        }

                //console.log(url);
                // console.log('end');


            }

            }
        // onNavigationStateChange={navigationChange}
        onLoadProgress={({ nativeEvent }) => {
            //console.log(nativeEvent);
            setUrla(nativeEvent.url);


        }}
        />}
 </View>
    )

}

export default Payment;