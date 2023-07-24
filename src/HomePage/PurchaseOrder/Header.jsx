import React from 'react';
import GetScreenSize from '../../../hooks/GetScreenSize';
import { CustomSort } from '../../../components/CustomFilter';
import { HStack, VStack } from 'native-base';
import { SearchInputFilled } from '../../../components/Inputs';
import { SPACING } from '../../../constants/theme';

function Header({ sort, setSort, sortOption, setSortOption }) {
  return (
    <React.Fragment>
      {/* functional for android device */}
      <GetScreenSize
        from={'sm'}
        to={'md'}
      >
        <CustomSort
          sort={sort}
          setSort={setSort}
          sortOption={sortOption}
          handleChange={setSortOption}
        />
      </GetScreenSize>
      {/* functional for ios device */}
      <GetScreenSize
        from={'md'}
        to={'lg'}
      >
        <HStack
          w={1000}
          mb={12}
          justifyContent={'space-between'}
        >
          <VStack space={SPACING.small}>
            <SearchInputFilled label={'ID'} />
            <SearchInputFilled label={'Supplier'} />
            <SearchInputFilled label={'Status'} />
            <SearchInputFilled label={'Company'} />
          </VStack>
          <CustomSort
            sort={sort}
            setSort={setSort}
            sortOption={sortOption}
            handleChange={setSortOption}
          />
        </HStack>
      </GetScreenSize>
    </React.Fragment>
  );
}

export default Header;
