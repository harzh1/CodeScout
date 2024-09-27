import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, IconButton } from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import Header from './Header'; // Adjust the import path as necessary

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic here
  };

  const handleGithubLogin = () => {
    // GitHub login logic here
    window.location.href = 'https://github.com/login/oauth/authorize'; // Example URL for GitHub OAuth
  };

  const handleGoogleLogin = () => {
    // Google login logic here
    window.location.href = 'https://accounts.google.com/signin/oauth'; // Example URL for Google OAuth
  };

  return (
    <>
      <Header />
      <Box mt={8} display="flex" alignItems="center" justifyContent="center" w="100%">
        <Box
          maxW="400px"
          width="100%"
          p={6}
          borderWidth={1}
          borderRadius="md"
          bg="white"
          boxShadow="lg"
        >
          <Heading as="h2" size="lg" mb={6} textAlign="center">
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
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
                Login
              </Button>
              <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                <IconButton
                  icon={<FaGithub />}
                  aria-label="Sign in with GitHub"
                  colorScheme="gray"
                  mx={2}
                  onClick={handleGithubLogin}
                />
                <IconButton
                  icon={<FaGoogle />}
                  aria-label="Sign in with Google"
                  colorScheme="red"
                  mx={2}
                  onClick={handleGoogleLogin}
                />
              </Box>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;