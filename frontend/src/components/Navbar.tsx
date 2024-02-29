import { Flex, Heading, Button } from "@chakra-ui/react";
import { useAppDispatch } from "../redux";
import { logout } from "../redux/slice/user.slice";

const Navbar = () => {
    const dispatch = useAppDispatch();

  return (
    <Flex p="4" bg="blue.500" color="white" alignItems="center" justifyContent="space-between">
      <Heading size="md">My App</Heading>
      <Button onClick={() => {
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
        dispatch(logout());
      }} variant="outline" colorScheme="whiteAlpha">Logout</Button>
    </Flex>
  );
};

export default Navbar;