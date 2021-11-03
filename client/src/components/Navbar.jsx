import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const pathName = window.location.pathname;
  const path = pathName === "/" ? "home" : pathName.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const MenuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Item position="right" name="logout" onClick={logout} />
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        as={Link}
        to="/"
        onClick={handleItemClick}
      />
      <Menu.Item
        position="right"
        name="login"
        active={activeItem === "login"}
        as={Link}
        to="/login"
        onClick={handleItemClick}
      />
      <Menu.Item
        name="register"
        active={activeItem === "register"}
        as={Link}
        to="/register"
        onClick={handleItemClick}
      />
    </Menu>
  );

  return MenuBar;
}
