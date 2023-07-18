import Styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

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
`;

const LoginLink = Styled.div`
  text-align: center;
  cursor: pointer;
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
    if (password === confirmPassword) {
      fetch('http://localhost:8080/sign-up', {
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
        .then(res => res.json())
        .then(data => {
          setUser(data)
        })
        .catch(err => console.error(err));
    }
  }

  useEffect(() => {
    if (user.id > 0) {
      navigate('/my-inventory');
    }
  }, 
  [user]);

  return (
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
  );
}

export default SignUp;