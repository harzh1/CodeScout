import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, IconButton } from '@chakra-ui/react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { NavLink, useNavigate } from "react-router-dom";

const users = [
  {
    name: "John@gmail.com",
    password: "J0hn$2024!"
  },
  {
    name: "Alice@gmail.com",
    password: "Alic3#2024!"
  },
  {
    name: "Michael@gmail.com",
    password: "M1ch@el2024!"
  },
  {
    name: "Sarah@gmail.com",
    password: "S4rah%2024!"
  },
  {
    name: "dhruv@gmail.com",
    password: "test123"
  }
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email and password match
    const user = users.find(user => user.name === email && user.password === password);
    if (user) {
      // Redirect to home page if credentials are correct
      navigate('/');
    } else {
      // Handle incorrect login (optional)
      alert('Invalid email or password');
    }
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
    <div style={{ minHeight: '100vh' }}>
      <Box mt={8} display="flex" alignItems="center" justifyContent="center" w="100%" style={{ backgroundColor: 'white' }}>
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
              <NavLink to="/signup">
                <Button type="button" colorScheme="blue" width="full" mt={5} variant="outline">
                  Switch to Sign up
                </Button>
              </NavLink>
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
    </div>
  );
};

export default LoginPage;
