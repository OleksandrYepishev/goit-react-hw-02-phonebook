import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Form } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';

import Initialcontacts from './contacts.json';

export class App extends Component {
  state = {
      contacts: Initialcontacts,
      filter: '',
};

  addContact = (name, number) => {
        const AddedContact = {
            id: uuidv4(),
            name,
            number,
        };
      (this.state.contacts.find(contact => contact.name === name)
          ?
          alert(`${name} is alredy in contacts`)
            :
            this.setState(({ contacts }) => ({
                contacts: [AddedContact, ...contacts],
            })) 
)};

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

    getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
    };

    render() {
        const { filter } = this.state;
        const filteredContacts = this.getFilteredContacts();
        return (
            <div>
                <h2>Phonebook
                    <Form onSubmit={this.addContact}
                    />
                </h2>
                <Filter value={filter} onChange={this.changeFilter} />
            <h2> Contacts
                <ContactList
                        contacts={filteredContacts}
                        onDeleteContact={this.deleteContact}

                />
            </h2>
           </div>
       )
           

    
  }
}
