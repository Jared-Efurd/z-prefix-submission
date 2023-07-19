import Styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Toaster, { notify } from './Toaster'

const Container = Styled.div`
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  padding: 2vw;
  margin-top: 5vh;
  margin-left: 20vw;
  margin-right: 20vw;
`;

const Header = Styled.h2`
  text-align: center;
`;

const Divider = Styled.div`
  border-bottom: 1px solid black;
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
  background-color: #D9D9D9;
  border-radius: 1vh;
  margin-right: 2vh;
  margin-bottom: 2vh;
  padding: 1vw;
  cursor: pointer;
`;

const ItemHeader = Styled.h3`
  text-align: left;
`;

const ItemQuantity = Styled.div`

`;

const ItemDescription = Styled.div`

`;

const Inventory = () => {

  const { user, setUser } = useContext(UserContext);
  const [ items, setItems ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/items`)
    .then(res => res.json())
    .then(data => {
      setItems(data);
      notify('Inventory updated!', 'success');
    })
    .catch(err => {
      notify('Error fetching inventory', 'error', 'top-center')
    })
  }, 
  [user]);

  const displayItems = () => {
    return items.map((item) => {
      return (
        <Item key={item.id} onClick={() => {navigate(`/items/${item.id}`)}}>
          <ItemHeader>
            {item.name}
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
  }

  return (
    <>
      <Container>
        <Header>
          Inventory
        </Header>
        <Divider />
        <ItemContainer>
          {displayItems()}
        </ItemContainer>
      </Container>
      <Toaster />
    </>
  );
}

export default Inventory;