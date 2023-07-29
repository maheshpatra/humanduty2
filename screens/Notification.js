import React from "react";
import { Appbar, Title } from 'react-native-paper';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, StatusBar, ScrollView, Pressable } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
//import { Radio, Center, NativeBaseProvider } from "native-base";
//import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Entypo, AntDesign, MaterialIcons, Feather, MaterialCommunityIcons, Octicons, Ionicons } from "@expo/vector-icons";
//import { Ionicons, Fontisto,Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
//import { ScrollView } from "react-native-gesture-handler";
// import DrawerNav from '../components/Drawer';

import { Switch, NativeBaseProvider, Radio, CenterAlertDialog, Button, AlertDialog, Center } from 'native-base'

const ts = Dimensions.get('window').width / 100;
const Notifications=({ navigation, routes })=> {
    const [isEnabled, setisenabled] = React.useState(false);
    const [liveText, setTextLive] = React.useState('Offline');
    const [name, setName] = React.useState("Dr. Parvez Shahide Biswas");
    const [email, setEmail] = React.useState("Parvezbiswas@gmail.com");
    const [mobile, setMobile] = React.useState("9983688299");
    const [about, setAbout] = React.useState("Dr. Parvez Shahide Biswas is a MBBS, MD (General Medicine) in Jadavpur, Kolkata and has an experience of many years in this field. Dr. Parvez Shahide Biswas practices at KPC Medical College & Hospital, Kolkata, GD hospital & diabetes Institute Kolkata. He completed MBBS from The West Bengal University Of Health Sciences.");
    const [qualification, setQualification] = React.useState("MBBS, MD WBUHS ");

    const [address, setAddress] = React.useState("Kolkata");
    const [consult, setConsult] = React.useState("250");
    const [desc, setDesc] = React.useState('');


    const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

    const [active, setActive] = React.useState('');

    const toggle = () => {
        setisenabled(previousState => !previousState);
        setTextLive(liveText === "Offline" ? "Online" : "Offline")
    }
    return (
        <ScrollView>
            <View><Text>add</Text></View>
        </ScrollView>

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
export default Notifications