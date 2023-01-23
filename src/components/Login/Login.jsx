import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async event => {
    event.preventDefault();

    // validar los datos del formulario

    if (!username || !password) {
      setError('Debe ingresar un usuario y contraseña válidos.');
      return;
    }

    // Realizar la autenticacion con el backend
    try {
      const response = await axios.post('http://localhost:3000/users', {
        username,
        password
      }, {
        headers: { 'Content-type': 'application/json' }
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError('Ocurrio un error al intentar iniciar sesión');
    }
  };

  return (
    <div className="container">
      <form className='form-title' onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div className='form-group'>
          <label>
            usuario:
          </label>
          <input
            className='form-control'
            type="text"
            required
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>
            Contraseña:
          </label>
          <input
            className='form-control'
            type="password"
            required
            value={password}
            placeholder="Ingrese su contraseña"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='form-button' type="submit">Iniciar sesión</button>
        </div>
        {error && <div className='form-error'>{error}</div>}
      </form>
    </div>
  );
}

export default Login;