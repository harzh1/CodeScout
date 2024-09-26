import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      display="flex"
      marginLeft="auto"
      alignItems="center"
      justifyContent="center"
      w="150%"
      borderRadius="md"
      borderWidth={0.1}
      bg="gray.200"
    >
      <Box
        width="100%"
        maxW="500px"
        p={8}
        borderWidth={1}
        borderRadius="md"
        bg="white"
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                bg="gray.100"
                width="100%"
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                bg="gray.100"
                width="100%"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="gray.100"
                width="100%"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="gray.100"
                width="100%"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full" mt={4}>
              Sign Up
            </Button>
            <Box marginLeft="auto"  marginRight="auto"  display="flex" alignItems="center" justifyContent="centre" mt={4}>
              <SocialIcon url="https://github.com" />
              <SocialIcon url="https://google.com" />
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;