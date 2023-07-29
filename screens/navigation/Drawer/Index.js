import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, Dimensions, TouchableOpacity, Pressable, View } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { FontAwesome5, Fontisto, MaterialCommunityIcons, Entypo, Ionicons, Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import Profile from "../../Profile";
import CustomSidebarMenu from '../../Custom';
import Idcard from '../../Idcard';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Wallet from '../../Wallet';
import BirthdayList from '../../BirthdayList';
import BottomTab from '../BottomTab/Index';

import AnimatedSplash from "react-native-animated-splash-screen";


const Drawer = createDrawerNavigator();


const ts = Dimensions.get('window').width / 100;
const MyDrawer = ({ navigation, routes }) =>  {
    return (


        <Drawer.Navigator
            drawerContentContainerStyle={{ backgroundColor: '#fff' }}

            screenOptions={{
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: 'tomato',
                drawerInactiveTintColor: '#555',
                drawerLabelStyle: { marginLeft: -5, fontSize: 14, fontWeight: 'bold' },
                drawerStyle: {

                    backgroundColor: '#fff',

                },
                headerStyle: {

                },
            }}



            drawerHideStatusBarOnOpen={true}

            drawerStatusBarAnimation={'slide'}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}

        >
            <Drawer.Screen name="My home" component={BottomTab}
                options={{
                    headerShown: false, drawerIcon: ({ color }) => (
                        <AntDesign name="home" color={color} size={24} />
                    ), headerTitle: ''
                    , headerRight: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 5 }} onPress={() => navigation.navigate("DonationDetails")}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ), headerLeft: false,
                    headerLeft: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Feather name="menu" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ),
                }} />
            <Drawer.Screen name="HD user" component={Profile} options={{
                headerShown: true, drawerIcon: ({ color }) => (
                    <FontAwesome5 name="user-circle" color={color} size={24} />
                ), headerTitle: 'HD user'
                , headerRight: () => (
                    <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 5 }} onPress={() => navigation.navigate("DonationDetails")}>
                        <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                            <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
                        </View>
                    </TouchableOpacity>
                ), headerLeft: false,
                headerLeft: () => (
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                            <Feather name="menu" size={ts * 7.5} color="tomato" />
                        </View>
                    </TouchableOpacity>
                ),
            }} />
            <Drawer.Screen name="My Wallet" component={Wallet}
                options={{
                    headerShown: true, drawerIcon: ({ color }) => (
                        <Ionicons name="wallet-outline" color={color} size={24} />
                    ), headerTitle: ''
                    , headerRight: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 5 }} onPress={() => navigation.navigate("DonationDetails")}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ), headerLeft: false,
                    headerLeft: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Feather name="menu" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ),
                }} />

            <Drawer.Screen name="My Id Card" component={Idcard}
                options={{

                    headerShown: true, drawerIcon: ({ color }) => (
                        <AntDesign name="idcard" color={color} size={24} />
                    ), headerTitle: 'My ID Card'
                    , headerRight: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 5 }} onPress={() => navigation.navigate("DonationDetails")}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ), headerLeft: false,
                    headerLeft: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Feather name="menu" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ),
                }} />
                <Drawer.Screen name="Birthdays" component={BirthdayList}
                options={{

                    headerShown: true, drawerIcon: ({ color }) => (
                        <FontAwesome name="birthday-cake" color={color} size={24} />
                    ), headerTitle: 'Upcomming Birthdays'
                    , headerRight: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginRight: ts * 5 }} onPress={() => navigation.navigate("DonationDetails")}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ), headerLeft: false,
                    headerLeft: () => (
                        <TouchableOpacity style={{ justifyContent: 'center', marginLeft: ts * 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                                <Feather name="menu" size={ts * 7.5} color="tomato" />
                            </View>
                        </TouchableOpacity>
                    ),
                }} />

        </Drawer.Navigator>
    );
}
export default MyDrawer;