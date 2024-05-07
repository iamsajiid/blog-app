import React from "react";
import { Link } from "react-router-dom";
import { Container, Logo, logoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      to: "/",
      active: "true",
    },
    {
      name: "Login",
      to: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      to: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      to: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      to: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? 
              <li key={item.name}>
                <button
                onClick={() => navigate(item.to)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                  {item.name}
                </button>
              </li>
              : null
            )}
          </ul>
          {authStatus && (
          <li>
            <logoutBtn/>
          </li>)}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
