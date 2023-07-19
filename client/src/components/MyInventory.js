import Styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Toaster, { notify } from './Toaster'

import { ReactComponent as DeleteIcon } from '../images/delete-icon.svg';

const Container = Styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  margin-top: 5vh;
  margin-left: 20vw;
  margin-right: 20vw;
  border: 1px solid #0004;
`;

const Header = Styled.h2`
  text-align: center;
`;

const Divider = Styled.div`
  border-bottom: 1px solid #0008;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const CreateNewItemButton = Styled.button`
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

const ItemContainer = Styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: white;
  padding: 1vw;
`;

const Item = Styled.div`
  width: 10vw;
  height: 10vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1vh;
  margin-right: 2vh;
  margin-bottom: 2vh;
  padding: 1vw;
  cursor: pointer;
  border: 1px solid #0004;
  box-shadow: 0px 0px 16px #0004;
  &:hover {
    box-shadow: 0px 0px 20px #0002;
  }
`;

const ItemHeader = Styled.h3`
  display: flex;
  justify-content: space-between;
`;

const ItemQuantity = Styled.div`

`;

const ItemDescription = Styled.div`

`;

const DeleteButton = Styled(DeleteIcon)`
  cursor: pointer;
  &:hover {
    fill: red;
  }
`;

const EmptyMessage = Styled.div`
  text-align: center;
  width: 100%;
`;

const MyInventory = () => {

  const { user, setUser } = useContext(UserContext);
  const [ items, setItems ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === 0) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:8080/users/${user.id}/items`)
    .then(res => res.json())
    .then(data => {
      setItems(data);
      notify('Inventory updated!', 'success');
    })
    .catch(err => {
      notify('Error fetching inventory', 'error', 'top-center');
    })
  }, 
  [user]);

  const handleDeletingItem = (item) => {
    fetch(`http://localhost:8080/users/${user.id}/items/${item.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })
    .then(res => res.json())
    .then(data => {setItems(data)})
    .catch(err => {
      notify('Failed to delete item', 'error', 'top-center');
    });
  }

  const displayItems = () => {
    if (items.length > 0) {
      return items.map((item) => {
        return (
          <Item key={item.id} onClick={() => {navigate(`/items/${item.id}`)}}>
            <ItemHeader>
              {item.name}
              <DeleteButton onClick={() => {handleDeletingItem(item)}}/>
            </ItemHeader>
            <ItemQuantity>
              {`Quantity: x${item.quantity}`}
            </ItemQuantity>
            <ItemDescription>
              {item.description.length > 100 ? item.description.substring(0, 99) + '...' : item.description}
            </ItemDescription>
          </Item>
        );
      })
    } else {
      return <EmptyMessage>Your inventory is empty.</EmptyMessage>
    }
  }

  return (
    <>
      <Container>
        <Header>
          Your Inventory
        </Header>
        <Divider />
        <CreateNewItemButton onClick={() => {navigate('/create-new-item')}}>
          Create New Item
        </CreateNewItemButton>
        <ItemContainer>
          {displayItems()}
        </ItemContainer>
      </Container>
      <Toaster />
    </>
  );
}

export default MyInventory;