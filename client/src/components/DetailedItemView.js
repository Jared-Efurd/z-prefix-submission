import Styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Toaster, { notify } from './Toaster'

import { ReactComponent as EditIcon } from '../images/edit-icon.svg';

const Container = Styled.div`
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  margin-top: 5vh;
  margin-left: 20vw;
  margin-right: 20vw;
`;

const Header = Styled.header`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Heading = Styled.h2`
  grid-column: 2 / 3;
  text-align: center;
`;

const EditButton = Styled(EditIcon)`
  grid-column: 3 / 4;
  cursor: pointer;
  padding-left: calc(100% - 24px);
`;

const Divider = Styled.div`
  border-bottom: 1px solid black;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const ItemQuantity = Styled.div`

`;

const ItemDescription = Styled.div`

`;

const Input = Styled.input`
  margin-top: 2vh;
  margin-bottom: 2vh;
  outline: none;
  border: none;
  padding: 1vh;
  grid-column: 1 / 4;
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
`;

const ApplyChangesButton = Styled.button`
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

const DetailedItemView = () => {
  const { user, setUser } = useContext(UserContext);
  const { itemId } = useParams();
  const [ item, setItem ] = useState();
  const [ name, setName ] = useState('');
  const [ quantity, setQuantity ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ editMode, setEditMode ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/items/${itemId}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
      })
      .catch(err => {
        notify('Failed to fetch item...', 'error', 'top-center');
        console.log(err);
        navigate('/my-inventory');
      })
  }, [])

  const toggleEditMode = () =>{
    setEditMode(!editMode);
    setName(item.name);
    setQuantity(item.quantity);
    setDescription(item.description);
  }

  const handleApplyingChangesToItem = () => {
    if (name.length === 0) {
      notify('"Name" field is empty', 'error', 'top-center');
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
    fetch(`http://localhost:8080/users/${user.id}/items/${item.id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: item.id,
        user_id: item.user_id,
        name: name,
        description: description,
        quantity: quantity
      })
    })
    .then(res => res.json())
    .then(data => {
      setItem(data)
      setEditMode(!editMode);
      notify('Item updated!', 'success', 'top-center');
    })
  }

  const renderContents = () => {
    if (item) {
      if (editMode) {
        return (
          <>
            <Header>
              <Heading>Edit Item</Heading>
              {user.id === item.user_id && <EditButton onClick={toggleEditMode} />}
              <Input 
                placeholder='Name' 
                type='text'
                defaultValue={item.name}
                onChange={(event) => { setName(event.target.value) }}
              />
            </Header>
            <Divider />
            <Input 
              placeholder='Quantity' 
              type='number'
              defaultValue={item.quantity}
              onChange={(event) => { setQuantity(event.target.value) }}
            />
            <TextArea 
              placeholder='Description' 
              rows='5'
              defaultValue={item.description}
              onChange={(event) => { setDescription(event.target.value) }}
            />
            <ApplyChangesButton onClick={handleApplyingChangesToItem}>
              Apply Changes
            </ApplyChangesButton>
          </>
        );
      } else {
        return (
          <>
            <Header>
              <Heading>
                {item.name}
              </Heading>
              {user.id === item.user_id && <EditButton onClick={() => {setEditMode(!editMode)}} />}
            </Header>
            <Divider />
            <ItemQuantity>
              {`Quantity: x${item.quantity}`}
            </ItemQuantity>
            <ItemDescription>
              {item.description}
            </ItemDescription>
          </>
        );
      }
    }
  };

  return (
    <>
      <Container>
        {renderContents()}
      </Container>
      <Toaster />
    </>
  );
}

export default DetailedItemView;