import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { slide as Menu } from "react-burger-menu";

export const Sidebar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

  return (
    <Menu isOpen={isMenuOpen} onStateChange={(state) => setIsMenuOpen(state.isOpen)}>
        <Link to="/" onClick={closeMenu}>
          Dashboard
        </Link>
        <Link to="/items" onClick={closeMenu}>
          Items
        </Link>
        <Link to="/calendaritems" onClick={closeMenu}>
          Calendar items
        </Link>
        <Link to="/reports" onClick={closeMenu}>
          Reports
        </Link>
        <Link to="/somelist" onClick={closeMenu}>
          Some list
        </Link>
    </Menu>
  );
};

export default Sidebar;