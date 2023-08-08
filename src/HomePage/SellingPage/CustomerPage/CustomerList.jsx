import { Box, Button, FlatList, HStack, Image, ScrollView, Text, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import Badges from '../../../../components/Badges';
import useImageUrl from '../../../../hooks/useImageUrl';
import axios from 'axios';

export function CustomerListIOS({ data, token }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [image, setImage] = useState(null);

  // const dummyData = [
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด1', desc: 'Thailand', group: 'All Customer Group' },
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด2', desc: 'Thailand', group: 'All Customer Group' },
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด3', desc: 'Thailand', group: 'All Customer Group' },
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด4', desc: 'Thailand', group: 'All Customer Group' },
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด5', desc: 'Thailand', group: 'All Customer Group' },
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด6', desc: 'Thailand', group: 'All Customer Group' },
  //   { title: 'บริษัท สยามไทยคัทติ่งทูล กำจัด7', desc: 'Thailand', group: 'All Customer Group' },
  // ];
  // useEffect(() => {
  //   const apiUrl = 'http://111.223.38.20/private/files/stk.png';
  //   const token = '5891d01ccc2961e:0e446b332dc22aa';

  //   const headers = {
  //     Authorization: `token ${token}`,
  //     responseType: 'blob', // Response type as array buffer to handle
  //   };
  //   axios
  //     .get(apiUrl, headers)
  //     .then((response) => console.log(response.config))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const Item = ({ image, title, type, group }) => (
    <View
      mt={2}
      mb={2}
      mx={1.5}
      px={2}
      py={3}
      rounded={12}
      bg={'white'}
      shadow={1}
    >
      <HStack justifyContent={'space-between'}>
        {image !== null ? (
          <Image
            m={4}
            w={20}
            h={20}
            rounded={6}
            alt={'image'}
            source={{
              width: 25,
              height: 25,
              uri: 'http://111.223.38.20' + image,
              method: 'GET',
              headers: {
                Authorization: token,
              },
            }}
          />
        ) : (
          <Box
            m={4}
            w={20}
            h={20}
            rounded={6}
            background={'black'}
          >
            <Box
              w={'full'}
              h={'full'}
              justifyContent={'center'}
              alignItems={'center'}
              position={'absolute'}
            >
              <Text color={'white'}>No Image</Text>
            </Box>

            <Image
              alt={'image'}
              opacity={'0.5'}
              style={{ flex: 1, resizeMode: 'cover' }}
              source={{
                uri: 'https://images.pexels.com/photos/2887582/pexels-photo-2887582.jpeg?auto=compress&cs=tinysrgb&w=600',
              }}
            />
          </Box>
        )}

        <VStack
          w={'full'}
          ml={2.5}
          justifyContent={'center'}
          justifyItems={'start'}
        >
          <HStack space={1.5}>
            <Text
              fontSize={'xs'}
              fontWeight={'bold'}
            >
              {title}
            </Text>

            <Text
              color={COLORS.gray}
              fontSize={'xs'}
            >
              {type}
            </Text>
          </HStack>
          <HStack>
            <Text
              color={COLORS.tertiary}
              fontSize={'sm'}
            >
              {group}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </View>
  );

  return (
    <View
      my={4}
      w={SCREEN_WIDTH - 24}
      h={500}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            image={item.image}
            title={item.name}
            type={item.customer_type}
            group={item.customer_group}
          />
        )}
      />
    </View>
  );
}
