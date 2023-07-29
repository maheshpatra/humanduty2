import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, Dimensions, TouchableOpacity, Pressable, View } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5, Fontisto, MaterialCommunityIcons, Entypo, Ionicons, Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { setCustomText } from 'react-native-global-props';
import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import History from '../../History';
import Login from '../../Login';
import DonationDetails from '../../DonationDetails';
import MyDonation from '../../MyDonation';
import Payment from '../../Payment';
import Loginwith from '../../Logwith';
import Notifications from '../../Notification'
import MyDrawer from '../Drawer/Index'
import BottomTab from '../BottomTab/Index';


import { _retrieveData } from "../../../local_storage";



const Route = ({ navigation, routes }) => {
    const [isLoaded] = useFonts({
        Nova: require('../../../assets/fonts/regular.otf'),
        novaBold: require('../../../assets/fonts/bold.otf'),
        pop: require('../../../assets/fonts/Kanit-Medium.ttf')
    });

    const [userid, setUserId] = React.useState(null);


    const customTextProps = {
        style: {
            fontFamily: 'Nova'
        }
    }

    useEffect(() => {
        setCustomText(customTextProps)
    }, [])

    useEffect(() => {

        _retrieveData("USER_DATA").then((userdata) => {
            // console.log(user_mobile);
            if (userdata !== 'error') {
                setUserId(userdata);

            }

        });
    }, [])
    const HomeStack = createNativeStackNavigator();
    // const value =  AsyncStorage.getItem('uid');

    if (!isLoaded) {
        return <AppLoading />

    } else {
        return (

            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#3b86ff" />

                <NavigationContainer>
                    <HomeStack.Navigator initialRouteName={userid ? "MyDrawer" : "Login"}>


                        <HomeStack.Screen name="Login" component={Login} options={{ headerShown: false }} />



                        <HomeStack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
                        <HomeStack.Screen name="Meeting" component={History} options={{ headerShown: true }} />
                        <HomeStack.Screen name="DonationDetails" component={DonationDetails} options={{ headerShown: false }} />

                        <HomeStack.Screen name="MyDonation" component={MyDonation} options={{ headerShown: true }} />
                        <HomeStack.Screen name="Loginwith" component={Loginwith} options={{ headerShown: false }} />
                        <HomeStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
                        <HomeStack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
                        


                    </HomeStack.Navigator>

                </NavigationContainer>

            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
export default Route;