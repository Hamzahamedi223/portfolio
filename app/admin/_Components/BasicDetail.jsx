import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Camera } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const BasicDetail = () => {
  let timeoutId;
  const {user}=useUser();
  const onInputChange = (event, FiledName) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(async() => {
      console.log("Input", event.target.value);
      const result= await db.update(userinfo)
      .set({
        [FiledName]:event.target.value
      }).where(eq(userinfo.email,user?.primaryEmailAddress?.emailAddress))
      if (result){
        toast.success('Saved!',{
          position:'top-left'
        })
      }
      else{
        toast.error('error!',{
          position:'top-left'
        })
      }
    }, 1000);
  };
  return (
    <div className="p-7 rounded-lg bg-gray-800 my-7">
      <div className="flex gap-2 items-center">
        <Camera className="rounded-full p-3 h-12 w-12 bg-gray-500" />
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => onInputChange(event, "name")}
          className="input input-bordered input-primary w-full max-w-full"
        />
      </div>
      <textarea
        className="textarea textarea-primary mt-2 w-full"
        placeholder="About you"
      ></textarea>
    </div>
  );
};

export default BasicDetail;
