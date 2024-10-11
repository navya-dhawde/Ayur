import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'


const UserProfilePage = () => {
  return (
   <div>
   <Navbar/>
   <h1 className='flex justify-center text-3xl shadow-slate-800'>My Profile</h1>
   <UserProfile/>
   </div>
  )
}

export default UserProfilePage
