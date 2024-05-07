'use client'
import { auth } from "@/Components/firebaseConfig";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router=useRouter()
  const [state,setstate]=useState(auth.currentUser || null)
  const datas=[
    {
      title:"Introduction to Rocket Science",
      sub:"Covers fundamentals, design, construction, operation and programming of robots. Covers fundamentals, design, construction, operation and ",
      url:"/rocket.png"
    },
    {
      title:"Astro Physics",
      sub:"Covers fundamentals, design, construction, operation and programming of robots. Covers fundamentals, design, construction, operation and ",
      url:"/atom.png"
    },
    {
      title:"Artificial Intelligence",
      sub:"Covers fundamentals, design, construction, operation and programming of robots. Covers fundamentals, design, construction, operation and ",
      url:"/test.png"
    },
    {
      title:"Astro Physics",
      sub:"Covers fundamentals, design, construction, operation and programming of robots. Covers fundamentals, design, construction, operation and ",
      url:"/telescope 1.png"
    },

  ]
  const [data,setData]=useState(datas)

  const handleSlide=()=>{
    const dup=[...data]
    let temp=dup[dup.length-1]
    dup.pop()
    dup.splice(0,0,temp)
    setData(dup)
  }
  if (state) {
    
    return (
      <>
      <div className="flex justify-between border-b p-5">
        <div>
        <Image
            src="/Frame 4.png"
            width={128}
            height={128}
            alt=""
            className="object-cover w-full "
          />
        </div>
      <button className="text-white" onClick={()=>{
        auth.signOut()
        router.push('/signup')
      }}>Signout</button>
      
      </div>
      <div className=" ">
        <div className="flex justify-between p-3">
          <div>Popular Topics 🔥</div>
          <div className=" flex gap-3">
            <Image src='/Frame 7.png' alt='' width={30} height={30}/>
            <Image src='/Frame 8.png' alt='' width={30} height={30} onClick={handleSlide} className="cursor-pointer"/>

          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-7">
          {
            data.map((value:any,index:any)=>(
              <div className="flex flex-col h-full border rounded-3xl" key={index}>
                <div className="flex p-5 h-3/6 w-full">
                <Image src={value.url} alt='' width={128} height={100}/>
                  <div>
                    <div>{value.title}</div>
                    <p className="overflow-auto">{value.sub}</p>

                  </div>
                </div>
                <div className="p-5 h-3/6 w-full">
                  <button className="p-10 text-center w-full border rounded-2xl  "> READ</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      </>
    );
  }else{
    setTimeout(()=>{
      setstate(auth.currentUser)
      if (!auth.currentUser) {
        router.push('/signup')
      }
    
    },1000)
    // setTimeout(()=>{
    //   if(state)
      
    //   router.push('/signup')
    
    // },2000)
    return <div className="w-full h-screen flex items-center justify-center">not allowed</div>
  }
}
