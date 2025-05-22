import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_API_CLIENT_ID,
    authority: import.meta.env.VITE_API_AUTHORITY,
    redirectUri: import.meta.env.VITE_API_REDIRECT_URI
  }
  ,
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  // system: {
  //   loggerOptions: {
  //     loggerCallback: (level, message, containsPii) => {
  //       if (containsPii) {
  //         return;
  //       }
  //       switch (level) {
  //         case LogLevel.Error:
  //           console.error(message);
  //           return;
  //         case LogLevel.Info:
  //           console.info(message);
  //           return;
  //         case LogLevel.Verbose:
  //           console.debug(message);
  //           return;
  //         case LogLevel.Warning:
  //           console.warn(message);
  //           return;
  //         default:
  //           return;
  //       }
  //     }
  //   }
  // }
};


export const loginRequest = {
  scopes: ["User.Read"]
};


export const graphConfig = {
  graphMeEndpoint: import.meta.env.VITE_API_GRAPH_MS_API
};
