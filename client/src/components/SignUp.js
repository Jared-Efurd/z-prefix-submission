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
  border: 1px solid #0004;
  width: 30vw;
  min-width: 350px;
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

const SignUpButton = Styled.button`
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

const LoginLink = Styled.div`
  text-align: center;
  cursor: pointer;
  margin-bottom: 1vh;
`;

const SignUp = () => {

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (firstName.length === 0) {
      notify('"First Name" field is empty', 'error', 'top-center');
      return;
    }
    if (lastName.length === 0) {
      notify('"Last Name" field is empty', 'error', 'top-center');
      return;
    }
    if (username.length === 0) {
      notify('"Username" field is empty', 'error', 'top-center');
      return;
    }
    if (password.length === 0) {
      notify('"Password" field is empty', 'error', 'top-center');
      return;
    }
    if (confirmPassword.length === 0) {
      notify('"Confirm Password" field is empty', 'error', 'top-center');
      return;
    }
    if (password !== confirmPassword) {
      notify('Passwords do not match', 'error', 'top-center');
      return;
    }

    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password
      })
    })
      .then(res => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 409) {
          notify('An account with that username already exists!', 'error', 'top-center');
          throw new Error('An account with that username already exists');
        } 
      })
      .then(data => {
        setUser(data);
      })
      .catch(err => {
        notify('Error creating account...', 'error', 'top-center');
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
          Don't have an account?
        </Header>
        <Input
          placeholder='First Name'
          type='text'
          onChange={(event) => { setFirstName(event.target.value)}}
        />
        <Input
          placeholder='Last Name'
          type='text'
          onChange={(event) => { setLastName(event.target.value)}}
        />
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
        <Input 
          placeholder='Confirm Password' 
          type='password' 
          onChange={(event) => { setConfirmPassword(event.target.value) }}
        />
        <SignUpButton onClick={handleSignUp}>
          Sign Up
        </SignUpButton>
        <LoginLink onClick={() => { navigate('/login') }}>
          Login
        </LoginLink>
      </Container>
      <Toaster />
    </>
  );
}

export default SignUp;