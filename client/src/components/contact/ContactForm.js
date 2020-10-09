import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../.././context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearContacts, updateContact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current)
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
    // eslint-disable-next-line
  }, [current])

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })

  const clearAll = () => {
    clearContacts();
  }

  const onSubmit = e => {
    e.preventDefault()
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Update Contact" : "Add Contact"}</h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange} />

      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange} />

      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange} />

      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={onChange}
        checked={type === 'personal'
        } /> Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={onChange}
        checked={type === 'professional'}
      /> Professional{' '}
      <div>
        <input onChange={onChange} type="submit" value={current ? "Edit Contact" : "Add Contact"} className="btn btn-primary btn-block" />
        {current && <input type="submit" value="Clear Contact" className="btn btn-light btn-block" onClick={clearAll} />}
      </div>
    </form>
  )
}

export default ContactForm