import { HMSRoomProvider } from "@100mslive/hms-video-react";

import Home from "./home";

const App = () => {
  return (
    <>
      {typeof window !== "undefined" ? (
        <HMSRoomProvider>
          <Home />
        </HMSRoomProvider>
      ) : (
        console.log("Oops, `window` is not defined")

      )}
    </>
  );
};

export default App;
