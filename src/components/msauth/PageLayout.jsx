import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useState } from "react";
import { loginRequest } from "./authConfig";

/**
 * Navbar layout using Tailwind
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <nav className="border-b border-gray-500 px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-lg font-semibold">
          Microsoft Identity Platform
        </a>
        <div>
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </nav>

      <h5 className="text-center text-gray-700 text-lg mt-6">
        Welcome to the Microsoft Authentication Library For JavaScript - React Quickstart
      </h5>

      {/* <ProfileData/> */}

      <div className="mt-10 px-4">{props.children}</div>
    </>
  );
};

/**
 * Dropdown for Sign In with popup/redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal();
  const [open, setOpen] = useState(false);

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch(e => {
        console.error("problem");
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch(e => {
        console.log(e);
      });
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 cursor-pointer"
      >
        Sign In
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-400 rounded shadow-lg z-50">
          <button
            onClick={() => handleLogin("popup")}
            className="block w-full px-4 py-2 text-left cursor-pointer"
          >
            Sign in using Popup
          </button>
          <div className="h-[1px] w-full bg-gray-400/70" />
          <button
            onClick={() => handleLogin("redirect")}
            className="block w-full px-4 py-2 text-left cursor-pointer"
          >
            Sign in using Redirect
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Dropdown for Sign Out with popup/redirect
 */
export const SignOutButton = () => {
  const { instance } = useMsal();
  const [open, setOpen] = useState(false);

  const handleLogout = (logoutType) => {
    setOpen(false); // close menu on click
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
      >
        Sign Out
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-400 rounded shadow-lg z-50">
          <button
            onClick={() => handleLogout("popup")}
            className="block w-full px-4 py-2 text-left cursor-pointer"
          >
            Sign out using Popup
          </button>
          <div className="h-[1px] w-full bg-gray-400/70" />
          <button
            onClick={() => handleLogout("redirect")}
            className="block w-full px-4 py-2 text-left cursor-pointer"
          >
            Sign out using Redirect
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * User profile view (after successful login)
 */
export const ProfileData = (props) => {
  return (
    <div id="profile-div" className="bg-gray-100 p-4 rounded shadow max-w-md mx-auto mt-8">
      <p><strong>First Name:</strong> {props.graphData.givenName}</p>
      <p><strong>Last Name:</strong> {props.graphData.surname}</p>
      <p><strong>Email:</strong> {props.graphData.userPrincipalName}</p>
      <p><strong>Id:</strong> {props.graphData.id}</p>
    </div>
  );
};
