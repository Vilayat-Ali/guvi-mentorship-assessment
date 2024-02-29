import {
  Flex,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useAppSelector } from '../../redux';
import { useNavigate } from 'react-router-dom';

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

import RegisterForm from '../../components/forms/RegisterForm';
import LoginForm from '../../components/forms/LoginForm';

const Account = () => {
  const navigate = useNavigate();
  const email: string = useAppSelector((state) => state.user).email;

  useEffect(() => {
    if(email !== "") {
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <Flex width='100vw' height='100vh' justifyContent={'center'} alignItems={'center'}>
       <Tabs isLazy>
        <TabList>
          <Tab>Sign Up</Tab>
          <Tab>Sign In</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
          <TabPanel>
            <LoginForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default Account