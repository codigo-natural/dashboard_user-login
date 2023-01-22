import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Dashboard.css'

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <header>
        <h1>Dashboard</h1>
        <p>Bienvenido al panel de gestion de usuarios</p>
      </header>
      <main>
        <nav>
          <p className='id'>ID</p>
        </nav>
        <nav>
          <p className='name'>Nombre</p>
        </nav>
      </main>
      <section>
        {users.map(user => (
          <ul key={user.id}>
            <li className='id'>{user.id}</li>
            <li className='name'>{user.username}</li>
          </ul>
        ))}
      </section>
    </div>
  )
}

export default Dashboard