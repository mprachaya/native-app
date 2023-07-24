import { HStack, Skeleton, VStack } from 'native-base';

export const PurchaseOrderListSkeleton = (props) => (
  <VStack
    maxW='full'
    space={4}
    overflow='hidden'
    rounded='md'
  >
    <Skeleton h='12' />
    <Skeleton.Text lines={3} />
  </VStack>
);
