// import React from 'react'

// const Profile = () => {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile

// import { ProfileData } from "~/msauth/PageLayout";

import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../components/msauth/authConfig";
import { callMsGraph } from "../components/msauth/graph";
import { ProfileData } from "../components/msauth/PageLayout";
// import { Button } from "react-bootstrap";
// import { loginRequest } from "~/msauth/authConfig";
// import { callMsGraph } from "~/msauth/graph";



// export function meta({ }) {
//   return [
//     { title: "New React Router App" },
//     { name: "description", content: "Welcome to React Router!" },
//   ];
// }

export default function Profile() {
  return <ProfileContent />;
}

import React, { useEffect, useState } from "react";
// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "./authConfig"; // make sure this is correctly imported
// import { callMsGraph } from "./graph"; // MS Graph call utility

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      instance
        .initialize() // Important: initialize if you're using MSAL v3+
        .then(() => {
          return instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
        })
        .then((response) => {
          return callMsGraph(response.accessToken);
        })
        .then((data) => setGraphData(data))
        .catch((error) => console.error("Token acquisition or Graph call failed:", error));
    }
  }, [instance, accounts]);

  return (
    <div>
      <h2>Profile Info</h2>
      {graphData ? <pre>{JSON.stringify(graphData, null, 2)}</pre> : "Loading..."}
    </div>
  );
};

// export default ProfileContent;


// const ProfileContent = () => {
//   const { instance, accounts } = useMsal();
//   const [graphData, setGraphData] = useState(null);

//   function RequestProfileData() {
//     // Silently acquires an access token which is then attached to a request for MS Graph data
//     instance
//       .acquireTokenSilent({
//         ...loginRequest,
//         account: accounts[0],
//       })
//       .then((response) => {
//         callMsGraph(response.accessToken).then((response) => setGraphData(response));
//       });
//   }

//   // RequestProfileData()
//   console.log(graphData)

//   useState(() => {
//     RequestProfileData()

//   }, [])



//   return (

//     <div>
//       hii
//     </div>
//   );
// };

// export default ProfileContent;