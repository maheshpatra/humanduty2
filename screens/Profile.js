import React, { useEffect } from "react";
import { ActivityIndicator, Appbar, Title } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, StatusBar, ScrollView, Pressable, FlatList,Linking } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
//import { Radio, Center, NativeBaseProvider } from "native-base";
//import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Entypo, AntDesign, MaterialIcons, Feather, MaterialCommunityIcons, Octicons, Ionicons, FontAwesome } from "@expo/vector-icons";
//import { Ionicons, Fontisto,Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

import Barcode from "@kichiyaki/react-native-barcode-generator";
//import { ScrollView } from "react-native-gesture-handler";
// import DrawerNav from '../components/Drawer';

import { Switch, NativeBaseProvider, Radio, CenterAlertDialog, Button, AlertDialog, Center, } from 'native-base'

const ts = Dimensions.get('window').width / 100;
const Profile = ({ navigation, routes }) => {
    const [isEnabled, setisenabled] = React.useState(false);
    const [liveText, setTextLive] = React.useState('Offline');
    const [name, setName] = React.useState("Dr. Parvez Shahide Biswas");
    const [email, setEmail] = React.useState("Parvezbiswas@gmail.com");
    const [mobile, setMobile] = React.useState("9983688299");
    const [about, setAbout] = React.useState("Dr. Parvez Shahide Biswas is a MBBS, MD (General Medicine) in Jadavpur, Kolkata and has an experience of many years in this field. Dr. Parvez Shahide Biswas practices at KPC Medical College & Hospital, Kolkata, GD hospital & diabetes Institute Kolkata. He completed MBBS from The West Bengal University Of Health Sciences.");
    const [qualification, setQualification] = React.useState("MBBS, MD WBUHS ");

    const [address, setAddress] = React.useState("Kolkata");
    const [degination, setDegination] = React.useState("Volunteer");
    const [consult, setConsult] = React.useState("250");
    const [desc, setDesc] = React.useState('Volunteer');


    const [isOpen, setIsOpen] = React.useState(false);
    const [userlist, setUserlist] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const onClose = () => setIsOpen(false);

    const cancelRef = React.useRef(null);

    function getdata() {
        setLoading(true)
        const bodyContent = new FormData();
        bodyContent.append("case", "get_user");
        bodyContent.append("deg", degination);


        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    console.log(resp)
                    setUserlist(resp)
                    setLoading(false)
                }

            })
    }
    useEffect(() => {
        getdata()
    }, [])

    useEffect(() => {
        getdata()

    }, [degination])

    const [active, setActive] = React.useState('');
    const [deg, setDeg] = React.useState(["Volunteer", "Accountant", "Planner & Creators", "Group Coordinator", "Advisors", "Treasurer", "President"]);


    const toggle = () => {
        setisenabled(previousState => !previousState);
        setTextLive(liveText === "Offline" ? "Online" : "Offline")
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 5,backgroundColor:'#fff' }}>
                <FlatList
                    data={deg}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            setDegination(item)
                        }} style={{ height: 56, width: ts * 30, borderBottomColor: degination == item ? 'tomato' : '#ccc', borderBottomWidth: 1.4, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: degination == item ? 'tomato' : '#000', fontWeight: degination == item ? 'bold' : 'normal' }}>{item}</Text>
                        </TouchableOpacity>
                    )}

                />
            </View>
            {!loading ? <FlatList
                data={userlist}
                style={{ marginTop: 5 }}

                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ elevation: 5, backgroundColor: '#ede4e1', borderRadius: ts * 4, marginHorizontal: ts * 5, marginTop: ts * 3, height: ts * 150, borderRadius: 3 }}>

                        {/* appointment body */}
                        <View style={{
                            backgroundColor: '#004691',
                            height: ts * 40,
                            borderBottomWidth: ts * 6,
                            
                           
                            borderColor: 'tomato',
                            borderTopLeftRadius: ts * 2,
                            borderTopRightRadius: ts * 2,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingTop: ts * 8,
                        }}>
                            
                            <View style={{  }}>
                                <Text style={{ alignSelf: 'center', fontSize: ts * 5, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Human Duty</Text>
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#eee', textAlign: 'center', fontSize: ts * 2.5 }}>A Social Organazation</Text>
                                <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#ccc', textAlign: 'center', fontSize: ts * 2.5 }}>Estd: 2019</Text>


                            </View>


                        </View>
                        <Image

                            style={{ height: ts * 29, width: ts * 29, alignSelf: 'center', borderRadius: ts * 30, marginTop: -ts * 15, borderWidth: 6, borderColor: '#ede4e1', }}
                            source={{
                                uri: 'https://gamerpatra.000webhostapp.com/' + item.image,
                            }}
                        />

                        <Text style={{ alignSelf: 'center', fontSize: ts * 5.5, fontWeight: 'bold', color: 'tomato' }}>{item.name}</Text>
                        <Text style={{ alignSelf: 'center', fontSize: ts * 3.2, fontWeight: 'bold', color: '#555' }}>{item.grade} of Human Duty</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: ts * 5 }}>
                            <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Registration No :</Text>
                            <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3 }}>{item.id_no}</Text>


                        </View>
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Blood Group :</Text>
                            <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3 }}>{item.exp_date}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginLeft: ts * 5.5, marginTop: ts * 3 }}>Address:</Text>
                            <Text numberOfLines={1} style={{ fontSize: ts * 3.2, fontWeight: 'bold', color: '#555', marginRight: ts * 5.5, marginTop: ts * 3, width: '60%', textAlign: 'right' }}>{item.address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <TouchableOpacity onPress={()=>{
                                Linking.openURL('whatsapp://send?text='+'Hii '+item.name+'&phone='+item.phone+'')
                            }} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: ts * 30, borderRadius: 5, height: ts * 11, marginLeft: ts * 5.5, marginTop: 10 ,borderWidth:1.5,borderColor:'tomato'}}>
                                <FontAwesome name="whatsapp" color={'green'} size={15}/>
                                <Text style={{ color: '#000', fontSize: ts * 3.4, marginLeft: 5 }}>Whatsapp</Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                Linking.openURL(`mailto:${item.email}`)
                                
                            }} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: ts * 30, borderRadius: 5, height: ts * 11, marginRight: ts * 5.5, marginTop: 10,borderWidth:1.5,borderColor:'tomato' }}>
                                <Feather name="mail" color={'green'} size={15}/>
                                <Text style={{ color: '#000', fontSize: ts * 3.4, marginLeft: 5 }}>Send Mail</Text>

                            </TouchableOpacity>
                            

                        </View>
                        <TouchableOpacity onPress={()=>{
                            Linking.openURL(`tel:${"+91"+item.phone}`)
                        }} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: ts * 35, backgroundColor: 'green', borderRadius: 5, height: ts * 12, marginTop: 10,alignSelf:'center' }}>
                                <MaterialIcons  name="call" color={'#fff'} size={16} />
                                <Text style={{ color: '#fff', fontSize: ts * 4, marginLeft: 5 }}>Call Now</Text>

                            </TouchableOpacity>




                        <View style={{ position: 'absolute', backgroundColor: '#004691', height: ts * 15, width: '100%', bottom: 0, borderTopWidth: 8, borderColor: 'tomato', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>

                            <View style={{ height: ts * 17, width: ts * 80, backgroundColor: '#fff', alignSelf: 'center', marginTop: -38, borderRadius: 5, justifyContent: 'center' }}>
                                {item.id_no && <Barcode height={ts * 14} value={item.id_no} format="CODE128" />}

                            </View>


                        </View>


                    </View>

                )}

            /> :
                <View>

                    <ActivityIndicator size={'large'} color="tomato" />

                </View>
            }





        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    background: {
        height: ts * 56,
        backgroundColor: '#63368a',
        // borderBottomLeftRadius: ts * 34,
        borderBottomRightRadius: ts * 28,
        // paddingBottom: ts * ,
    }
})
export default Profile