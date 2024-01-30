// src/MyApp.js

import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from 'react';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  // function removeOneCharacter(index) {
  //   const characterToRemove = characters[index];
  //   fetch(`http://localhost:8000/users/${characterToRemove.id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(response => {
  //       if (response.status === 204) {
  //         const updated = characters.filter((character, i) => i !== index);
  //         setCharacters(updated);
  //       } else if (response.status === 404) {
  //         throw new Error('User not found');
  //       } else {
  //         throw new Error('Failed to delete user');
  //       }
  //     })
  //     .catch(error => console.log(error));
  // }

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 204) {
          const updated = characters.filter((character) => character.id !== id);
          setCharacters(updated);
        } else if (response.status === 404) {
          throw new Error('User not found');
        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch(error => console.log(error));
  }

  function updateList(person) {
    postUser(person)
      .then(createdUser => setCharacters(prevCharacters => [...prevCharacters, createdUser]))
      .catch(error => console.log(error));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  // function postUser(person) {
  //   return fetch("http://localhost:8000/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(person),
  //   })
  //     .then((response) => {
  //       if (response.status === 201) {
  //         return response.json();
  //       } else {
  //         throw new Error('Failed to create user');
  //       }
  //     })
  //     .then((createdUser) => {
  //       setCharacters([...characters, createdUser]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
    .then(response => response.json());
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}


export default MyApp;
