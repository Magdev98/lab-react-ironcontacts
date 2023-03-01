import "./App.css";
import React, { useState } from "react";
import contacts from "./contacts.json";

const unusedContacts = [...contacts];
const firstFive = unusedContacts.splice(0, 5);

function App() {
  const [contactsList, setContacts] = useState(firstFive);

  // Iteration 3 | Add New Random Contacts
  const handleAddContacts = () => {
    if (!unusedContacts.length) {
      return;
      // no empty array when we add randomContacts
    }
    const randomContacts = unusedContacts.splice(
      Math.floor(Math.random() * unusedContacts.length),
      1
    )[0];
    /* First, randomly select a contact from the array of remaining contacts. 
    Then add that contact to the array that lives in your state (that's the previously created array of 5 contacts). 
    Do not modify the state directly. 
    Instead, use the state updater function returned from the useState().
    Instead of slice to select the firstFive, use splice and put it in variable to avoid doublon with react.
    */
    const copy = [...contactsList];

    copy.push(randomContacts);
    setContacts(copy);
  };

  // Iteration 4 | Sort by popularity
  const handleSortPopularity = () => {
    const copy = [...contactsList];
    copy.sort((a, b) => b.popularity - a.popularity);
    setContacts(copy);
  };

  // Iteration 4 | Sort by name
  const handleSortName = () => {
    const copy = [...contactsList];
    copy.sort((a, b) => {
      return a.name.localeCompare(b.name);
      // if (a.name < b.name) {
      //   return -1;
      // }
      // if (a.name > b.name) {
      //   return 1;
      // } else {
      //   return 0;
      // }
    });
    setContacts(copy);
  };

  // Iteration 5 | Remove contacts
  const handleDeleteContacts = (id) => {
    const newActorList = contactsList.filter((contact) => contact.id !== id);
    setContacts(newActorList);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <div className="btn">
        <button className="btn-block" onClick={handleAddContacts}>
          Add Random Contacts
        </button>
        <button className="btn-block" onClick={handleSortPopularity}>
          Sort by popularity
        </button>
        <button className="btn-block" onClick={handleSortName}>
          Sort by name
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Iteration 1 | Display 5 Contacts */}
          {contactsList.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt={contact.name} />
                </td>
                <td className="name">{contact.name}</td>
                <td className="popularity">
                  {Math.round(contact.popularity * 100) / 100}
                </td>
                {/* Iteration 2 | Conditionally Display Awards Info
                Update the list and add two more columns "Won an Oscar" and "Won an Emmy", 
                at the end of the table. 
                Then, depending on the value wonOscar and wonEmmy of each contact, 
                conditionally render a trophy icon 🏆/ 🌟 or no content. */}
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🌟"}</td>
                <td>
                  <button
                    onClick={() => handleDeleteContacts(contact.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
