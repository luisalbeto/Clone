'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import React, { useCallback, useState } from 'react';
import MenuItem from './MenuItem';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';


interface UserMenuProps{
  currentUser?: SafeUser | null;
}

const UserMenu:React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const RentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  },[]);

  const onRent = useCallback (() => {
    if(!currentUser){
      return LoginModal.onOpen();
    }

    RentModal.onOpen();
  },[currentUser,LoginModal, RentModal]);

  return(

    <div className="relative">
      <div className="flex flex-row items-center gap-3">

        <div
          onClick={onRent}
          className="
          hidden
          md:block
          text-sm
          font-semibold
          py-3
          px-4
          rounded-full
          hover:bg-neutral-100
          transition
          cursor-pointer
          "
          >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            ">

        <AiOutlineMenu/>

          <div className='hidden md:block'>
            <Avatar src={currentUser?.image}/>
          </div>
        
        </div>
        
      </div>

      {isOpen && (
        <div
          className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            rigth-0
            top-12
            text-sm
                    '>

                    
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (<> 
              <MenuItem
              onClick={() => router.push("/trips")}
              label='My trips'/>

              <MenuItem
              onClick={() => {}}
              label='My favorites'/>
                
              <MenuItem
              onClick={() => router.push("/reservations")}
              label='My reservations'/>
              <MenuItem
              onClick={() => {}}
              label='My properties'/>
              <MenuItem
              onClick={RentModal.onOpen}
              label='Airbnb my home'/>
              <hr/>
              <MenuItem
              onClick={() => signOut()}
              label='Logout'/>
            </>

            ):(

            <> 
              <MenuItem
              onClick={LoginModal.onOpen}
              label='Login'/>

              <MenuItem
              onClick={RegisterModal.onOpen}
              label='Sing Up'
              />
            </>
            )}
          </div>
        </div>  
        )}


      </div>


     
              
  );   
};

export default UserMenu;