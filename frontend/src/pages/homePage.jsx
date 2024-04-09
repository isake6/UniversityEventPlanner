import React from 'react';
import Navbar from '../components/Navbar';
import List from '../components/EventListing';
const homePage = () => {
  function fetchEvents() {
    fetch('https://somethingorother.xyz/get_events')
      .then((response) => response.json())
      .then((json) => {
        const i = `<tr><th>Name</th><th>Email</th></tr>`;

        json.forEach((event) => {
          li += `<tr>
              <td>${user.name} </td>
              <td>${user.description}</td>         
          </tr>`;
        });
      });

    document.getElementById('events').innerHTML = li;
  }

  return (
    <>
      <Navbar />
      <List />
    </>
  );
};

export default homePage;
