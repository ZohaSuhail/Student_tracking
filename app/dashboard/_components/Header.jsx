"use client"
import React from 'react';
import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

function Header() {
    const fallbackImage = "/default-avatar.svg";
    const { user } = useKindeBrowserClient();
    return (
        <div className='p-4 shadow-sm border flex justify-between'>
            <div>
               
            </div>
            <div>
                <Image src={user?.picture || fallbackImage}
                    width={35}
                    height={35}
                    style={{ width: "auto", height: "auto" }}
                    alt='user'
                    className='rounded-full' />
            </div>
        </div>
    )
}

export default Header
