"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, User, UserCircle } from "lucide-react";
import Image from "next/image";
import SignIn from "@/app/signin/page";

export default function Avatar() {
    const { data: session } = useSession();

    return (
        <div className="relative  dark:bg-gray-900 px-4">
            {session ? (
                <div className="flex flex-col md:flex-row items-center gap-4 py-4 relative group">
                    <div className="cursor-pointer transition duration-300 hover:opacity-90">
                            <div className="bg-white relative h-12 w-12 overflow-hidden rounded-full ring-4 ring-blue-400 shadow-md">
                                <Image
                                    src={session.user?.image}
                                    alt="User profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>


                    </div>
    
                    {/* Hidden content on desktop, visible on mobile */}
                    <div
                        className={`
                            flex-col md:absolute md:top-14 md:left-0 md:bg-gray-900 md:rounded-md md:shadow-lg md:p-4
                            md:opacity-0 md:invisible md:group-hover:visible md:group-hover:opacity-100
                            transition-all duration-300 ease-in-out
                            flex items-center md:items-start gap-2 
                        `}
                    >
                        <p className="text-sm text-white shadow-md shadow-amber-200">
                            {session.user?.email}
                        </p>
    
                        <div className="flex flex-col md:flex-row gap-2 mt-3 ">
                            <Link
                                href="/userProfile"
                                className="flex items-center gap-1  hover:bg-blue-400 text-black px-3 py-2 rounded-md transition duration-150 group bg-gray-800 shadow-md hover:shadow-lg"
                            >
                                <User size={16} className="text-white" />
                                <p className=" text-white text-sm">Profile</p>
                            </Link>
    
                            <button
                                className="flex items-center text-black hover:bg-red-500 px-3 py-2 rounded-md transition duration-150 group bg-gray-800 shadow-md hover:shadow-lg"
                                onClick={() => signOut()}
                            >
                                <LogOut size={16} className="text-white"/>
                                <p className="text-sm text-white">Logout</p>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                onClick={() => signIn()}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-3 rounded-md font-semibold text-white transition duration-200 w-full flex justify-center items-center"
              >
                                  <UserCircle size={20} className="mr-2 " />
    
                Sign In
              </button>

                

                
            )}
        </div>
    );
    
}
