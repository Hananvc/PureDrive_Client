import { Card, Typography,Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import { toast } from "react-toastify";


function Users() {
    const [loading, setLoading] = useState(true);
    const [Users, setUsers] = useState([]);
    const confirmAction = (message, onConfirm) => {
      const isConfirmed = window.confirm(message);
          if (isConfirmed) {
              onConfirm();
          }
      };

    
    const handleBlockUser = (userId) => {
      axiosInstance.post(`/adminapp/user/${userId}/block/`)
          .then(response => {
            console.log(response.data.message);
            toast.success("User Blocked")
            fetchUsers();

          })
          .catch(error => {
              // Handle error
              console.error('Error blocking user:', error);
              toast.error("An error Occured")

          });
    };

    const handleUnblockUser = (userId) => {
      axiosInstance.post(`/adminapp/user/${userId}/unblock/`)
          .then(response => {
            console.log(response.data.message);
            toast.success("User Unblocked")
            fetchUsers();

          })
          .catch(error => {
              console.error('Error unblocking user:', error);
              toast.error("An error Occured")

          });
    };

    async function fetchUsers() {
      axiosInstance.get('/adminapp/user/')
      .then(response => {
          const filteredUsers = response.data.filter(user => !user.is_dealer);
          setUsers(filteredUsers);
          setLoading(false);

      })
      .catch(error => console.error('Error fetching non-dealer users:', error));
  }

    useEffect(() => {
      fetchUsers();
    }, []);

    console.log("users" , Users);

    if (loading) {
        return <div>Loading...</div>;
    }


  return (
    <div className="flex">
      <SidebarWithSearch />
      <div className="mt-4 -ml-20 w-8/12">
        <Card className="w-auto h-auto overflow-scroll ml-48 my-20 card-container">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <Typography
                  variant="small"
                  color="black"
                  className="font-extrabold leading-none opacity-70 content-center mb-10 my-5 "
                  style={{ fontSize: '200.5%' }}
                >
                  Users
                </Typography>
              </tr>
            </thead>
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    User ID
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Username</th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {user.id}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {user.username}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {user.email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                  <img
                    src={user.profile_image}
                    alt={user.username}
                    className="w-25 h-20 rounded-full cursor-pointer"
                  />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                      {user.is_active ? (
                          <Button
                              as="a"
                              href="#"
                              variant="small"
                              color="red"
                              className="font-semibold"
                              style={{ fontSize: '115.5%' }}
                              onClick={() => confirmAction(`Are you sure you want to block ${user.username}?`, () => handleBlockUser(user.id))}
                          >
                              Block
                          </Button>
                      ) : (
                          <Button
                              as="a"
                              href="#"
                              variant="small"
                              color="blue"
                              className="font-semibold"
                              style={{ fontSize: '115.5%' }}
                              onClick={() => confirmAction(`Are you sure you want to unblock ${user.username}?`, () => handleUnblockUser(user.id))}
                          >
                              Unblock
                          </Button>
                      )}
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </Card>
      </div>
    </div>
  )
}

export default Users
