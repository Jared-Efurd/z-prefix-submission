import Styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Toaster, { notify } from './Toaster'

const Container = Styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  width: 30vw;
  min-width: 350px;
  border: 1px solid #0004;
`;

const Header = Styled.h2`
  text-align: center;
`;

const Input = Styled.input`
  margin-top: 2vh;
  margin-bottom: 2vh;
  outline: none;
  border: none;
  padding: 1vh;
  border-bottom: 1px solid #0004;
  min-height: 30px;
`;

const LoginButton = Styled.button`
  background-color: #4BA2D2;
  text-align: center;
  border-radius: 0.5vh;
  cursor: pointer;
  border: none;
  padding: 2vh;
  color: white;
  letter-spacing: 0.1vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
  &:hover {
    background-color: #71C1EE;
  }
  min-height: 40px;
`;

const SignUpLink = Styled.div`
  text-align: center;
  cursor: pointer;
  margin-bottom: 1vh;
`;

const Login = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    if (username.length === 0 ) {
      notify('Username is required', 'error', 'top-center');
      return;
    }

    if (password.length === 0) {
      notify('Password is required', 'error', 'top-center');
      return;
    }

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else if (res.status === 404) {
          throw new Error('Incorrect username or password!')
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        notify('Incorrect username/password combination', 'error', 'top-center');
      });
  }

  useEffect(() => {
    if (user.id > 0) {
      navigate('/my-inventory');
    }
  }, 
  [user]);

  return (
    <>
      <Container>
        <Header>
          Already have an account?
        </Header>
        <Input 
          placeholder='Username' 
          type='text' 
          onChange={(event) => { setUsername(event.target.value) }}
        />
        <Input 
          placeholder='Password' 
          type='password' 
          onChange={(event) => { setPassword(event.target.value) }}
        />
        <LoginButton onClick={handleLogin}>
          Login
        </LoginButton>
        <SignUpLink onClick={() => { navigate('/sign-up') }}>
          Sign Up
        </SignUpLink>
      </Container>
      <Toaster />
    </>
    
  );
}

export default Login;