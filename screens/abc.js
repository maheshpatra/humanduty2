// import react from "react";
import React, { useEffect } from 'react';
import { Box, Heading, AspectRatio,  Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import { Image,Dimensions } from 'react-native';



export function Ccrd(props) {
   console.log(props.item)
  const item =props.item;

  const ts = Dimensions.get('window').width / 100;

    return <Box alignItems="center">
        <Box maxW={ts*100} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
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
              uri: "https://gamerpatra.000webhostapp.com/"+item.data,
            }} alt="image" />
            </AspectRatio>
           
          </Box>
          <Stack p="5" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {item.projects_name}
              </Heading>
              <Text fontSize="xs" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                {item.type}
              </Text>
            </Stack>
            <Text fontWeight="400">
             {item.description}
            </Text>
            
          </Stack>
        </Box>
      </Box>;
  };