import {ChangeEvent, useState} from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../redux';
import {login} from "../../redux/slice/user.slice";
import { useNavigate } from 'react-router-dom';

import {
    Box, VStack, Card, CardHeader, CardBody, Input, Button, useToast, Text
} from '@chakra-ui/react';

import {ZodError, z} from 'zod';
import PasswordField from '../PasswordField';

const validationSchema = z.object({
  email: z.string().email().toLowerCase().min(1, {
    message: 'Email cannot be left empty'
  }),
  password: z.string().min(8, {
    message: 'Password cannot have less than 8 characters'
  }).max(16, {
    message: 'Password cannot be greater than 16 characters'
  }),
});


const RegisterForm = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState<z.infer<typeof validationSchema>>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            const validatedInput = validationSchema.parse(input);
            const {data} = await axios.post("http://localhost:8000/api/account/login", validatedInput);
            window.localStorage.setItem('jwt', data.access_token);
            window.localStorage.setItem('user', JSON.stringify(data.user));
            dispatch(login({
                username: data.user.username,
                email: data.user.email
            }))
            navigate("/");
             toast({
                title: 'Welcome to your profile',
                description: 'Login successful',
                status: 'success',
                isClosable: true
            })
        } catch(err) {
            if(err instanceof ZodError) {
                for(const zodError of err.errors) {
                    toast({
                        title: "Validation Failed",
                        description: zodError.message,
                        status: 'error',
                        isClosable: true
                    })
                } 
            }
            toast({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                description: (err as any)?.response.data.message as string,
                status: 'error',
                isClosable: true
            })
        }
    }

  return (
    <Box width={{
      md: '20vw',
      base: '85vw'
    }}>
        <Card>
            <CardHeader>
                <Text textAlign='center' fontSize={{
                    base: '6vw',
                    md: '1.5vw'
                }}>Login</Text>
            </CardHeader>
            <CardBody>
                <VStack spacing={'2vh'}>
                    <Input type="email" name="email" placeholder="johndoe@email.com" onChange={handleChange} />
                    <PasswordField handleChange={handleChange} />
                    <Button bgColor='#000' color='white' onClick={handleSubmit}>Login</Button>
                </VStack>
            </CardBody>
        </Card>
    </Box>
  )
}

export default RegisterForm