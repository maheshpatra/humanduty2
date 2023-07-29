import React from "react";
import { Appbar, Title } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, StatusBar,ScrollView } from "react-native";

import { Entypo, AntDesign, MaterialIcons,Feather,MaterialCommunityIcons,Octicons,Ionicons } from "@expo/vector-icons";




const ts = Dimensions.get('window').width / 100;
const History=({ navigation, routes })=> {
    

   
    return (
        <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <StatusBar backgroundColor="#e7008a" barStyle="light-content" /> */}
            <View style={{ flexDirection: 'row', marginTop: ts * 3, alignSelf: 'center' }}>

                <View style={{ flexDirection: 'column', width: ts * 50, }}>
                    <Image
                        style={{ height: ts * 24, width: ts * 24, alignSelf: 'center', borderRadius: ts * 30, borderWidth: 4, borderColor: '#f2a399' }}
                        source={{
                            uri: 'https://medphox.com/images/doctor1.jpg',
                        }}
                    />
                    <Text style={{ fontFamily: 'novaBold', fontSize: ts * 5, color: '#333', alignSelf: 'center' }}>mahesh patra</Text>
                    <Text style={{ fontFamily: 'novaBold', fontSize: ts * 3, marginTop: ts * 0.25, color: '#999', alignSelf: 'center' }}>maheshpatra53@gmail.com </Text>
                    <View style={{ height: ts * 10, backgroundColor: 'tomato', flexDirection: 'row', borderRadius: ts * 5, justifyContent: 'center', marginLeft: ts * 2.5, alignSelf: 'center', marginTop: ts * 2, alignItems: 'center', paddingHorizontal: ts * 4 }}>
                        <Text style={{ fontFamily: 'novaBold', alignSelf: 'center', color: '#fff' }}>Edit Profile</Text>

                        <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#fff" style={{ marginLeft: ts * 2 }} />

                    </View>

                </View>




            </View>
            <View style={{ backgroundColor: '#eee', height: ts * 8, marginTop: ts * 2.5, marginHorizontal: ts * 5, justifyContent: 'center',borderRadius:5 }}>
                <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.2, color: '#999' }}>PERSONAL</Text>
            </View>
            <View style={styles.itemback}>
            <Feather name="lock" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.6, color: '#555' }}>Password</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={{ position:'absolute',right:ts*5}} />

            </View>
            <View style={styles.itemback}>
            <Feather name="globe" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.6, color: '#555' }}>Language</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={{ position:'absolute',right:ts*5}} />

            </View>
            <View style={styles.itemback}>
            <MaterialCommunityIcons name="wallet-outline" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.6, color: '#555' }}>Payment</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={{ position:'absolute',right:ts*5}} />

            </View>




            {/* prefarence */}
            <View style={{ backgroundColor: '#eee', height: ts * 8, marginTop: ts * 2.5, marginHorizontal: ts * 5, justifyContent: 'center',borderRadius:5 }}>
                <Text style={{ marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 3.2, color: '#999' }}>PREFARENCE</Text>
            </View>
            <View style={styles.itemback}>
            <Feather name="moon" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={styles.maintext}>Night Mode</Text>
                <View style={{ position:'absolute',right:ts*5}} >
               
                </View>
            </View>
            <View style={styles.itemback}>
            <MaterialIcons name="notifications-none" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={styles.maintext}>Notifications</Text>
                <View style={{ position:'absolute',right:ts*5}} >
                
                </View>
            </View>
            <View style={styles.itemback}>
            <MaterialCommunityIcons name="wallet-outline" size={ts * 7} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={styles.maintext}>Payment</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

            </View>
            <View style={{ backgroundColor: '#fff', height: ts * 13, marginHorizontal: ts * 5, alignItems: 'center',flexDirection:'row', }}>
            <MaterialIcons name="system-update" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={styles.maintext}>Check for Update</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle}/>

            </View>
            <View style={styles.itemback}>
            <Feather name="headphones" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={styles.maintext}>Help & Support</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

            </View>
            <View style={styles.itemback}>
            <AntDesign name="questioncircleo" size={ts * 6.5} color="#555" style={{ marginLeft: ts * 2 }} />
                <Text style={styles.maintext}>About</Text>
                <MaterialIcons name="arrow-forward-ios" size={ts * 4} color="#999" style={styles.iconstyle} />

            </View>

          






        </View>
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
    itemback:{
        backgroundColor: '#fff', height: ts * 13, marginHorizontal: ts * 5, alignItems: 'center',flexDirection:'row'
    },
    maintext:{
        marginLeft: ts * 5, fontWeight: 'bold', fontSize: ts * 4, color: '#555'
    },
    iconstyle:{
        position:'absolute',right:ts*5

    }
})
export default History;