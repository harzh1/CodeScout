import { useState, useEffect } from "react";
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
  Checkbox,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const userId = localStorage.getItem("userId");

const ProfilePage = ({ firstName, fetchUsernames, saveUsernames }) => {
  const [usernames, setUsernames] = useState({
    codeforces: "",
    leetcode: "",
    codechef: "",
    atcoder: "",
  });
  const [initialUsernames, setInitialUsernames] = useState(usernames);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChanged, setIsChanged] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const [filterSettings, setFilterSettings] = useState({
    codeforces: false,
    leetcode: false,
    atcoder: false,
    codechef: false,
  });
  const domain = import.meta.env.VITE_APP_DOMAIN;

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchUsernames();
      setUsernames(data);
      setInitialUsernames(data);
    };
    fetchInitialData();
  }, [fetchUsernames]);

  const handleInputChange = (platform, value) => {
    setUsernames((prev) => ({ ...prev, [platform]: value }));
    const changesMade = Object.keys(initialUsernames).some(
      (platform) => initialUsernames[platform] !== value
    );
    setIsChanged(changesMade);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    try {
      // Sending PUT request to update the username
      await axios.patch(
        `${domain}/api/users/${userId}`,
        {
          platformUrl: "platform", // Replace with actual platform URL (e.g., codeforces)
          newUsername: usernames.codeforces, // Replace with appropriate username (from the state)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        }
      );
      // Assuming saveUsernames is responsible for saving the data locally
      saveUsernames(usernames);
      setInitialUsernames(usernames);
      setIsChanged(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
    setUsernames({
      codeforces: "",
      leetcode: "",
      codechef: "",
      atcoder: "",
    });
    setIsChanged(false);
  };

  const handleFilterChange = (platform) => {
    setFilterSettings((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Box p={6} maxW="6xl" mx="auto">
        <Heading as="h1" size="lg" mb={6} textAlign="left">
          Hi, {firstName}!
        </Heading>

        <Flex>
          <Box w="20%">
            <Tabs
              orientation="vertical"
              variant="soft-rounded"
              colorScheme="blue"
              onChange={handleTabChange}
              index={tabIndex}
            >
              <TabList>
                <Tab>Change Username</Tab>
                <Tab>Filter Websites</Tab>
                <Tab>Delete Account</Tab>
                <Tab>Contact Us</Tab>
              </TabList>
            </Tabs>
          </Box>

          <Box flex="1" ml={6}>
            <Tabs isFitted index={tabIndex}>
              <TabPanels>
                {/* Change Username Tab */}
                <TabPanel>
                  <Heading size="md" mb={4}>
                    Change Username
                  </Heading>
                  <Box border="1px solid #e2e8f0" borderRadius="md" p={4}>
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
                            onChange={(e) =>
                              handleInputChange("codeforces", e.target.value)
                            }
                          />
                        </TabPanel>
                        <TabPanel>
                          <Input
                            placeholder="Leetcode Username"
                            value={usernames.leetcode}
                            onChange={(e) =>
                              handleInputChange("leetcode", e.target.value)
                            }
                          />
                        </TabPanel>
                        <TabPanel>
                          <Input
                            placeholder="Codechef Username"
                            value={usernames.codechef}
                            onChange={(e) =>
                              handleInputChange("codechef", e.target.value)
                            }
                          />
                        </TabPanel>
                        <TabPanel>
                          <Input
                            placeholder="Atcoder Username"
                            value={usernames.atcoder}
                            onChange={(e) =>
                              handleInputChange("atcoder", e.target.value)
                            }
                          />
                        </TabPanel>
                      </TabPanels>
                    </Tabs>

                    <Button
                      mt={4}
                      colorScheme={isChanged ? "green" : "gray"}
                      onClick={handleSaveChanges}
                      isDisabled={!isChanged}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </TabPanel>

                {/* Filter Websites Tab */}
                <TabPanel>
                  <Box border="1px solid #e2e8f0" borderRadius="md" p={4}>
                    <Heading size="md" mb={4}>
                      Filter Websites
                    </Heading>
                    <VStack align="stretch" spacing={3}>
                      <Flex
                        justify="space-between"
                        align="center"
                        border="1px solid #e2e8f0"
                        p={2}
                        borderRadius="md"
                      >
                        <span>Codeforces</span>
                        <Checkbox
                          isChecked={filterSettings.codeforces}
                          onChange={() => handleFilterChange("codeforces")}
                        />
                      </Flex>
                      <Flex
                        justify="space-between"
                        align="center"
                        border="1px solid #e2e8f0"
                        p={2}
                        borderRadius="md"
                      >
                        <span>Leetcode</span>
                        <Checkbox
                          isChecked={filterSettings.leetcode}
                          onChange={() => handleFilterChange("leetcode")}
                        />
                      </Flex>
                      <Flex
                        justify="space-between"
                        align="center"
                        border="1px solid #e2e8f0"
                        p={2}
                        borderRadius="md"
                      >
                        <span>Codechef</span>
                        <Checkbox
                          isChecked={filterSettings.codechef}
                          onChange={() => handleFilterChange("codechef")}
                        />
                      </Flex>
                      <Flex
                        justify="space-between"
                        align="center"
                        border="1px solid #e2e8f0"
                        p={2}
                        borderRadius="md"
                      >
                        <span>Atcoder</span>
                        <Checkbox
                          isChecked={filterSettings.atcoder}
                          onChange={() => handleFilterChange("atcoder")}
                        />
                      </Flex>
                    </VStack>
                  </Box>
                </TabPanel>

                {/* Delete Account Tab */}
                <TabPanel>
                  <Box border="1px solid #e2e8f0" borderRadius="md" p={4}>
                    <Heading size="md" mb={4}>
                      Delete Account
                    </Heading>
                    <Button colorScheme="red" onClick={onOpen}>
                      Delete Account
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Delete Account</ModalHeader>
                        <ModalBody>
                          All data will be wiped out. Are you sure?
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="red"
                            mr={3}
                            onClick={() => console.log("Account deleted")}
                          >
                            Confirm
                          </Button>
                          <Button variant="ghost" onClick={onClose}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                </TabPanel>

                {/* Contact Us Tab */}
                <TabPanel>
                  <Box border="1px solid #e2e8f0" borderRadius="md" p={4}>
                    <Heading size="md" mb={4}>
                      Contact Us
                    </Heading>
                    <p>
                      If you have any questions, reach out to
                      support@website.com.
                    </p>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default ProfilePage;
