import React, { useState, useEffect } from 'react';
import { SidebarWithSearch } from './components/sidebar';
import { CardWithLink } from './components/card';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/apiconfig';

function AdminDash() {
  const [counts, setCounts] = useState({
    dealer_count: 0,
    user_count: 0,
    total_testrides: 0,
    completed_testrides: 0,
    cancelled_testrides: 0,
    pending_testrides: 0,
  });
  const userData = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    getCount();
  }, []);

  async function getCount() {
    axiosInstance.get('adminapp/user/user_count/')
      .then(response => setCounts(prevCounts => ({ ...prevCounts, user_count: response.data.user_count })))
      .catch(error => console.error('Error fetching user count:', error));

    axiosInstance.get('adminapp/user/dealer_count/')
      .then(response => setCounts(prevCounts => ({ ...prevCounts, dealer_count: response.data.dealer_count })))
      .catch(error => console.error('Error fetching dealer count:', error));

    axiosInstance.get('adminapp/testride/testride_count/')
      .then(response => setCounts(prevCounts => ({ ...prevCounts, ...response.data })))
      .catch(error => console.error('Error fetching test ride counts:', error));
  }

  return (
    <>
      <div className="flex">
        <SidebarWithSearch />
        <div className="mt-20 ml-20 w-8/12">
          <CardWithLink title="Dealers Count" count={counts.dealer_count} link="/Admindealers" />
          <CardWithLink title="Users Count" count={counts.user_count} link="/Adminusers" />
          <CardWithLink title="Total Test Rides / Completed / Cancelled / Pending Test Rides" count={`${counts.total_testrides} / ${counts.completed_testrides} / ${counts.cancelled_testrides} / ${counts.pending_testrides}`} link='/Adminbookings' />

          {/* <Table/> */}
        </div>
      </div>
    </>
  );
}

export default AdminDash;
