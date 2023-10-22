"use client";
import Navbar from "../dashboard/Navbar";
import Image from "next/image";
import { useState } from "react";
import "./style.css";
import { ApiResponse } from "../types/type";
import { useApiData } from "@/app/providers/Providers";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
const Profile = () => {
  const [userInfo, setUserInfo] = useState<ApiResponse>(useApiData());
  const [maxExpsEditing, setMaxExpsEditing] = useState<boolean>(false);
  const [maxExpsValue, setMaxExpsValue] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  const cookies = useCookies();

  const token = cookies.get('token') || ''
 
  //console.log("la data es: ", data)


  const handleMaxExpChange = () => {
    setUpdating(true);
    setMaxExpsEditing(false);
    console.log(maxExpsValue);
    fetch(`api/users/${userInfo.finder.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...userInfo,
        maxExpenditure: parseInt(maxExpsValue.slice(1, maxExpsValue.length)),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpdating(false);
        setUserInfo((prevState) => ({
          ...prevState,
          finder: {
            ...prevState.finder,
            maxExpenditure: data.updated.maxExpenditure,
          },
        }));
      })
      .catch((error) => console.error(error));
  };
  const handleVerify = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      /* console.log('username:', userInfo?.finder?.username);
      console.log('email:', userInfo?.finder?.email);
      console.log('token:', token);
*/
      const response = await fetch("http://localhost:3000/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle success
        console.log("Email sent successfully");
      } else {
        // Handle errors
        console.error("Email sending failed");
      }
    } catch (error) {
      console.error("An error occurred while sending the email", error);
    }
  };

  return (
    <div className=" bg-bg">
      <Navbar />
      <div className="w-11/12 mx-auto max-sm:w-9/12">
        <div className="ml-[10vw] max-sm:ml-0">
          <div className="h-32 flex items-center gap-14 max-sm:mt-6 ">
            <div>
              <h1 className="font-bold text-xl leading-tight mx-auto w-full">
                User Profile
              </h1>
              <p>
                Manage your information, configure your experience and keep your
                account safe.
              </p>
            </div>
          </div>
          <div className="flex gap-8 max-sm:flex-col">
            <div className="border-card-bg border-2 p-6 flex flex-col items-center gap-5 w-fit shadow-blackShadow rounded-2xl max-sm:w-full">
              <Image
                src={
                  "data:image/png;base64,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"
                }
                width={130}
                height={130}
                alt=""
                className="rounded-full"
              />
              <div className="text-center">
                <h3 className="text-primary font-bold text-xl">
                  {userInfo?.finder?.username}
                </h3>
                <p className="my-2"> {userInfo?.finder?.email}</p>

                <Link
                  href="/logOut"
                  className="text-red-600 font-bold opacity-80 inline"
                >
                  Log Out{" "}
                  <Image
                    src={"/log-out-icon.png"}
                    width={20}
                    height={8}
                    alt=""
                    className="inline"
                  />
                </Link>
              </div>
            </div>
            <div className="border-card-bg border-2 p-6  shadow-blackShadow rounded-2xl">
              <h2 className="font-bold text-lg">General Information</h2>

              <form
                action="submit"
                className="grid grid-rows-2 grid-cols-2 gap-x-12 gap-y-10 mt-6 max-sm:grid-cols-1 max-sm:grid-rows-4"
              >
                <div className="border-card-bg border-2 p-2 rounded-lg">
                  <label htmlFor="" className="block text-xs">
                    First Name
                  </label>
                  <input
                    readOnly={true}
                    type="text"
                    name="firstName"
                    value={userInfo?.finder?.username?.split(" ")[0]}
                    className={"text-lg focus:outline-none cursor-default"}
                  />
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg">
                  <label htmlFor="" className="block text-xs">
                    Last Name
                  </label>
                  <input
                    readOnly={true}
                    type="text"
                    name="lastName"
                    value={userInfo?.finder?.username?.split(" ")[1]}
                    className={"text-lg focus:outline-none cursor-default"}
                  />
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg w-[25vw] max-sm:w-full">
                  <label htmlFor="" className="block text-xs">
                    Email
                  </label>
                  <input
                    type="text"
                    readOnly={true}
                    name="email"
                    value={userInfo?.finder?.email}
                    className="text-lg focus:outline-none cursor-default w-full"
                  />
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg ">
                  <label htmlFor="" className="block text-xs">
                    Is your account verified?{" "}
                    <b
                      className="text-primary text-xs cursor-pointer"
                      onClick={(e) => handleVerify(e)}
                    >
                      {" "}
                      {!userInfo.finder.emailVerified
                        ? "Click here to verify"
                        : ""}
                    </b>
                  </label>
                  <div className="flex gap-2 items-center">
                    {userInfo?.finder?.emailVerified ? (
                      <p>Yes ✔️</p>
                    ) : (

                      <button
                        onClick={async (e) => {
                          e.preventDefault(); // Prevent the default form submission
                          try {
                            /* console.log('username:', userInfo?.finder?.username);
                            console.log('email:', userInfo?.finder?.email);
                            console.log('token:', token);
 */
                            const response = await fetch('http://localhost:3000/api/users/verify', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                "username": userInfo?.finder?.username,
                                "email": userInfo?.finder?.email,
                                "token": token
                              }),
                            });

                            if (response.ok) {
                              // Handle success
                              console.log('Email sent successfully');
                            } else {
                              // Handle errors
                              console.error('Email sending failed');
                            }
                          } catch (error) {
                            console.error('An error occurred while sending the email', error);
                          }
                        }}
                      >
                        Verify Account
                      </button>


                     // <p>No ❌</p>

                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="max-sm:pb-24">
            <div className="border-card-bg border-2 p-6  shadow-blackShadow rounded-2xl my-8 w-11/12  max-sm:w-auto">
              <h2 className="font-bold text-lg">Configuration</h2>
              <form
                action="submit"
                className="grid grid-rows-1 grid-cols-2 gap-x-12 gap-y-10 mt-6 max-sm:grid-cols-1 max-sm:grid-rows-2"
              >
                <div className="border-card-bg border-2 p-2 rounded-lg">
                  <label htmlFor="" className="block text-xs">
                    Language
                  </label>
                  <div className="flex items-center mt-2">
                    <div className="tooltip">
                      <Image
                        src={"/usa-flag.png"}
                        width={20}
                        height={20}
                        alt="EEUU Flag"
                        title="English"
                      />
                      <div className="bottom">
                        <p>English</p>
                        <i></i>
                      </div>
                    </div>
                    <input
                      className="mx-2  h-3.5 w-10 appearance-none rounded-[0.4375rem] bg-primary before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:shadow-blackShadow  before:content-[''] after:absolute after:z-[2]  after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-blackShadow after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.25rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none   checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-['']  checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100  checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                    <div className="flex items-center ">
                      <div className="tooltip">
                        <Image
                          src={"/arg-flag.png"}
                          width={20}
                          height={20}
                          alt="Argentina Flag"
                          title="Spanish"
                        />
                        <div className="bottom">
                          <p>Spanish</p>
                          <i></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-card-bg border-2 p-2 rounded-lg">
                  <label htmlFor="" className="text-xs flex gap-2">
                    Maximum expenditure{" "}
                    <div className="tooltip">
                      <Image
                        src={"/info-icon.png"}
                        width={18}
                        height={18}
                        alt="Info Icon"
                      />
                      <div className="top">
                        <p>
                          Set here a monetary limit. Our finance management
                          application will notify you when you approach or
                          exceed this limit, helping you stay on track with your
                          spending.
                        </p>
                        <i></i>
                      </div>
                    </div>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      readOnly={!maxExpsEditing}
                      onChange={(e) => setMaxExpsValue(e.target.value)}
                      defaultValue={
                        maxExpsEditing ? userInfo?.finder?.maxExpenditure : ""
                      }
                      value={
                        maxExpsEditing
                          ? undefined
                          : `$${userInfo?.finder?.maxExpenditure}`
                      }
                      className={
                        maxExpsEditing
                          ? "focus:outline-none focus:border-b-2  text-lg w-24"
                          : "text-lg focus:outline-none cursor-default w-24"
                      }
                    />
                    {maxExpsEditing ? (
                      <Image
                        src={"/tick-icon.png"}
                        width={18}
                        height={18}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => handleMaxExpChange()}
                      />
                    ) : null}
                    {updating ? <div className="loader"></div> : null}
                    {!maxExpsEditing && !updating ? (
                      <Image
                        src={"/edit-icon.png"}
                        width={18}
                        height={18}
                        alt=""
                        className="cursor-pointer"
                        onClick={() => setMaxExpsEditing(true)}
                      />
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
