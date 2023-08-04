import React from 'react';
import GetScreenSize from '../../../hooks/GetScreenSize';
import { CustomSort } from '../../../components/CustomFilter';
import { Center, HStack, VStack } from 'native-base';
import { SearchInputFilled } from '../../../components/Inputs';
import { SPACING } from '../../../constants/theme';
import IconButtonStyled from '../../../components/IconButtonStyled';

function Header({
  sort,
  setSort,
  sortOption,
  modalSearch,
  searchCheck,
  setSortOption,
  InitialSearchState,
  handleSearchChange,
  sortOptionDisplay,
  setSortOptionDisplay,
}) {
  return (
    <React.Fragment>
      {/* functional for android device */}
      <GetScreenSize
        from={'sm'}
        to={'md'}
      >
        <VStack
          space={2}
          h={'24'}
          mb={6}
        >
          <GetScreenSize
            from={'sm'}
            to={'md'}
          >
            <HStack
              mx={4}
              justifyContent={'center'}
            >
              {modalSearch}
              {searchCheck > 0 && (
                <HStack justifyContent={'center'}>
                  <IconButtonStyled
                    active={true}
                    icon={'clearFilter'}
                    variant={'contained'}
                    OnPress={() => handleSearchChange(InitialSearchState)}
                  />
                </HStack>
              )}
            </HStack>
          </GetScreenSize>

          <Center>
            <CustomSort
              sort={sort}
              setSort={setSort}
              sortOption={sortOption}
              setSortOption={setSortOption}
              sortOptionDisplay={sortOptionDisplay}
              setSortOptionDisplay={setSortOptionDisplay}
            />
          </Center>
        </VStack>
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
            <SearchInputFilled
              handleChange={(text) => handleSearchChange((pre) => ({ ...pre, id: text }))}
              label={'ID'}
            />
            <SearchInputFilled
              handleChange={(text) => handleSearchChange((pre) => ({ ...pre, supplier: text }))}
              label={'Supplier'}
            />
            <SearchInputFilled
              handleChange={(text) => handleSearchChange((pre) => ({ ...pre, status: text }))}
              label={'Status'}
            />
            <SearchInputFilled
              handleChange={(text) => handleSearchChange((pre) => ({ ...pre, company: text }))}
              label={'Company'}
            />
          </VStack>
          <CustomSort
            sort={sort}
            setSort={setSort}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortOptionDisplay={sortOptionDisplay}
            setSortOptionDisplay={setSortOptionDisplay}
          />
        </HStack>
      </GetScreenSize>
    </React.Fragment>
  );
}

export default Header;
