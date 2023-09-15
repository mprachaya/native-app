import React, { useEffect, useState } from 'react';
import { Center, FlatList, HStack, Pressable, Spinner, Text, VStack, View } from 'native-base';
import { CustomerSkeletonBase, CustomerSkeletonLg } from '../../../../components';
import { Dimensions } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import GetScreenSize from '../../../../hooks/GetScreenSize';
import useConfig from '../../../../config/path';

export function SalesOrderList({ data, reload, setReload, returnDataIndex, handleClickDetails }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const [dataIndex, setDataIndex] = useState(20);
  const length = 20;
  const [loadMore, setLoadMore] = useState(false);
  const [tempIndex, setTempIndex] = useState(0);

  const Item = React.memo(({ name, title, total, date, status }) => (
    <Pressable
      mb={2}
      // px={2}
      py={6}
      rounded={12}
      w={'full'}
      bg={COLORS.lightWhite}
      shadow={1}
      _pressed={{ bg: COLORS.white }}
      onPress={() => handleClickDetails(name)}
    >
      <HStack ml={6}>
        <VStack
          mb={6}
          w={'full'}
          // ml={2.5}
          justifyContent={'center'}
          justifyItems={'start'}
        >
          <HStack space={1.5}>
            <Text
              w={48}
              fontSize={'xs'}
              fontWeight={'bold'}
            >
              {name}
            </Text>
          </HStack>
          <HStack space={1.5}>
            <Text
              w={48}
              fontSize={'xs'}
            >
              {title}
            </Text>
          </HStack>
        </VStack>
        <Text
          color={COLORS.gray}
          fontSize={'xs'}
          position={'absolute'}
          bottom={0}
          left={0}
        >
          Total: {parseInt(total).toFixed(2)}
        </Text>
        <View
          py={2}
          px={4}
          position={'absolute'}
          bottom={6}
          right={6}
          rounded={6}
          // Draft ,To Deliver ,Deliver and Bill
          // Draft
          //   - This is the initial status of a Sales Order. It indicates that the order has been created but not yet submitted.
          // To Deliver
          //   - Once a Sales Order is ready for processing, it is submitted. This status signifies that the order is in the queue for further action.
          // To Bill
          //   - This status indicates that the Sales Order is ready to be invoiced. It typically means that the items in the order are in stock and can be shipped.
          // To Deliver and Bill
          //   - This status indicates that the Sales Order is ready to be delivered and invoiced. It implies that the items are in stock and can be both shipped and billed.
          // Completed
          //   - This status signifies that the Sales Order has been fulfilled. It may mean that the items have been shipped and invoiced, and the transaction is considered closed.
          // Cancelled
          //   - A Sales Order with this status has been cancelled and will not be processed further.
          // On Hold
          //   - This status is used to indicate that the Sales Order is temporarily halted and not being processed at the moment.
          // Stopped
          //   - This status is similar to "On Hold" and signifies that the Sales Order has been stopped and is not being processed.
          // Lost
          //   - This status is used when a Sales Order is not won and is considered lost.
          // Closed
          //   - This status typically means that the Sales Order has been closed and is no longer active.

          bg={
            status === 'Draft' // default status
              ? 'error.200'
              : status === 'To Deliver and Bill' // show when already create invoice
              ? 'warning.200'
              : status === 'To Deliver' // show when summit Sales Order (Status from To Deliver and Bill To Deliver) already create invoice
              ? 'warning.200'
              : status === 'Completed'
              ? 'success.200'
              : status === 'Cancelled'
              ? 'error.200'
              : status === 'Closed'
              ? 'error.200'
              : status === 'On Hold'
              ? 'error.200'
              : 'blue.200'
          }
        >
          <Text
            color={'white'}
            fontSize={'xs'}
            fontWeight={'bold'}
          >
            {status}
          </Text>
        </View>
        <Text
          color={COLORS.gray}
          fontSize={'xs'}
          position={'absolute'}
          bottom={0}
          right={6}
        >
          {date}
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
    if (data !== undefined && data !== null) {
      if (Object.values(data)?.length - dataIndex < 0) returnDataIndex(Object.values(data).length);
      else {
        returnDataIndex(dataIndex);
      }
    }
    // console.log('data: ', data);
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

  if (data === null || Object.values(data)?.length === 0) {
    return (
      <Center m={10}>
        <Text>No Data Available</Text>
      </Center>
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
          data={data?.slice(0, dataIndex)}
          // numColumns={2}
          // columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item) => item.name}
          onEndReached={() =>
            dataIndex < data?.length && dataIndex + length < data?.length
              ? handleScrollEnd(dataIndex + length)
              : handleScrollEnd(data?.length)
          }
          removeClippedSubviews={true}
          maxToRenderPerBatch={3}
          initialNumToRender={2}
          ListFooterComponent={() =>
            loadMore && dataIndex !== data?.length ? (
              <View>
                <Spinner />
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <Item
              name={item.name}
              title={item.customer_name}
              type={item.customer_type}
              group={item.customer_group}
              status={item.status}
              date={item.transaction_date}
              total={item.total}
            />
          )}
        />
      </GetScreenSize>
      <GetScreenSize
        from={'sm'}
        to={'md'}
      >
        <FlatList
          data={data?.slice(0, dataIndex)}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              title={item.customer_name}
              type={item.customer_type}
              group={item.customer_group}
              status={item.status}
              date={item.transaction_date}
              total={item.total}
            />
          )}
          removeClippedSubviews={true}
          maxToRenderPerBatch={3}
          initialNumToRender={2}
          onEndReached={() =>
            dataIndex < data?.length && dataIndex + length < data?.length
              ? handleScrollEnd(dataIndex + length)
              : handleScrollEnd(data?.length)
          }
          ListFooterComponent={() =>
            loadMore && dataIndex !== data?.length ? (
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
