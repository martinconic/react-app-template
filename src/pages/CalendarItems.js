import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API_ENDPOINT } from '../utils/Constants';
import axios from 'axios';

function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  
  function getDayOfYear(date) {
	const year = date.getFullYear();
	const daysInMonth = [
	  31, // January
	  isLeapYear(year) ? 29 : 28, // February
	  31, // March
	  30, // April
	  31, // May
	  30, // June
	  31, // July
	  31, // August
	  30, // September
	  31, // October
	  30, // November
	  31, // December
	];
  
	let dayOfYear = 0;
	const month = date.getMonth();
	const day = date.getDate();
  
	for (let i = 0; i < month; i++) {
	  dayOfYear += daysInMonth[i];
	}
  
	dayOfYear += day;
  
	return dayOfYear;
  }

const getStartOfWeek = () => {
	const today = new Date();
	const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
	const mondayDiff = today.getDate() - currentDay + (currentDay === 0 ? -7 : 0);
	return new Date(today.setDate(mondayDiff));
  };
  
  const getEndOfWeek = () => {
	const today = new Date();
	const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
	const sundayDiff = today.getDate() - currentDay + (currentDay === 0 ? 0 : 6);
	return new Date(today.setDate(sundayDiff));
  };

  const getFormattedDateFromDayOfYear = (year, dayOfYear) => {
	const date = new Date(year, 0); // January 1st of the specified year
	date.setDate(dayOfYear);
	const options = {weekday: 'long', month: 'long', day: 'numeric' };
	return date.toLocaleDateString('Ro-RO', options);
  };

export const CalendarItems = () => {
	const [data, setData] = useState([]);
	const [startDate, setStartDate] = useState(getStartOfWeek());
	const [endDate, setEndDate] = useState(getEndOfWeek());

	const currentYear = new Date().getFullYear();

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const url = API_ENDPOINT + `/api/calendaritems/${getDayOfYear(startDate)}/${getDayOfYear(endDate)}`;
			const response = await axios.get(url);
			setData(response.data);
			console.log(response.data)
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	
		fetchData();
	  }, [startDate, endDate]);
	
	return (
		<div id="page-wrap" className="calendar">
			<div className="header">
				<h3>Calendar Items</h3>
			</div>

			<div className="date-range-picker-container">
				<label className="date-label">From:</label>
				<DatePicker
					className="date-picker"
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					onFocus={e => e.target.blur()}
				/>

				<label className="date-label">To:</label>
				<DatePicker
					className="date-picker"
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
					onFocus={e => e.target.blur()}
				/>
			</div>

			<div id="page-wrap" className="scrollable-container">
				<div className='calendar-container'>
					{Object.entries(data).map(([key, arrayOfObjects]) => (
						<div key={key}>
						<h3>{getFormattedDateFromDayOfYear(currentYear, key)}</h3>
						<ul>
							{arrayOfObjects.map((obj, index) => (
							<li key={index}>
								<p>Name: <b>{obj.Name}</b></p>
								<p>Birthday: {new Date(obj.Data).toLocaleDateString('Ro-RO')}</p>
							</li>
							))}
						</ul>
						</div>
					))}
				</div>
			</div>

		</div>
	);
};

export default CalendarItems;