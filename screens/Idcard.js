import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Switch, TouchableOpacity, StatusBar, ScrollView, Pressable, SafeAreaView, FlatList, Text, Image } from "react-native";
const ts = Dimensions.get('window').width / 100;
const td = Dimensions.get('window').height / 100;
import { Ionicons, Fontisto, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import Idbg from '../assets/component/Idbg';
import { Divider } from 'react-native-paper';
import { _retrieveData } from "../local_storage";
import QRCode from 'react-native-qrcode-svg';
import Barcode from "@kichiyaki/react-native-barcode-generator";


const Idcard = ({ navigation }) => {
    const [data, setdata] = React.useState(null);

    useEffect(() => {
        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {
                getid(userdata.email)
            }


        });

    }, [])




    function getid(email) {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_idcard");
        bodyContent.append("email", email);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    console.log(resp)
                    setdata(resp)

                }

            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <StatusBar backgroundColor="#fff" barStyle="dark-content" />


            <ScrollView
            >








                {data &&<View style={{ elevation: 5, backgroundColor: '#ede4e1', borderRadius: ts * 4, marginHorizontal: ts * 5, marginTop: ts * 3, height: ts * 150, borderRadius: 3 }}>

                    {/* appointment body */}
                    <View style={{
                        backgroundColor: '#004691',
                        height: ts * 40,
                        borderBottomWidth: ts * 6,
                        borderBottomRightRadius: ts * 25,
                        borderRightWidth: ts * 6,
                        borderColor: 'tomato',
                        borderTopLeftRadius: ts * 2,
                        borderTopRightRadius: ts * 2,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingTop: ts * 8,
                    }}>
                        <View style={{position:'absolute',left:ts*5,top:ts*5.5}}>
                            <Image
                                style={{ tintColor: 'tomato', height: ts * 18, width: ts * 18, borderRadius: ts * 5,   }}
                                source={require('../assets/logo.png')}
                            />
                        </View>
                        <View style={{ marginLeft: ts * 5 }}>
                            <Text style={{ alignSelf: 'center', fontSize: ts * 5, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Human Duty</Text>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#eee', textAlign: 'center', fontSize: ts * 2.5 }}>A Social Organazation</Text>
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ccc', textAlign: 'center', fontSize: ts * 2.5 }}>Estd: 2019</Text>


                        </View>


                    </View>
                    <Image

                        style={{ height: ts * 29, width: ts * 29, alignSelf: 'center', borderRadius: ts * 30, marginTop: -ts * 15, borderWidth: 6, borderColor: '#ede4e1', }}
                        source={{
                            uri: 'https://gamerpatra.000webhostapp.com/' + data.image,
                        }}
                    />

                    <Text style={{ alignSelf: 'center', fontSize: ts * 5.5, fontWeight: 'bold', color: 'tomato' }}>{data.name}</Text>
                    <Text style={{ alignSelf: 'center', fontSize: ts * 3.2, fontWeight: 'bold', color: '#555' }}>{data.grade} of Human Duty</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: ts * 5 }}>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Registration No :</Text>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3 }}>{data.id_no}</Text>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3, width: '40%' }}>Email :</Text>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3, }}>{data.email}</Text>


                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Blood Group :</Text>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3 }}>{data.exp_date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>D.O.B:</Text>
                        <Text numberOfLines={2} style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3, }}>{data.dob}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Address:</Text>
                        <Text numberOfLines={2} style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3, }}>{data.address}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Helpline no:</Text>
                        <Text numberOfLines={2} style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3, }}>{'+91 ' + data.phone}</Text>
                    </View>




                    <View style={{ position: 'absolute', backgroundColor: '#004691', height: ts * 15, width: '100%', bottom: 0, borderTopWidth: 8, borderColor: 'tomato', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>

                        <View style={{ height: ts * 17, width: ts * 80, backgroundColor: '#fff', alignSelf: 'center', marginTop: -38, borderRadius: 5, justifyContent: 'center' }}>
                       {data.id_no && <Barcode height={ts*14} value={data.id_no} format="CODE128" />}

                        </View>


                    </View>


                </View>}


                {data && <View style={{ elevation: 5, backgroundColor: '#ede4e1', borderRadius: ts * 4, marginHorizontal: ts * 5, marginTop: ts * 3, height: ts * 150, borderRadius: 3 }}>

                    {/* appointment body */}

                    <View style={{ alignSelf: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Image
                            style={{ tintColor: 'tomato', height: ts * 13, width: ts * 13, marginTop: ts * 8, }}
                            source={require('../assets/logo.png')}
                        />
                        <Text style={{ fontWeight: 'bold', color: 'tomato' }}>Rules & Regulation</Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <View style={{ marginTop: ts * 5, flexDirection: 'row', alignItems: 'center', marginLeft: ts * 5 }}>
                            <View style={{ height: 8, width: 8, backgroundColor: 'tomato', borderRadius: 10 }} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 7, color: '#555', fontSize: 14, width: '90%' }}>আমি মানুষ হিসাবে আমার কর্তব্য পালন করব ।</Text>
                        </View>
                        <View style={{ marginTop: ts * 5, flexDirection: 'row', alignItems: 'center', marginLeft: ts * 5 }}>
                            <View style={{ height: 8, width: 8, backgroundColor: 'tomato', borderRadius: 10 }} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 7, color: '#555', fontSize: 14, width: '90%' }}>জাতি ধর্ম নিরবিশেষ সকলকে সম্মান করব ।</Text>
                        </View>
                        <View style={{ marginTop: ts * 5, flexDirection: 'row', alignItems: 'center', marginLeft: ts * 5 }}>
                            <View style={{ height: 8, width: 8, backgroundColor: 'tomato', borderRadius: 10 }} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 7, color: '#555', fontSize: 14, width: '90%' }}>আমার কাছে কেউ বড়ো বা ছোট নয় ।</Text>
                        </View>
                        <View style={{ marginTop: ts * 5, flexDirection: 'row', alignItems: 'center', marginLeft: ts * 5 }}>
                            <View style={{ height: 8, width: 8, backgroundColor: 'tomato', borderRadius: 10, }} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 7, color: '#555', fontSize: 14, width: '90%' }}>আমি সর্বদা এই গ্রুপএর প্রতি একাগ্রতা ,নিষ্ঠা ও স্বচ্ছতা বজায় রাখব ।</Text>
                        </View>
                    </View>
                    <View style={{ height: ts * 32, width: ts * 32, marginTop: ts * 5, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 5, justifyContent: 'center',alignItems:'center' }}>
                        <QRCode
                            value={data.name+' ' +'D.O.B : '+data.dob +' '+data.exp_date }
                        />

                    </View>

                    <View style={{ borderBottomColor: '#555', borderBottomWidth: 2, width: '35%', alignSelf: 'center', marginTop: ts * 5 }}>
                        <Image
                            resizeMode='contain'
                            style={{ height: ts * 10, width: ts * 20, alignSelf: 'center', alignSelf: 'center', }}
                            source={{
                                uri: 'https://humanduty.cf/assets/images/sing.png',
                            }}
                        />


                    </View>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#555' }}>Secretary Signature</Text>







                    <View style={{ position: 'absolute', backgroundColor: '#004691', height: ts * 15, width: '100%', bottom: 0, borderTopWidth: 8, borderColor: 'tomato', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>

                        <Text style={{ marginTop: ts * 3, alignSelf: 'center', fontWeight: 'bold', color: '#fff' }}>www.humanduty.cf</Text>
                    </View>


                </View>}

                {!data&&<View style={{justifyContent:'center',alignItems:'center',marginTop:td*38}}><Text style={{fontWeight:'bold',fontSize:ts*10}}>Id Card Not Found !</Text></View>
}








            </ScrollView>




        </View>
    );
}
export default Idcard;


