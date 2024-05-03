import { Configuration, LogLevel, PublicClientApplication } from '@azure/msal-browser';

function getClientIdFromWindow() {
  return (window as any).ClientId;
}

function getClientIdFromEnv() {
  return process.env.REACT_APP_CLIENT_ID;
}

const windowHasClientId = getClientIdFromWindow();
const clientId = windowHasClientId ? getClientIdFromWindow() : getClientIdFromEnv();
export const configuration: Configuration = {
  auth: {
    clientId,
    clientCapabilities: ['CP1']
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
    claimsBasedCachingEnabled: true
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Verbose,
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error('[MSAL]', message);
            return;
          case LogLevel.Info:
            console.info('[MSAL]', message);
            return;
          case LogLevel.Verbose:
            console.debug('[MSAL]', message);
            return;
          case LogLevel.Warning:
            console.warn('[MSAL]', message);
            return;
        }
      },
      piiLoggingEnabled: false
    }
  }
};


const msalApplication = new PublicClientApplication(configuration);
msalApplication.initialize();
export { msalApplication };
