import React from 'react';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number}) => (
        <li key={id}>
            {name}: {number}

          <button
          type="button"
          onClick={() => onDeleteContact(id)}
         >
          Удалить
         </button>
        </li>
    ))}
  </ul>
);