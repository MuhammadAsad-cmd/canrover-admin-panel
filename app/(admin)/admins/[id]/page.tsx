"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { admins, users } from "@/data/user";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendar,
  FaGlobe,
  FaMapPin,
  FaPhone,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const UserDetailPage = () => {
  // const { id } = useParams();
  // const admin = admins.find((admin) => admin.id.toString() === id);

  // if (!admin) {
  //   return <p className="text-center text-red-500">User not found!</p>;
  // }

  const { id } = useParams();
  console.log(`UserDetailPage`, id);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const Cookies = useCookies();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/admin/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
          withCredentials: true, // Ensure cookies are sent with the request
        });

        setAdmin(response.data);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, Cookies]);

  if (loading) return <LoadingSpinner message="Loading admin detail..." />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!admin)
    return <p className="text-center text-red-500">User not found!</p>;

  return (
    <>
      <div className="p-6 animate-fadeIn">
        <div className="overflow-hidden bg-base-bg border border-border-default rounded-lg shadow-sm">
          {/* <div className="relative h-32 bg-gradient-to-r from-primary-light to-primary bg-opacity-10">
            <div className="absolute -bottom-16 left-6">
              <div className="relative h-32 w-32 rounded-full border-4 border-base-bg shadow-lg overflow-hidden">
                {admin.image ? (
                  <Image
                    width={100}
                    height={100}
                    src={admin.image}
                    alt={admin.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-primary-light text-primary-dark text-2xl font-semibold">
                    {admin.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                )}
              </div>
            </div>
          </div> */}

          <div className="pt-20 px-6 pb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-heading mb-1">
                  {admin.name}
                </h1>
                {/* <p className="text-paragraph">{user.position}</p> */}
                <p className="text-paragraph">Founder</p>
              </div>
              <span
                className={`
                inline-flex px-3 py-1 rounded-full text-sm font-medium
              `}
                //   className={`
                //     inline-flex px-3 py-1 rounded-full text-sm font-medium
                //     ${
                //       user.status === "active"
                //         ? "bg-success text-white"
                //         : "bg-darkGray text-white"
                //     }
                //   `}
              >
                {/* {user.status} */}
                online
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <MdEmail className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph">Email</p>
                    <p className="text-heading font-medium">{admin.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <FaPhone className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph">Phone</p>
                    {/* <p className="text-heading font-medium">{user.phone}</p> */}
                    <p className="text-heading font-medium">03059971189</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <FaMapPin className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph">Location</p>
                    {/* <p className="text-heading font-medium">{user.location}</p> */}
                    <p className="text-heading font-medium">Location</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 group transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <FaGlobe className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph">Website</p>
                    <p className="text-heading font-medium">Spadaweb</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <FaBriefcase className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph">Position</p>
                    <p className="text-heading font-medium">Founder</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group transition-all duration-300">
                  <div className="p-2 rounded-lg bg-primary-light group-hover:bg-primary transition-colors duration-300">
                    <FaCalendar className="h-5 w-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="text-sm text-paragraph">Join Date</p>
                    {/* <p className="text-heading font-medium">{user.joinDate}</p> */}
                    <p className="text-heading font-medium">10-12-25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
