import { Button, FormControl, HStack, Input, Modal, Text } from 'native-base';
import React, { useState } from 'react';
import IconButtonStyled from './IconButtonStyled';
import ButtonStyled from './ButtonStyled';

function ModalStyled({ header, bodyContent, submitLabel, onlyCloseButton, searchTag }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <IconButtonStyled
        // variant={'text'}
        label={'Search By :'}
        icon='search'
        etc={searchTag}
        OnPress={() => setOpenModal(true)}
      />

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        safeAreaTop={true}
      >
        <Modal.Content
          bg={'blueGray.100'}
          maxWidth='350'
          {...styles['top']}
        >
          <Modal.Header>{header}</Modal.Header>
          <Modal.Body>{bodyContent}</Modal.Body>
          <Modal.Footer>
            <HStack>
              <ButtonStyled
                label={'Close'}
                variant={'outlined'}
                handleClick={() => setOpenModal(false)}
              />
              {!onlyCloseButton && (
                <ButtonStyled
                  label={submitLabel}
                  variant={'contained'}
                  handleClick={() => setOpenModal(false)}
                />
              )}
            </HStack>
            {/* <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button onPress={() => setOpenModal(false)}>Save</Button>
            </Button.Group> */}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
const styles = {
  top: {
    marginBottom: 'auto',
    marginTop: 20,
  },
};

export default ModalStyled;
