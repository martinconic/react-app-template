// Filename - pages/OrderNumbers.js

import React, { useState, useEffect } from "react";

import axios from 'axios';
import { API_ENDPOINT } from '../utils/Constants';

export const SomeList = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = API_ENDPOINT + '/api/somelist';
          const response = await axios.get(url);
          const sortedData = response.data.sort((a, b) => b.ID - a.ID);
          setData(sortedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const normalizeString = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };

    const filteredSomeList = data.filter((sl) =>
      normalizeString(sl.Description).includes(normalizeString(searchQuery))
    );

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

	return (
		<div id="page-wrap" className="somelist">
      <div className="header">
			  <h3>Some list</h3>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Find in list..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="custom-input"
        />
      </div>
      <div className="scrollable-container">
      <ul>
        <div id="header">
          <p><b>{new Date().getFullYear()}</b></p>
        </div>
        {filteredSomeList.map(item => (
          <li key={item.ID}>
            <b>{item.ID}.</b> - <u>{item.Description}</u>
          </li>
        ))}
      </ul>
    </div>
		</div>
	);
};

export default SomeList;