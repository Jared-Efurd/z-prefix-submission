import Styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
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

const Divider = Styled.div`
  border-bottom: 1px solid #0008;
  margin-top: 2vh;
  margin-bottom: 2vh;
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

const TextArea = Styled.textarea`
  margin-top: 2vh;
  margin-bottom: 2vh;
  outline: none;
  border: none;
  padding: 1vh;
  resize: none;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #0004;
`;

const SaveButton = Styled.button`
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


const CreateNewItem = () => {

  const { user, setUser } = useContext(UserContext);
  const [ name, setName ] = useState('');
  const [ quantity, setQuantity ] = useState('');
  const [ description, setDescription ] = useState('');
  const navigate = useNavigate();

  const handleSavingNewItem = () => {
    if (name.length === 0) {
      notify('"Item name" field is empty', 'error', 'top-center');
      return;
    }
    if (quantity.length === 0) {
      notify('"Quantity" field is empty', 'error', 'top-center');
      return;
    }
    if (description.length === 0) {
      notify('"Description" field is empty', 'error', 'top-center');
      return;
    }

    fetch('http://localhost:8080/items', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        name: name,
        description: description,
        quantity: Number(quantity)
      })
    })
      .then(res => res.json())
      .then(data => {
        navigate('/my-inventory');
      })
      .catch(err => {
        notify('There was an error creating a new item...', 'error', 'top-center');
      });
  }

  useEffect(() => {
    if (user.id === 0) {
      navigate('/login');
    }
  }, 
  [user]);

  return (
    <>
      <Container>
        <Header>
          Create New Item
        </Header>
        <Divider />
        <Input 
          placeholder='Name' 
          type='text'
          onChange={(event) => { setName(event.target.value) }}
        />
        <Input 
          placeholder='Quantity' 
          type='number'
          onChange={(event) => { setQuantity(event.target.value) }}
        />
        <TextArea 
          placeholder='Description' 
          rows='5'
          onChange={(event) => { setDescription(event.target.value) }}
        />
        <SaveButton onClick={handleSavingNewItem}>
          Save
        </SaveButton>
      </Container>
      <Toaster />
    </>
  );
}

export default CreateNewItem;