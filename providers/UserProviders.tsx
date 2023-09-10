'use client'

import { MyUserContextProvider } from '@/hooks/useUser';
import React from 'react'

interface UserProvidersProps {
    children: React.ReactNode;
}

const UserProviders: React.FC<UserProvidersProps> = ({
    children
}) => {
  return (
    <MyUserContextProvider>
        {children}
    </MyUserContextProvider>
  )
}

export default UserProviders