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

export const CustomerSkeletonBase = (props) => (
  <VStack
    m={2}
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

export const CustomerSkeletonLg = (props) => (
  <VStack
    m={2}
    maxW='full'
    space={4}
    overflow='hidden'
    rounded='md'
    {...props}
  >
    {new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).map((d) => (
      <HStack
        key={d}
        space={4}
        w={'1/4'}
      >
        <Skeleton h='24' />
        <Skeleton.Text
          h='24'
          lines={3}
        />
        <Skeleton h='24' />
        <Skeleton.Text
          h='24'
          lines={3}
        />
      </HStack>
    ))}
  </VStack>
);
