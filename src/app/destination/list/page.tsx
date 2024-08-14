"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { Breadcrumb } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidMap } from "react-icons/bi";

const page = () => {
  const router = useRouter();
  const [destination, setDestination] = useState<ApiResponseDestinations>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}destination?sort_by=-created_at`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
            },
          }
        );
        setDestination(res.data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };
    fetchData();
  }, []);



  return (
    <div>
      <nav className="sticky top-0 z-50 bg-[#FFFFFF]">
        <Navbar />
      </nav>
      <div className=" px-4 md:px-36 bg-white flex flex-col">
        <Breadcrumb className="mt-5  font-bold text-[#1E8B43]">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/destination/list">Wisata</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <h1 className="font-bold text-3xl mt-5 text-[#000000] border-l-8 border-[#1E8B43] pl-2 mb-10 ">Wisata</h1>
        </div>

        <div className="mt-3 min-h-0 mb-48">
          {destination?.data.records.map((item, index) => (
            <>
              <div key={index} className="flex flex-col md:flex-row gap-5 items-center mb-5  transition-all duration-500 cursor-pointer border-b  hover:text-[#1E8B43] hover:bg-gray-200"
              
              onClick={() => router.push(`/destination/view/${decodeURI(item.name)}/${item.id}`)}>
              
                <div className="overflow-hidden ">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="h-[157px] w-[212px] object-cover rounded-lg hover:scale-105 transition-all duration-500 grayscale-0 "
                  />
                </div>
                <div>
                <p className="font-bold hover:text-[#1E8B43] text-lg md:text-xl">
                  {item.name}
                </p>
                <p className=" hidden  text-[#1E8B43] text-sm md:flex items-center mb-4">
                  <BiSolidMap />{item.address}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {new Intl.DateTimeFormat("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(item.created_at))}
                </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
