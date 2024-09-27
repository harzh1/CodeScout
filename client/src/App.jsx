import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

const ProfilePage = ({ firstName, onSignOut, fetchUsernames, saveUsernames }) => {
  const [usernames, setUsernames] = useState({
    codeforces: '',
    leetcode: '',
    codechef: '',
    atcoder: '',
  });
  const [initialUsernames, setInitialUsernames] = useState(usernames);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    // Fetch the current usernames from the database (simulated by fetchUsernames function)
    const fetchInitialData = async () => {
      const data = await fetchUsernames();
      setUsernames(data);
      setInitialUsernames(data);
    };
    fetchInitialData();
  }, [fetchUsernames]);

  const handleInputChange = (platform, value) => {
    setUsernames((prev) => ({ ...prev, [platform]: value }));

    // Check if any changes have been made
    const changesMade = Object.keys(initialUsernames).some(
      (platform) => initialUsernames[platform] !== value
    );
    setIsChanged(changesMade);
  };

  const handleSaveChanges = () => {
    // Save the updated usernames to the database
    saveUsernames(usernames);
    setInitialUsernames(usernames);
    setIsChanged(false);
  };

  return (
    <Box p={6} maxW="md" mx="auto">
      <Heading as="h1" size="lg" mb={6}>
        Hi, {firstName}!
      </Heading>

      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>Change Username</Tab>
          <Tab>Filter Websites</Tab>
          <Tab>Delete Account</Tab>
          <Tab>Contact Us</Tab>
          <Tab>Log Out</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading size="md" mb={4}>Change Username</Heading>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Codeforces</Tab>
                <Tab>Leetcode</Tab>
                <Tab>Codechef</Tab>
                <Tab>Atcoder</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Input
                    placeholder="Codeforces Username"
                    value={usernames.codeforces}
                    onChange={(e) => handleInputChange('codeforces', e.target.value)}
                  />
                </TabPanel>
                <TabPanel>
                  <Input
                    placeholder="Leetcode Username"
                    value={usernames.leetcode}
                    onChange={(e) => handleInputChange('leetcode', e.target.value)}
                  />
                </TabPanel>
                <TabPanel>
                  <Input
                    placeholder="Codechef Username"
                    value={usernames.codechef}
                    onChange={(e) => handleInputChange('codechef', e.target.value)}
                  />
                </TabPanel>
                <TabPanel>
                  <Input
                    placeholder="Atcoder Username"
                    value={usernames.atcoder}
                    onChange={(e) => handleInputChange('atcoder', e.target.value)}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Button
              mt={4}
              colorScheme={isChanged ? 'green' : 'gray'}
              onClick={handleSaveChanges}
              isDisabled={!isChanged}
            >
              Save Changes
            </Button>
          </TabPanel>

          <TabPanel>
            <Heading size="md">Filter Websites</Heading>
            {/* Your logic for filtering websites */}
          </TabPanel>

          <TabPanel>
            <Heading size="md" mb={4}>Delete Account</Heading>
            <Button colorScheme="red" onClick={onOpen}>Delete Account</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Account</ModalHeader>
                <ModalBody>All data will be wiped out. Are you sure?</ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={() => console.log('Account deleted')}>
                    Confirm
                  </Button>
                  <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>

          <TabPanel>
            <Heading size="md" mb={4}>Contact Us</Heading>
            <p>If you have any questions, reach out to support@website.com.</p>
          </TabPanel>

          <TabPanel>
            <Heading size="md" mb={4}>Log Out</Heading>
            <Button colorScheme="gray" onClick={onSignOut}>Log Out</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
