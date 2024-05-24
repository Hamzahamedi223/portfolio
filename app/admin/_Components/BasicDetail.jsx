import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { db } from "@/utils";
import { userinfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Camera, Link2, MapPin } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BasicDetail = () => {
  let timeoutId;
  const { user } = useUser();
  const [ selectedOption, setSelectedOption ] = useState();

  const { userDetail, SetuserDetail } = useContext(UserDetailContext);
  useEffect(() => {
    userDetail && console.log(userDetail);
  }, [userDetail]);

  const onInputChange = (event, FiledName) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      console.log("Input", event.target.value);
      const result = await db
        .update(userinfo)
        .set({
          [FiledName]: event.target.value,
        })
        .where(eq(userinfo.email, user?.primaryEmailAddress?.emailAddress));
      if (result) {
        toast.success("Saved!", {
          position: "top-left",
        });
      } else {
        toast.error("error!", {
          position: "top-left",
        });
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
          defaultValue={userDetail?.name}
        />
      </div>
      <textarea
        className="textarea textarea-primary mt-2 w-full"
        placeholder="About you"
        defaultValue={userDetail?.bio}
        onChange={(event) => onInputChange(event, "bio")}
      ></textarea>
      <div className="flex gap-3 mt-6">
        <MapPin
          className="h-12 w-12 text-red-500 p-3 hover:bg-gray-500 rounded-md"
          onClick={() => setSelectedOption("location")}
        />
        <Link2
          className="h-12 w-12 text-green-500 p-3 hover:bg-gray-500 rounded-md"
          onClick={() => setSelectedOption("url")}
        />
      </div>
      {selectedOption == "location" ? (
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <MapPin />
            <input type="text" className="grow" placeholder="location" />
          </label>
        </div>
      ) : selectedOption == "url" ? (
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <Link2 />
            <input type="text" className="grow" placeholder="url" />
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default BasicDetail;
