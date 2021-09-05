import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import Initialcontacts from '../../contacts.json';

import { Form } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Container } from '../Container/Container';

import { Title } from './App.styled';

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
      (this.state.contacts
          .find(contact => contact.name.toLowerCase() === name.toLowerCase())
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
            <Container>
                <Title>Phonebook
                <Form onSubmit={this.addContact}
                    />
            </Title>
            <Title> Contacts
                <Filter value={filter} onChange={this.changeFilter} />
                
                  <ContactList
                    contacts={filteredContacts}
                    onDeleteContact={this.deleteContact}

                  />
            </Title>
           </Container>
       )
           

    
  }
}
