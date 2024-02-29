import {
    AiFillEye,
    AiFillEyeInvisible
} from 'react-icons/ai';

import { Icon, HStack, Input, Button, Box, Flex } from '@chakra-ui/react';
import useToggle from '../hooks/useToggle';
import { ChangeEvent } from 'react';

type Props = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({
    handleChange
}: Props) => {
    const [toShow, Toggle] = useToggle(false);

  return (
    <Flex direction='row' justifyContent='space-between' alignItems='center' width='100%'>
        <Input width='85%' type={toShow ? "text" : "password"} name="password" placeholder={toShow ? "password@123" : "XXXX"} onChange={handleChange} />
        <Button width='10%' onClick={Toggle}>
            <Icon as={toShow ? AiFillEye : AiFillEyeInvisible} />
        </Button>
    </Flex>
  )
}

export default PasswordField