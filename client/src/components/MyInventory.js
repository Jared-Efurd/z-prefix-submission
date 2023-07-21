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
  border: 1px solid #0004;
  width: 50vw;
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
  min-height: 40px;
`;

const ItemContainer = Styled.div`
  display: flex;
  flex-flow: row wrap;
  background-color: white;
  padding: 1vw;
  justify-content: space-around;
`;

const Item = Styled.div`
  width: 11vw;
  height: 11vw;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 1vh;
  margin: 0.5vw;
  padding: 1vw;
  cursor: pointer;
  border: 1px solid #0004;
  box-shadow: 0px 0px 10px #16689530;
  &:hover {
    box-shadow: none;
  }
  min-width: 210px;
  min-height: 210px;
`;

const ItemHeader = Styled.h3`
  display: flex;
  justify-content: space-between;
  margin-top: 1vh;
  margin-bottom: 10px;
  border-bottom: 1px solid #0004;
  padding-bottom: 10px;
`;

const ItemQuantity = Styled.small`
  margin-bottom: 10px;
`;

const ItemDescription = Styled.div`

`;

const DeleteButton = Styled.span`
  cursor: pointer;
  min-width: 24px;
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
              <DeleteButton onClick={() => {handleDeletingItem(item)}}>
                <DeleteIcon />  
              </DeleteButton>
            </ItemHeader>
            <ItemQuantity>
              <i>
                {`Quantity: x${item.quantity}`}
              </i>
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