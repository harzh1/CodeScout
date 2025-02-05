import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa"; // Importing GitHub and Google icons
import { NavLink, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_APP_DOMAIN;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${domain}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const responseData = await response.json();
      const { userId, token } = responseData;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = () => {
    // GitHub sign-up logic here
    window.location.href = "https://github.com/login/oauth/authorize";
  };

  const handleGoogleSignup = () => {
    // Google sign-up logic here
    window.location.href = "https://accounts.google.com/signin/oauth"; // Example URL
  };

  return (
    <Box
      mt={8}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      style={{ backgroundColor: "white" }}
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
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt={4}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
            <NavLink to="/Login">
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                mt={5}
                variant="outline"
              >
                Switch to Login
              </Button>
            </NavLink>
            <Box
              marginLeft="auto"
              marginRight="auto"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={4}
            >
              <IconButton
                icon={<FaGithub />}
                onClick={handleGithubSignup}
                aria-label="Sign up with GitHub"
                colorScheme="gray"
                size="lg"
                mr={4}
              />
              <IconButton
                icon={<FaGoogle />}
                onClick={handleGoogleSignup}
                aria-label="Sign up with Google"
                colorScheme="red"
                size="lg"
              />
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
