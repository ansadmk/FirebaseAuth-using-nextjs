'use client';
import { browserSessionPersistence, createUserWithEmailAndPassword, setPersistence } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { useRouter } from 'next/navigation';


function Modal({setIsOpen,isOpen}:any) {
  const router=useRouter()
  const firebaseFunction=({email,password}:any)=>{
    setPersistence(auth, browserSessionPersistence)
    .then((data) => {
     console.log(data,'here');
      
      return createUserWithEmailAndPassword(auth, email, password)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage
      
        });
    return 0
  }
  const handlesubmit=(e:any)=>{
    e.preventDefault()
    const pass=e.target.pass.value
    const email=e.target.email.value
    const test=firebaseFunction({email,password:pass})
    if (test) {
      alert(test)
    }else{
      router.push('/')
    }
    
  }


  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex justify-center items-center w-full h-screen '>
      

      {isOpen && (
        <div
          className=""
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Sign in
              </h3>
              <button
                onClick={closeModal}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                back
                
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className=" flex flex-col gap-10 " action="#" onSubmit={handlesubmit} >
                <label htmlFor="email">Email</label>
                <input type="email" name="" id="email" required className='text-black pp rounded-3xl'/>
                <label htmlFor="pass">Password</label>
                <input type="password" name="" id="pass" className='text-black pp rounded-3xl' required/>
                <button className='' >Create</button>
                
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
