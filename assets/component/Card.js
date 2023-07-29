// import React from "react";
import React, { useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import { TouchableOpacity } from 'react-native';
// import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";




export default function (props) {

  console.log(props)


  return <Box alignItems="center">
    <TouchableOpacity onPress={()=>{
      // props.navigation.navigate('donation')
      props.navigation.navigate('DonationDetails',{item:props.item})
    }}>
    <Box maxW="180" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image source={{
            uri:'https://gamerpatra.000webhostapp.com/apis/upload/'+props.item.src,
          }} alt="image" />
        </AspectRatio>
        <Center bg="violet.500" _dark={{
          bg: "tomato"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "600",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="2" py="1.2">
          PHOTOS
        </Center>
      </Box>
      <Stack p="4" space={1}>
        <Stack space={2}>
          <Heading size="sm" ml="-1">
            {props.item.name}
          </Heading>
          <Text numberOfLines={1} fontSize="xs" _light={{
            color: "tomato"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
           {props.item.description}
          </Text>
        </Stack>

        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
              6 mins ago
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
    </TouchableOpacity>
  </Box>;
};