import { Button, Center, ChevronLeftIcon, HStack, Text, VStack, View } from 'native-base';
import React from 'react';
import { COLORS } from '../../../../constants/theme';

// wrap components
const ContainerStyled = (props) => {
  return (
    <View
      bg={'blueGray.50'}
      height={1200}
      {...props}
    >
      {props.children}
    </View>
  );
};

function ItemDetails({ navigation, route }) {
  const { data } = route.params;

  const CustomNumberText = ({ children, label }) => (
    <HStack
      space={6}
      justifyContent={'space-between'}
    >
      <Text fontSize={'xs'}>{label + ': '}</Text>
      <Text fontSize={'xs'}>{parseFloat(children).toFixed(2)}</Text>
    </HStack>
  );
  const BackButton = () => (
    <Button
      position={'absolute'}
      left={2}
      top={2}
      m={2}
      px={2}
      rounded={'lg'}
      variant={'unstyled'}
      background={COLORS.lightWhite}
      _pressed={{ background: COLORS.white }}
      _text={{ fontSize: 'xs', fontWeight: 'bold', color: COLORS.tertiary }}
      onPress={() => {
        navigation.pop();
      }}
    >
      <ChevronLeftIcon />
    </Button>
  );

  return (
    <ContainerStyled>
      <BackButton />
      <Center m={12}>
        <Text fontWeight={'bold'}>{data.item_name} Details</Text>
        <VStack
          my={6}
          space={2}
          width={220}
        >
          <HStack
            space={6}
            justifyContent={'space-between'}
          >
            <Text fontSize={'xs'}>{'Code: '}</Text>
            <Text fontSize={'xs'}>{data.item_code}</Text>
          </HStack>

          <HStack
            space={6}
            justifyContent={'space-between'}
          >
            <Text fontSize={'xs'}>{'Group: '}</Text>
            <Text fontSize={'xs'}>{data.item_group}</Text>
          </HStack>
          <HStack
            space={6}
            justifyContent={'space-between'}
          >
            <Text fontSize={'xs'}>{'UOM: '}</Text>
            <Text fontSize={'xs'}>{data.uom}</Text>
          </HStack>
          <CustomNumberText label={'Quantity'}>{data.qty}</CustomNumberText>
          <CustomNumberText label={'Conversion Factor'}>{data.conversion_factor}</CustomNumberText>
          <CustomNumberText label={'Qty as per Stock'}>{data.stock_qty}</CustomNumberText>
          <CustomNumberText label={'Discount Amount:'}>{data.discount_amount}</CustomNumberText>
          <CustomNumberText label={'Price List Rate'}>{data.price_list_rate}</CustomNumberText>
          <CustomNumberText label={'Base Price List Rate'}>{data.base_price_list_rate}</CustomNumberText>
          <CustomNumberText label={'Rate'}>{data.rate}</CustomNumberText>
          <CustomNumberText label={'Net Rate'}>{data.net_rate}</CustomNumberText>
          <HStack
            space={6}
            justifyContent={'space-between'}
          >
            <Text fontSize={'xs'}>{'Margin Type:  '}</Text>
            <Text fontSize={'xs'}> {data.margin_type !== '' ? data.margin_type : 'none'}</Text>
          </HStack>
          <CustomNumberText label={'Margin Rate or Amount'}>{data.margin_rate_or_amount}</CustomNumberText>
          <CustomNumberText label={'Rate With Margin'}>{data.rate_with_margin}</CustomNumberText>
        </VStack>
      </Center>
    </ContainerStyled>
  );
}

export default ItemDetails;
