import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, Dimensions, TouchableOpacity, Pressable, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Fontisto, MaterialCommunityIcons, Entypo, Ionicons, Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import Home from "../../Home";
import Gallery from "../../Gallery";
import MyDonation from '../../MyDonation';
import Settings from '../../Settings';
import HelpFinder from '../../HelpFinder';
import MyDrawer from '../Drawer/Index'


const Tab = createBottomTabNavigator();
const BottomTab = ({ navigation, routes }) => {


    const CustomTabButton = ({ children, onPress }) => (

        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', top: -30 }} onPress={onPress}>

            <View style={{ width: 55, height: 55, borderRadius: 28, backgroundColor: '#fff',borderWidth:5,borderColor:'tomato',elevation:10,borderLeftWidth:2,borderRightWidth:2}}>{children}</View>
        </TouchableOpacity>

    );


    return (

        <Tab.Navigator
            initialRouteName="Home"
            labelStyle={{ fontSize: 12 }}
            
            barStyle={{ backgroundColor: '#fff', }}
            inactiveColor={"#999"}
            activeColor={"tomato"}
            
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarShowLabel:false,
                headerShown:false,
                tabBarStyle: { height: 59,borderRadius:20, },
                tabBarHideOnKeyboard:true
                
                
              }}


        >
            <Tab.Screen
                name="Home"
                component={Home}

                options={{
                    indicatorStyle: { backgroundColor: 'red', height: '100%' }, ressOpacity: 1,
                    // tabBarLabel: <Text style={{ fontWeight: 'bold', fontSize: 11, borderRadius: 7, padding: 2 }}>Home</Text>,
                    tabBarIcon: ({ color }) => (
                        <View style={{alignItems:'center',justifyContent: 'center'}}>
                        <Ionicons name="home" color={color} size={25} />
                        <Text style={{ fontWeight: 'bold', fontSize: 11, marginTop:4,color:color }}>Home</Text>
                           </View>
                    ),
                    
                }}
            />
            {/* <Tab.Screen
                name="MyDrawer"
                component={MyDrawer}

                options={{
                    // indicatorStyle: { backgroundColor: 'red', height: '100%' }, ressOpacity: 1,
                    // tabBarLabel: <Text style={{ fontWeight: 'bold', fontSize: 11, borderRadius: 7, padding: 2 }}>Home</Text>,
                    tabBarIcon: ({ color }) => (
                        <View style={{alignItems:'center',justifyContent: 'center'}}>
                        <Ionicons name="home" color={color} size={26} />
                        <Text style={{ fontWeight: 'bold', fontSize: 11, marginTop:4,color:color }}>Home</Text>
                           </View>
                    ),
                    
                }}
            /> */}

            <Tab.Screen
                name="Gallery"
                component={Gallery}
                options={{
                    // tabBarLabel: <Text style={{ fontWeight: 'bold', fontSize: 11, borderRadius: 7, padding: 2 }}>Gallery</Text>,
                    tabBarIcon: ({ color,focused }) => (
                        <View style={{alignItems:'center',justifyContent: 'center'}}>
                        <Fontisto name="photograph" color={color} size={23} />
                        <Text style={{ fontWeight: 'bold', fontSize: 11, marginTop:4,color:color }}>Gallery</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Finder"
                component={HelpFinder}
                options={{

                   
                    tabBarIcon: ({ color,focused }) => (
    
                            <FontAwesome5 name="plus" color={color} size={23} style={{}} />


                    ),
                    tabBarButton: (props) => (
                        <CustomTabButton {...props} />
                    )
                }}

            />
            <Tab.Screen
                name="Donate"
                component={MyDonation}
                options={{

                    // tabBarLabel: <Text style={{ fontWeight: 'bold', fontSize: 11, borderRadius: 7, padding: 2 }}>My Donate</Text>,
                    tabBarIcon: ({ color }) => (
                        <View style={{alignItems:'center',justifyContent: 'center'}}>
                        <FontAwesome5 name="donate" color={color} size={23} />
                        <Text style={{ fontWeight: 'bold', fontSize: 11, marginTop:4,color:color }}>My Donate</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    
                    tabBarIcon: ({ color }) => (
                        <View style={{alignItems:'center',justifyContent: 'center'}}>
                        <AntDesign name="setting" color={color} size={25} />
                        <Text style={{ fontWeight: 'bold', fontSize: 11, marginTop:4,color:color }}>Settings</Text>
                        </View>
                    ),
                }}
            />


        </Tab.Navigator>
    );
}
export default BottomTab;