import React from 'react';
import { Text,View } from 'react-native';

export default function DHeader() {
    return (
        <View style={{ backgroundColor: '#fff', marginTop: ts * 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',paddingBottom:ts*2 }}>
        <Pressable onPress={() => navigation.openDrawer()} style={{ justifyContent: 'center', marginLeft: ts * 5 }}>
            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
                <Feather name="menu" size={ts * 7.5} color="tomato" />
            </View>
        </Pressable>
        <Pressable onPress={() => navigation.openDrawer()} style={{ justifyContent: 'center', marginRight: ts * 5 }}>
            <View style={{ elevation: 5, borderColor: 'tomato', padding: 6, backgroundColor: '#fff', borderRadius: ts * 3 }}>
               
                <Ionicons name="ios-notifications-outline" size={ts * 7.5} color="tomato" />

            </View>

        </Pressable>


        {/* search bar */}
    </View>
    );
    }
