import React from 'react'

import { useAppSelector } from '../redux';
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const AuthProtected = ({ children }: Props) => {
    const navigate = useNavigate();
    const { id } = useAppSelector((state) => state.user);

    React.useEffect(() => {
        if(id === "") {
            navigate("/account");
        }
    });

  return (
    <React.Fragment>
        {children}
    </React.Fragment>
  )
}

export default AuthProtected