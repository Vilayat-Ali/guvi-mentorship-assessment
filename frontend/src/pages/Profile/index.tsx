import { Avatar, Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { useAppSelector } from "../../redux";

const Profile = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Navbar />
      <Box maxW="xl" mx="auto" p="4">
        <Flex alignItems="center" mb="4">
          <Avatar size="xl" name={user.username} src="https://bit.ly/broken-link" />
          <Box ml="4">
            <Heading size="lg">{user.username}</Heading>
            <Text fontSize="sm" color="gray.600">Contact @ {user.email}</Text>
          </Box>
        </Flex>
      </Box>

        <Divider my="4" />

        <Text fontSize={'2vw'} textAlign={'center'}>Your Profile Goes HERE</Text>
    </>
  );
};

export default Profile;
