import { Button, Center, Input, useColorModeValue,Heading, Box, chakra, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase/firebase";
import Logo from './Logo.js'

const Card = (props) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    py="8"
    px={{
      base: '4',
      md: '10',
    }}
    shadow="base"
    rounded={{
      sm: 'lg',
    }}
    {...props}
  />
)

const LoginPage = () => {
  const [username, setUsername] = useState("");

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault()
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        history.push({
          pathname: "/rooms",
          state: { username },
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log("errorMessage Login Page", errorMessage)
      });
  };

  return (

    <Box
      minH="100vh"
      py="12"
      px={{
        base: '4',
        lg: '8',
      }}
    >
      <Box maxW="md" mx="auto">
        <Center>
        <Logo
          mx="auto"
          h="8"
          mb={{
            base: '10',
            md: '20',
          }}
        />
        </Center>
        <Heading textAlign="center" size="xl" fontWeight="extrabold" mt="40px">
          Sign in to your account
        </Heading>
        
        <Card mt="20px">

          <chakra.form
            onSubmit={handleLogin}
          >
            <Stack spacing="6">
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input 
                value={username} 
                _focus={{ borderColor: 'purple', boxShadow: '0 0 0 1px purple_53' }} 
                name="username" 
                type="text" 
                required 
                placeholder="Type your username" 
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                />
              </FormControl>
              <Button type="submit" backgroundColor="purple" color="#fff" size="lg" fontSize="md">
                Sign in
              </Button>
            </Stack>
          </chakra.form>
        </Card>
      </Box>
    </Box>

  );
};



/* <Flex>Login</Flex>
<Flex alignItems="center">
  <form className="margin-t">
    <Input
    />
    <Center>
    <Button
      onClick={handleLogin}
     
    >
      Login
    </Button>
    </Center>
  </form>
</Flex>
<Flex>
  <Text as="small"> Chat Application &copy; 2021</Text>
</Flex> */
// </Center>

export default LoginPage;