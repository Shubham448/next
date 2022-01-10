import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <NotificationContainer />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
