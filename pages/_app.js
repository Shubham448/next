import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { UserContext } from '../components/Protected Routes/Trainer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    /**
     * Here goes the logic of retrieving a user
     * from the backend and redirecting
     * an unauthorized user
     * to the login page
    */
   trainerProfile();
    
    // setUser(result);
  }, []);

  let trainerProfile = async() => {
    try {
      let trainerProfile = await axios.get('/api/auth/profile', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      setUser(trainerProfile.data.data);
    }
    catch (error) {
      console.log('err>>>',error)
    }
  };

  if (pageProps.protected && !user) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <UserContext.Provider value={user}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp;
