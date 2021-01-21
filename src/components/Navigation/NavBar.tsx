import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import Gravatar from "react-gravatar";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../store/actions/users";
import api from "../../utils/api.util";
import "../../assets/styles/navbar.scss";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = async () => {
    await localStorage.removeItem("token");
    dispatch(logoutUser());
    history.replace("/");
  };
  const user = useSelector(({ user: { user } }: any) => user);

  const token = user.token || localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else return null;

  return (
    <Menu secondary pointing>
      <Menu.Item as={Link} to="/students">
        📒 Register Courses
      </Menu.Item>
      <Menu.Menu position="right">
        <Dropdown
          className={"action-dropdown"}
          trigger={
            <Image avatar>
              <Gravatar email={"mathews.kyle@gmail.com"} />
            </Image>
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
