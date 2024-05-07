'use client';
import Modal from "@/Components/modal";
import Image from "next/image";
import React, { useState } from "react";
import { browserSessionPersistence, getAuth, setPersistence, signInWithRedirect } from "firebase/auth";
import { auth } from "@/Components/firebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter()
  
  const firebaseFunction=()=>{
    setPersistence(auth, browserSessionPersistence)
    .then(async(a:any) => {
    
     return signInWithRedirect(auth, provider).catch((err:any)=>err.message)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      
      return errorMessage
      
    });
    return 0
  }
  const handle=(e:any)=>{
    e.preventDefault()
    const test=firebaseFunction()
    console.log(test, 'hi');
    
    if (test) {
      alert(test)
    }else{
      router.push('/')
    }
    
  }
  console.log(auth);
  
  return (
    <>
    {isOpen ? null: <div className="w-screen h-screen flex flex-col md:flex-row relative">
      <div className="flex w-full h-1/2 md:w-2/5 md:h-full">
        <Image
          src="/signupleft.svg"
          width={128}
          height={128}
          alt=""
          className="object-cover w-full "
        />
      </div>
      <div className=" flex flex-col w-full  md:w-3/5 h-screen md:bg-[#071829] z-0">
        <div className="h-1/3 flex justify-center ">
          <div className="flex flex-col justify-center items-center">
            <div>
              <Image
                src="/Frame 4.png"
                width={128}
                height={128}
                alt=""
                className="object-cover w-full h-2/3 "
              />
            </div>
            <div className="h-1/3">
              Journey to a trillion miles starts from here!!
            </div>
          </div>
        </div>
        <div className="h-2/3 flex justify-center items-start w-full">
          <div className="rounded-3xl p-3  bg-[#193652] flex justify-center items-center">
            <div className="flex p-3  flex-col gap-24 ">
              <div className="flex flex-col justify-center items-center">
                <div className="font-semibold text-2xl">Sign up</div>
                <div>Choose a sign up method</div>
              </div>
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="flex gap-2 rounded-xl cursor-pointer  justify-center md:px-24 md:py-3 px-12 py-6 items-center bg-[#071829] " onClick={handle}>
                  <Image src="/google.png" alt="" width={20} height={20} />
                  <div >Sign up with Google</div>
                </div>
                <div className="flex gap-4 cursor-pointer rounded-xl justify-center px-24  py-3 items-center bg-[#071829] " onClick={()=>setIsOpen(true)}>
                  <Image src="/Message.png" alt="" width={20} height={20} />
                  <div  className="cursor-pointer">Sign up with Email</div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-full flex justify-center items-center gap-2">
                  <div>Already a user?</div>
                  <div className="text-sky-600">Log in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
};

export default Signup;
