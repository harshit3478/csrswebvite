import React from 'react'
import { PermIdentity, Phone, ContactEmergency } from '@mui/icons-material';
export interface Contact {
    name : string;
    phone: string;
    imageUrl: string | null;
    isUser: boolean | null;
  }
  interface ContactDetailsProps {
    contacts: Contact[];
  }

const ContactDetails = ({contacts}: ContactDetailsProps) => {
  return (
    <div className="student-contacts min-h-full justify-start flex flex-col items-start" style={{ minWidth: "24%" }}>
    <h1 className="text-2xl text-center font-bold">Emergency Contacts</h1>
    {contacts.map((contact, index) => (
      <div key={index} className="emergency-contacts text-md flex items-center gap-1 w-full">
        <div className="m-0.5"><ContactEmergency className="text-3xl" fontSize="large" /></div>
        <div className="m-0.5 p-2">
          <p><PermIdentity /> {contact.name}</p>
          <p><Phone /> {contact.phone}</p>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ContactDetails