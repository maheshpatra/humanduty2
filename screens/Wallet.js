import React, { useEffect } from 'react';
import { View, Text, Dimensions, Pressable, TextInput, StyleSheet } from 'react-native';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { _retrieveData } from "../local_storage";

import { Button, Actionsheet, useDisclose, Icon, Box, Center, NativeBaseProvider, Progress } from "native-base";
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';


const ts = Dimensions.get('window').width / 100;
const tsh = Dimensions.get('window').height / 100;
const Wallet = ({ navigation }) => {
    const [balance, setBalance] = React.useState()
    const [email, setEmail] = React.useState()
    const [transaction, setTransaction] = React.useState([])
    useEffect(() => {
        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {
                getBalance(userdata.email)
                setEmail(userdata.email)
                getTransaction(userdata.email)
            }


        });

    }, [])

    useFocusEffect(
        React.useCallback(() => {
            _retrieveData("USER_DATA").then((userdata) => {
                // console.log(user_mobile);
                if (userdata !== 'error') {
                    getBalance(userdata.email)
                    setEmail(userdata.email)
                }
    
    
            });
        }, [])
      );


    


    function addbal(abalance) {
        const bodyContent = new FormData();
        bodyContent.append("case", "update_bal");
        bodyContent.append("email", email);
        bodyContent.append("balance", abalance);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp == 'updated') {
                    getBalance(email)

                }

            })

    }


    function getTransaction(emmail) {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_transaction");
        bodyContent.append("email", emmail);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                    // console.log(resp)
                    setTransaction(resp)



                }

            })

    }

    function getBalance(eemail) {
        const bodyContent = new FormData();
        bodyContent.append("case", "get_balance");
        bodyContent.append("email", eemail);

        fetch("https://gamerpatra.000webhostapp.com/appapi/login.php", {
            method: "post",
            body: bodyContent,
        })
            .then((data) => data.json())
            .then((resp) => {
                if (resp !== 1) {
                     console.log(resp)
                    setBalance(resp.balance)
                    getTransaction(resp.email)
                    onClose()


                }

            })
    }
    const [number, onChangeNumber] = React.useState(null);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    return (

        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ backgroundColor: '#22BDFF', marginHorizontal: ts * 5, borderRadius: 10, height: ts * 35 }}>
                <Text style={{ alignSelf: 'flex-start', marginTop: ts * 2, fontSize: ts * 3.5, marginLeft: ts * 4, fontWeight: 'bold', color: '#fff' }}>current wallet balance</Text>
                <Text style={{ fontSize: ts * 8, fontWeight: 'bold', color: '#fff', marginTop: ts * 3, marginLeft: ts * 6 }}>₹ {balance}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: ts * 3 }}>
                    <Ionicons name="chevron-up" size={ts * 5} color="#77d96f" />
                    <Text style={{ fontSize: ts * 2.5, fontWeight: 'bold', color: '#77d96f' }}>₹200 added on (12-02-2022)</Text>
                </View>
                <Octicons name="info" size={ts * 5} color="#555" style={{ position: 'absolute', right: ts * 5, padding: 5, backgroundColor: '#f4f4f4', borderBottomLeftRadius: 5, borderBottomRightRadius: 10 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: ts * 5, height: ts * 20, }}>
                <Pressable onPress={() => navigation.navigate("Home")} style={{ width: ts * 43, backgroundColor: '#4062FF', marginLeft: ts * 5, borderRadius: 10, flexDirection: 'row' }}>
                    <Ionicons name="chevron-up" size={ts * 9.5} color="#4062FF" style={{ backgroundColor: '#fff', alignSelf: 'center', marginLeft: ts * 4, borderRadius: 5 }} />
                    <Text style={{ fontSize: ts * 3.6, fontWeight: 'bold', color: '#fff', alignSelf: 'center', marginLeft: ts * 2 }}>Donate money</Text>
                </Pressable>
                <Pressable onPress={onOpen} style={{ width: ts * 43, backgroundColor: '#22BDFF', marginRight: ts * 5, borderRadius: 10, flexDirection: 'row' }}>
                    <Ionicons name="add" size={ts * 9.5} color="#22BDFF" style={{ backgroundColor: '#fff', alignSelf: 'center', marginLeft: ts * 4, borderRadius: 5 }} />
                    <Text style={{ fontSize: ts * 3.6, fontWeight: 'bold', color: '#fff', alignSelf: 'center', marginLeft: ts * 2 }}>Add money</Text>
                </Pressable>



            </View>
            <View>

                <Text style={{ marginLeft: ts * 5, marginTop: ts * 2, fontWeight: 'bold' }}>Recent Transtion</Text>

                <FlatList
                    style={{height:'65%'}}
                    data={transaction}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', marginTop: ts * 3, marginHorizontal: ts * 5, backgroundColor:item.status=='credit'? '#ceebd9' :'#e3b9b8', elevation: 4, padding: ts * 4, borderRadius: 5,marginBottom:ts*1.5 }}>
                            <Ionicons name="add" size={ts * 9.5} color="#fff" style={{ backgroundColor: '#22BDFF', borderRadius: 5, elevation: 5 }} />
                            <View>
                                <Text style={{ fontWeight: 'bold', marginLeft: ts * 2 }}>{item.status=='credit'?"Add Money in wallet":"Payment for Donation"}</Text>
                                <Text style={{ fontWeight: 'bold', marginLeft: ts * 2, color:item.status=='debit'?'red':'green' }}>{item.status}</Text>
                            </View>
                            <View style={{ position: 'absolute', right: ts * 5, alignSelf: 'center' }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: ts * 2, color:item.status=='debit'? 'red' :'green'}}>{(item.status=='debit'?'- ':'+ ')+item.added_balance}</Text>
                            </View>

                        </View>
    )}

                />


                


                

            </View>
            <NativeBaseProvider>
                <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
                    <Actionsheet.Content>


                        <View style={{ height: tsh * 60, width: '100%' }}>
                            <Text style={{ alignSelf: 'center', color: '#999', fontSize: ts * 4.8, fontWeight: 'bold', marginTop: ts * 3 }}>How much you Want to Add</Text>





                            <View>

                                <TextInput
                                    style={{ marginHorizontal: ts * 5, backgroundColor: '#ddd', height: tsh * 7, borderRadius: ts * 5, textAlign: 'center', fontSize: ts * 4, fontFamily: 'novaBold', padding: ts * 2, marginTop: ts * 5 }}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    placeholder="Enter amount"
                                    keyboardType="numeric"

                                />
                                <Pressable onPress={() => {
                                    // addbal(number)
                                    onClose()
                                    navigation.navigate('Payment' ,{item:number})
                                }} style={{ height: ts * 15, backgroundColor: 'tomato', marginHorizontal: ts * 5, alignItems: 'center', marginVertical: ts * 5, justifyContent: 'center', borderRadius: ts * 5, elevation: 5 }}>
                                    <Text style={{ fontSize: ts * 5, fontWeight: 'bold', color: '#fff' }}>Continue</Text>
                                </Pressable>
                            </View>





                        </View>






                    </Actionsheet.Content>
                </Actionsheet>
            </NativeBaseProvider>

        </View>
    )




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

    priceview: { backgroundColor: '#ddd', flexDirection: 'column', width: '30%', borderRadius: 10, justifyContent: 'center', marginLeft: ts * 2.5, },
    pricetext: { fontFamily: 'novaBold', alignSelf: 'center', color: 'tomato', fontSize: ts * 5 },
    iconstyle: {
        position: 'absolute', right: ts * 5

    }
})
export default Wallet;