import React, { useState } from 'react';
import { Box, Button, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';

const ProfilePage = ({ firstName, onSignOut }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteAccount = () => {
    // Logic to delete account
    console.log('Account deleted');
    setShowDeletePopup(false);
    onClose();
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>Hi, {firstName}</Heading>
      <Box>
        <Button colorScheme="blue" mr={3}>Change Username</Button>
        <Button colorScheme="blue" mr={3}>Filter Websites</Button>
        <Button colorScheme="red" mr={3} onClick={onOpen}>Delete Account</Button>
        <Button colorScheme="gray" onClick={onSignOut}>Sign Out</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account</ModalHeader>
          <ModalBody>
            All data will be wiped out. Are you sure?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteAccount}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePage;