
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, Pressable, TouchableOpacity, ScrollView, StatusBar, TextInput, FlatList, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, Fontisto, Entypo, FontAwesome5, Feather, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Button, Actionsheet, useDisclose, Icon, Box, Center, NativeBaseProvider, Progress } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import Svg, {
    G,
    Path,
    Defs,
    Mask,
    LinearGradient,
    Stop
} from "react-native-svg"
import LottieView from 'lottie-react-native';
const ts = Dimensions.get('window').width / 100;
const tsh = Dimensions.get('window').height / 100;




const BirthdayList = ({ navigation, route }) => {


    const [user, setUser] = useState([])
    const [loading, setIsloading] = useState([])

    function calculateAge(date) {
        var today = new Date();


        var birthday = new Date(date);
        var month = birthday.getUTCMonth() + 1; //months from 1-12
        var day = birthday.getUTCDate();
        var year = birthday.getUTCFullYear();
        // console.log(date);

        // console.log(today)



        var milliseconds, seconds, minutes, hours, days;

        var years = today.getFullYear() - birthday.getFullYear();
        //  console.log(years);
        var myDay = day
        var myMonth = month

        // //Here is my code 
        myMonth--;// Because of Month index is 0-11
        var nextBirthday = (new Date(today.getFullYear(), myMonth, myDay)) < today ? (new Date(today.getFullYear() + 1, myMonth, myDay)) : (new Date(today.getFullYear(), myMonth, myDay)) //checking is passed or not

        //  console.log(nextBirthday)
        var diff = nextBirthday - today;

        milliseconds = diff % 1000;
        diff = (diff - (milliseconds)) / 1000;
        // console.log(diff);
        seconds = diff % 60
        // console.log(diff);
        diff = (diff - seconds) / 60;
        // console.log(diff);
        minutes = diff % 60
        diff = (diff - minutes) / 60;
        // console.log(diff);
        hours = diff % 24
        days = (diff - hours) / 24;
        var timeLeft = {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
        return days;
    }


    // const [timeLeft, setTimeLeft] = React.useState(calculateAge());

    //   React.useEffect(() => {
    //     const id = setTimeout(() => {
    //       setTimeLeft(calculateAge());
    //     }, 1000);

    //     return () => {
    //       clearTimeout(id);
    //     };
    //   });


    function birthday(emmail) {
        setIsloading(true)
        const bodyContent = new FormData();
        bodyContent.append("case", "get_birth");


        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    console.log(resp)
                    setUser(resp)
                    setIsloading(false)




                }

            })

    }





    // function calculateDays() {
    //   let today = new Date();
    //   let bday = new Date(document.getElementById("bday").value); 
    //   let age = today.getFullYear() - bday.getFullYear();

    //   let upcomingBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());

    //   if(today > upcomingBday) {
    //     upcomingBday.setFullYear(today.getFullYear() + 1);
    //   }

    //   var one_day = 24 * 60 * 60 * 1000;

    //   let daysLeft = Math.ceil((upcomingBday.getTime() - today.getTime()) / (one_day));

    //   // No need to calculate people older than 199 yo. :)   
    //   if (daysLeft && age < 200) {
    //     document.getElementById("result").innerText = `In ${daysLeft} day(s), you will be ${age + 1}!`;  
    //   } else {
    //     document.getElementById("result").innerText = "Please enter a valid birtday.";
    //   }

    // }
    useEffect(() => {
        // calculateAge('29/08/2000')
        birthday()

    }, [])


    return (
        <View style={{
            background: {
                width: '100%',
                height: '100%',
                flex: 1
            }
        }}>



            <FlatList
                contentContainerStyle={{ paddingBottom: 65 }}
                data={user}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: '#eee', height: ts * 52, borderRadius: ts * 5, margin: ts * 2.5, borderWidth: 1, elevation: 5, borderColor: '#ccc' }}>
                        <View style={{ flexDirection: 'row', height: ts * 35, marginBottom: ts * 2.5 }}>
                            <View style={{ width: ts * 35, marginTop: ts * 5, marginLeft: ts * 2.5, }}>

                                <LottieView
                                    autoPlay
                                    loop
                                    style={{
                                        width: 105,
                                        height: 105,

                                    }}
                                    // Find more Lottie files at https://lottiefiles.com/featured
                                    source={require('../../assets/125829-birthday-cake.json')}
                                />



                            </View>
                            <View style={{ width: ts * 52, marginTop: ts * 2.5, marginLeft: ts * 2.5 }}>

                                <Image
                                    style={{ height: ts * 24, width: ts * 24, alignSelf: 'center', borderRadius: ts * 30, borderWidth: 4, borderColor: '#f2a399' }}
                                    source={{
                                        uri: 'https://gamerpatra.000webhostapp.com/' + item.image,
                                    }}
                                />


                                <Text style={{ fontWeight: 'bold', fontSize: ts * 5, alignSelf: 'center' }}>{item.name}</Text>
                                {/* <Text style={{ fontWeight: 'bold', fontSize: ts * 5, alignSelf: 'center' }}>vcbnvn</Text> */}
                                {/* <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: ts * 2, alignSelf: 'center', color: 'tomato', marginTop: ts * 1.5, marginBottom: ts * 3 }}>hghgjhkjkjngnhghfhd</Text> */}

                                {/* <View style={{ flexDirection: 'row', width: '96%', justifyContent: 'space-between' }}>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: ts * 3, alignSelf: 'center', color: 'tomato', marginTop: ts * 1.5, marginBottom: ts * 2 }}>{'Raised : 565'}</Text>
                                    <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: ts * 3, alignSelf: 'center', color: 'tomato', marginTop: ts * 1.5, marginBottom: ts * 2 }}>{'Goal : 67'}</Text>
                                </View> */}
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: ts * 10 ,alignSelf:'center'}}>
                            <Text style={{ fontWeight: 'bold', fontSize: ts * 3, marginLeft: ts * 3.5 }}>{item.name}'s birthday is <Text style={{
                                color: 'tomato', fontWeight: 'bold', fontSize: ts * 5,
                            }}>{calculateAge(item.dob)}</Text> days away </Text>
                            

                        </View>
                        <Text style={{ fontWeight: 'bold', borderBottomRightRadius: ts * 3, paddingBottom: 2, color: 'tomato', position: 'absolute', top: 0, left: 0, color: '#fff', backgroundColor: 'tomato', paddingHorizontal: 10, borderTopLeftRadius: ts * 5, fontSize: ts * 3 }}>{'Upcomming birthday'}</Text>

                    </View>
                )}

            />





            {/* bottom sheet */}

        </View>

    )
}
export default BirthdayList