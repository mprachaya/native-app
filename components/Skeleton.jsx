import { HStack, Skeleton, VStack } from 'native-base';

export const PurchaseOrderListSkeleton = (props) => (
  <VStack
    maxW='full'
    space={4}
    overflow='hidden'
    rounded='md'
    {...props}
  >
    <Skeleton h='24' />
    <Skeleton.Text
      h='24'
      lines={3}
    />
  </VStack>
);
