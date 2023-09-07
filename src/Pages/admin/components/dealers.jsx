import { Card, Typography,Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import { toast } from "react-toastify";


function Dealers() {
    const [loading, setLoading] = useState(true);
    const [Dealers, setDealers] = useState([]);

    const confirmAction = (message, onConfirm) => {
      const isConfirmed = window.confirm(message);
          if (isConfirmed) {
              onConfirm();
          }
      };

    
    const handleBlockUser = (dealerId) => {
      axiosInstance.post(`/adminapp/dealer/${dealerId}/block/`)
          .then(response => {
            console.log(response.data.message);
            toast.success("Dealer Blocked")
            fetchDealers();

          })
          .catch(error => {
              // Handle error
              console.error('Error blocking user:', error);
              toast.error("An error Occured")

          });
    };

    const handleUnblockUser = (dealerId) => {
      axiosInstance.post(`/adminapp/dealer/${dealerId}/unblock/`)
          .then(response => {
            console.log(response.data.message);
            toast.success("Dealer Unblocked")
            fetchDealers();

          })
          .catch(error => {
              console.error('Error unblocking user:', error);
              toast.error("An error Occured")

          });
    };

    const handleVerifyDealer = (dealerId) => {
      axiosInstance.post(`/adminapp/dealer/${dealerId}/verify/`)
          .then(response => {
             
              console.log('Dealer verified successfully:', response.data.message);
              toast.success("Dealer Verified Succesfully")
              fetchDealers();


          })
          .catch(error => {
            toast.success("Dealer Verification Failed")
            console.error('Error verifying dealer:', error);
          });
  };
  

    async function fetchDealers() {
      axiosInstance.get('/adminapp/dealer/')
      .then(response => {
          
          setDealers(response.data);
          setLoading(false);

      })
      .catch(error => console.error('Error fetching non-dealer users:', error));
  }

    useEffect(() => {
      fetchDealers();
    }, []);

    console.log("Dealers" , Dealers);

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
                  Dealers
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
                    style={{ fontSize: '115.5%' }}>
                    Dealer ID
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Username</th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Email</th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {Dealers.map((dealer) => (
                <tr key={dealer.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {dealer.id}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {dealer.user.username}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                      {dealer.user.email}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                  <img
                    src={dealer?.user?.profile_image}
                    alt={dealer?.user?.username}
                    className="w-25 h-20 rounded-full cursor-pointer"
                  />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {(!dealer.user.is_staff && !dealer.user.is_dealer) ? (
                      <Button
                            as="a"
                            href="#"
                            variant="small"
                            color="green"
                            className="font-semibold"
                            style={{ fontSize: '115.5%' }}
                            onClick={() => confirmAction(`Are you sure you want to verify ${dealer.user.username}?`, () => handleVerifyDealer(dealer.id))}
                        >
                            Verify
                        </Button>
                    ) : dealer.user.is_active ? (
                        <Button
                            as="a"
                            href="#"
                            variant="small"
                            color="red"
                            className="font-semibold"
                            style={{ fontSize: '115.5%' }}
                            onClick={() => confirmAction(`Are you sure you want to block ${dealer.user.username}?`, () => handleBlockUser(dealer.id))}
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
                            onClick={() => confirmAction(`Are you sure you want to unblock ${dealer.user.username}?`, () => handleUnblockUser(dealer.id))}
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

export default Dealers

