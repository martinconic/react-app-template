// Dashboard.js

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { API_ENDPOINT } from '../utils/Constants';

export const Dashboard = () => {
  	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = API_ENDPOINT + '/api/dashboard';
          const response = await axios.get(url);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
			setLoading(false);
		  }
      };
  
      fetchData();
    }, []);

	if (loading) {
		return <div className="header">
				</div>;
	  }

  return (
	<div className="dashboard-container">
		<div className="header">
			<h3>Dashboard</h3>
		</div>
		<div id="page-wrap"  className="scrollable-dashboard">
			<div className="dashboard-card">
				<div className="dashboard-values">
					<div className="dashboard-value">
					<h3>Total Items</h3>
					{/* some value here */}
					</div>
				</div>
			</div>
			<div className="dashboard-card">
				<div className="dashboard-values">
				</div>
			</div>

		</div>
	</div>
  );
};

export default Dashboard;
