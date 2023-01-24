import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Login.css'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    // validar los datos del formulario

    if (!username || !password) {
      setError('Debe ingresar un usuario y contraseña válidos.');
      return;
    }
    if (username.length < 5 || username.length > 20) {
      setError('El nombre de usuario debe tener entre 5 y 20 caracteres.')
      return;
    }
    if (password.length < 8 || password.length > 20) {
      setError('La contraseña debe tener entre 8 y 20 caracteres.');
      return;
    }

    // Deshabilitar el botón de inicio de sesión mientras se realiza la petición
    setIsLoading(true);

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
      } else if (response.status === 400) {
        setError('usuario o contraseña inválidos');
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setError('Ocurrio un error al intentar iniciar sesión');
    } finally {
      setIsLoading(false);
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
          {
            isLoading
              ? <LoadingSpinner />
              : <button className='form-button' type="submit">
                Iniciar sesión
              </button>}
        </div>
        {error && <div className='form-error'>{error}</div>}
      </form>
    </div>
  );
}

export default Login;