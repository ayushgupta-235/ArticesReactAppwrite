import React from "react";
import Container from "../Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
//  useNavigate() is a React Router hook that allows navigation without using <Link>.
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-gray-900 text-white shadow-md py-4">
      <Container>
        <nav className="flex justify-between items-center">
          {/* Logo Section */}
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold">YourBrand</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.slug}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="hover:text-gray-300 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
