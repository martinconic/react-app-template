// Filename - pages/Marriages.js

import React from "react";
import { Link } from 'react-router-dom';


export const Reports = () => {
	return (
		<div id="page-wrap" className="reports">
			<div className="header">
				<h3>Reports</h3>
			</div>

			<div className="reports-container">
				<Link to={`/one`} className="styled-link">
					<b>Report One</b> <br />
				</Link>
				<Link to={`/two`} className="styled-link">
					<b>Report two</b> <br />
				</Link>
				<Link to={`/three`} className="styled-link">
					<b>Report Three</b> <br />
				</Link>
				
			</div>
		</div>
	);
};

export default Reports;