import React, { Fragment, useContext, useEffect } from 'react'
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';
import Spinner from '../layout/Spinner'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

const Contact = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [getContacts])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add Contacts</h4>
  }


  return (
    <Fragment >
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
              <CSSTransition key={contact._id}>
                <ContactItem contact={contact} timeout={500}
                  classNames="item" />
              </CSSTransition>)) :

            contacts.map(contact => (
              <CSSTransition key={contact._id} timeout={500}
                classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          }
        </TransitionGroup>) :
        <Spinner />
      }

    </Fragment>
  )
}

export default Contact