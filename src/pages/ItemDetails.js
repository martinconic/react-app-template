import React, { useState, useEffect } from "react";
import Moment from 'moment';
import { API_ENDPOINT } from '../utils/Constants';
import axios from 'axios';
import { useParams } from "react-router-dom";


export const Item = () => {
	const { id } = useParams();
	const itemID = id
	const [data, setData] = useState([]);

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
  const item = data.find((m) => m.ID === itemID);

  if (!item) {
    return <div>Item not found!</div>;
  }

  return (
    <div>
      <div className="header">
          <h3>{item.Name}</h3>
        </div>
      <div className="item">
        <div id="page-wrap" className="item-details">
          <div className="detail-row">
            <span>First Name: {item.FirstName}</span>
          </div>
          <div className="detail-row">
            <span>Last Name: {item.LastName} </span>
          </div>
          <div className="detail-row">
            <span>Birthdate: {Moment(item.Birthdate).format("DD.MM.YYYY")}</span>
          </div>
          <div className="detail-row">
            <span>Mobile: {item.Mobile}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;