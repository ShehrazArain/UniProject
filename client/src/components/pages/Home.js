import React, { useEffect, useContext } from 'react'
import Contact from '../contact/Contact';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';
import AuthContext from '../../context/auth/authContext';



const Home = () => {

  const authContext = useContext(AuthContext)
  //const { isAuthenticated, loadUser } = authContext;
  useEffect(() => {

    authContext.loadUser();
    // eslint-disabled-next-line
  }, [authContext])

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contact />
      </div>
    </div>
  )
}

export default Home;
