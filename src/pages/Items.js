import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../utils/Constants';
import Moment from 'moment';

const ItemsCard = ({ item }) => {
  return (
    <div className="items-item">
      <Link to={`/item/${item.ID}`}>
      <b>{item.Name}</b> <br/>
      </Link>
      Birthdate: {Moment(item.Birthdate).format("DD.MM.YYYY")} 
      <br/>Mobile: {item.Mobile}
    </div>
  );
};

export const Items = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const url = API_ENDPOINT + '/api/items';
          const response = await axios.get(url);
          const sortedData = response.data.sort((a, b) => a.Name.localeCompare(b.Name));
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

    const filteredItems = data.filter((item) =>
      normalizeString(item.Name).includes(normalizeString(searchQuery))
    );

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

	return (
		<div className="items-list">
      <div className="header">
        <h3>Items</h3>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="custom-input"
        />
      </div>
      <div id="page-wrap" className="scrollable-container">
        {filteredItems.map((item, index) => (
          <ItemsCard key={index} item={item} />
        ))}
      </div>
    </div>
	);
};

export default Items;