"use client"
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Review from "./_Components/review";
import Form from "./_Components/form";



function Admin ()  {
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
      console.log("useEffect triggered");
      user && CheckUser();
    }, [user]);
    
    const CheckUser = async () => {
      console.log("CheckUser function called");
      const result = await db
        .select()
        .from(userinfo)
        .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));
      console.log(result);
      if (result?.length == 0) {
        router.replace("/create");
      }
    };
  
    return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2">
      <Form/>
    </div>
    <div className="">
      <Review/>
      </div>
      </div>
     
  )
  };
   
  export default Admin
  
