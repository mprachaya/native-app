import React, { useEffect, useState } from 'react';
import { Box, FlatList, HStack, Image, Pressable, Spinner, Text, VStack, View } from 'native-base';
import { CustomerSkeletonBase, CustomerSkeletonLg } from '../../../../components';
import { Dimensions } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { url } from '../../../../config';
import GetScreenSize from '../../../../hooks/GetScreenSize';

export function CustomerList({ data, token, reload, setReload, returnDataIndex, handleClickDetails }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [dataIndex, setDataIndex] = useState(20);
  const length = 20;
  const [loadMore, setLoadMore] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);

  const Item = React.memo(({ name, image, title, type, group }) => (
    <Pressable
      mb={2}
      mx={1.5}
      px={2}
      py={3}
      rounded={12}
      w={{ base: SCREEN_WIDTH - 48, lg: '48%' }}
      bg={COLORS.lightWhite}
      shadow={1}
      _pressed={{ bg: COLORS.white }}
      onPress={() => handleClickDetails(name)}
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
    </Pressable>
  ));

  const handleScrollEnd = (number) => {
    setLoadMore(true);
    setTempIndex(number);
  };
  useEffect(() => {
    if (reload) {
      setTimeout(() => {
        setReload(false);
      }, 1000);
    }
  }, [reload]);

  useEffect(() => {
    if (loadMore) {
      setTimeout(() => {
        setLoadMore(false);
      }, 50);

      setTimeout(() => {
        setDataIndex(tempIndex);
        returnDataIndex(tempIndex);
      }, 0);
    }
  }, [loadMore]);

  useEffect(() => {
    if (Object.values(data).length - dataIndex < 0) returnDataIndex(Object.values(data).length);
    else {
      returnDataIndex(dataIndex);
    }
  }, [data]);

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
      h={{ base: 450, lg: 800 }}
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
          onEndReached={() =>
            dataIndex < data.length && dataIndex + length < data.length
              ? handleScrollEnd(post + length)
              : handleScrollEnd(data.length)
          }
          removeClippedSubviews={true}
          maxToRenderPerBatch={3}
          initialNumToRender={2}
          ListFooterComponent={() =>
            loadMore && dataIndex !== data.length ? (
              <View>
                <Spinner />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <Item
              name={item.name}
              image={item.image}
              title={item.customer_name}
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
          renderItem={({ item }) => (
            <Item
              name={item.name}
              image={item.image}
              title={item.customer_name}
              type={item.customer_type}
              group={item.customer_group}
            />
          )}
          removeClippedSubviews={true}
          maxToRenderPerBatch={3}
          initialNumToRender={2}
          onEndReached={() =>
            dataIndex < data.length && dataIndex + length < data.length
              ? handleScrollEnd(post + length)
              : handleScrollEnd(data.length)
          }
          ListFooterComponent={() =>
            loadMore && dataIndex !== data.length ? (
              <View>
                <Spinner />
              </View>
            ) : null
          }
        />
      </GetScreenSize>
    </View>
  );
}
