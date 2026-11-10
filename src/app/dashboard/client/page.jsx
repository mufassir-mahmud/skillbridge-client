 "use client"
import DashboardStats from '@/components/dashboard/DashboardStats';
import { authClient } from '@/lib/auth-client';
import React from 'react';

const ClientPage = () => {
    const { data: session, isPending } = authClient.useSession();
     console.log(session);
     const user = session?.user
    return (
        <div>
            <div className='mt-10 ml-10'>
                <p className='text-sm text-[#8661F1] font-semibold'>Client workspace</p>
                <h2 className='my-3 text-2xl font-semibold'>Welcome back {user?.name}</h2>
                <p className='text-sm text-gray-400'>Your projects are moving forward. Here’s the latest.</p>
            </div>
            <div className='w-11/12 mx-auto mt-5'>
                <DashboardStats role="client" />
            </div>
        </div>
    );
};

export default ClientPage;