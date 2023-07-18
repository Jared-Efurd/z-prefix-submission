import Styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Toaster, { notify } from './Toaster'

const Container = Styled.div`
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  margin-top: 5vh;
  margin-left: 30vw;
  margin-right: 30vw;
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
`;

const SignUpLink = Styled.div`
  text-align: center;
  cursor: pointer;
`;

const Login = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (event) => {
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
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        notify('There was an error logging in...', 'error', 'top-center');
        console.error(err);
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