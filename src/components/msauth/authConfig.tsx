import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "143efdd5-d49b-4000-8636-0081852ae7ff",
    authority: "https://login.microsoftonline.com/aekaadvisors.com",
    redirectUri: "http://localhost:5173/getAToken"
  },
  // auth: {
  //   clientId: "a0648619-0483-4c5c-ba15-ae54369d05f0",
  //   authority: "https://login.microsoftonline.com/centuryply.com",
  //   redirectUri: "http://localhost:3000/getAToken"
  // },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: number, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      }
    }
  }
};


export const loginRequest = {
  scopes: ["User.Read"]
};


export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
