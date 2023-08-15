import { Box, FlatList, HStack, Image, Text, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import GetScreenSize from '../../../../hooks/GetScreenSize';
import { CustomerSkeletonBase, CustomerSkeletonLg } from '../../../../components';
import { url } from '../../../../config';

export function CustomerList({ data, token, reload, setReload, returnDataIndex }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [dataIndex, setDataIndex] = useState(5);
  const length = 10;

  const Item = ({ image, title, type, group }) => (
    <View
      // mt={2}
      mb={2}
      mx={1.5}
      px={2}
      py={3}
      rounded={12}
      w={{ base: SCREEN_WIDTH - 48, lg: '48%' }}
      bg={COLORS.lightWhite}
      shadow={1}
    >
      <HStack>
        {image !== null ? (
          <Box
            m={4}
            w={20}
            h={20}
            rounded={6}
            shadow={1}
          >
            <Image
              style={{ flex: 1, resizeMode: 'cover' }}
              rounded={6}
              alt={'customer image'}
              source={{
                uri: url.BASE_URL + image,
                method: 'GET',
                headers: {
                  Authorization: token,
                },
              }}
            />
          </Box>
        ) : (
          <Box
            m={4}
            w={20}
            h={20}
            rounded={6}
            background={'black'}
            shadow={1}
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
              alt={'customer image'}
              opacity={'0.5'}
              rounded={6}
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
              w={48}
              fontSize={'xs'}
              fontWeight={'bold'}
            >
              {title}
            </Text>
          </HStack>
          <HStack>
            <Text
              w={48}
              color={COLORS.tertiary}
              fontSize={'sm'}
            >
              {group}
            </Text>
          </HStack>
        </VStack>
        <Text
          color={COLORS.gray}
          fontSize={'xs'}
          position={'absolute'}
          bottom={2}
          right={4}
        >
          {type}
        </Text>
      </HStack>
    </View>
  );

  useEffect(() => {
    if (reload) {
      setTimeout(() => {
        setReload(false);
      }, 1000);
    }
  }, [reload]);

  useEffect(() => {
    returnDataIndex(dataIndex);
  }, [dataIndex]);

  if (reload) {
    return (
      <View
        my={4}
        w={{ base: SCREEN_WIDTH - 24, lg: 1000 }}
        h={500}
      >
        <GetScreenSize
          from={'sm'}
          to={'md'}
        >
          {new Array(1, 2, 3, 4, 5, 6).map((d) => (
            <CustomerSkeletonBase key={d} />
          ))}
        </GetScreenSize>
        <GetScreenSize
          from={'md'}
          to={'lg'}
        >
          <CustomerSkeletonLg />
        </GetScreenSize>
      </View>
    );
  }

  return (
    <View
      my={4}
      w={{ base: SCREEN_WIDTH - 24, lg: 1000 }}
      // h={500}
    >
      <GetScreenSize
        from={'md'}
        to={'lg'}
      >
        <FlatList
          data={data.slice(0, dataIndex)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item) => item.name}
          // onEndReached={() => setDataIndex((pre) => pre + 1)}
          // onEndReached={() => console.log('triggered onEndReached!')}
          // onEndReachedThreshold={0.5}

          onScroll={(event) => {
            // console.log(event.nativeEvent.contentOffset.y);
            let BottomDetect = event.nativeEvent.contentOffset.y > 60 && event.nativeEvent.contentOffset.y <= 80;

            if (!BottomDetect) {
            } else {
              if (dataIndex < data.length)
                dataIndex + length < data.length ? setDataIndex((post) => post + length) : setDataIndex(data.length);
            }
          }}
          renderItem={({ item }) => (
            <Item
              image={item.image}
              title={item.name}
              type={item.customer_type}
              group={item.customer_group}
            />
          )}
        />
      </GetScreenSize>
      <GetScreenSize
        from={'sm'}
        to={'md'}
      >
        <FlatList
          data={data.slice(0, dataIndex)}
          keyExtractor={(item) => item.name}
          // onEndReached={() => setDataIndex((pre) => pre + 1)}
          onEndReached={() => console.log('end of list!')}
          renderItem={({ item }) => (
            <Item
              image={item.image}
              title={item.name}
              type={item.customer_type}
              group={item.customer_group}
            />
          )}
          onScroll={(event) => {
            // console.log(event.nativeEvent.contentOffset.y);
            let BottomDetect = event.nativeEvent.contentOffset.y > 60 && event.nativeEvent.contentOffset.y <= 80;

            if (!BottomDetect) {
            } else {
              if (dataIndex < data.length)
                dataIndex + length < data.length ? setDataIndex((post) => post + length) : setDataIndex(data.length);
            }
          }}
        />
      </GetScreenSize>
    </View>
  );
}
