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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";

const userId = localStorage.getItem("userId");

function ProfilePage() {
  const [usernames, setUsernames] = useState({
    codeforces: localStorage.getItem("codeforcesUsername") || "",
    leetcode: localStorage.getItem("leetcodeUsername") || "",
    codechef: localStorage.getItem("codechefUsername") || "",
    atcoder: localStorage.getItem("atcoderUsername") || "",
  });
  const [initialUsernames, setInitialUsernames] = useState(usernames);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChanged, setIsChanged] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const domain = import.meta.env.VITE_APP_DOMAIN;

  const handleInputChange = (platform, value) => {
    setUsernames((prev) => ({ ...prev, [platform]: value }));
    const changesMade = Object.keys(initialUsernames).some(
      (platform) => initialUsernames[platform] !== value
    );
    setIsChanged(changesMade);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    try {
      for (const platform in usernames) {
        if (usernames[platform] !== initialUsernames[platform]) {
          await fetch(`${domain}/api/users/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              platformUrl: `${platform}.com`,
              newUsername: usernames[platform],
            }),
          });
        }
      }

      // Update local storage
      for (const platform in usernames) {
        localStorage.setItem(`${platform}Username`, usernames[platform]);
      }

      setInitialUsernames(usernames);
      setIsChanged(false);
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
    setIsChanged(false);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Box p={6} maxW="6xl" mx="auto">
        <Heading as="h1" size="lg" mb={6} textAlign="left">
          Hi, {localStorage.getItem("firstName")}!
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
}

export default ProfilePage;
