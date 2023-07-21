import Styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Toaster, { notify } from './Toaster'

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

const EmptyMessage = Styled.div`
  text-align: center;
  width: 100%;
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
    if (items.length > 0) {
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
    } else {
      return <EmptyMessage>All inventories are empty.</EmptyMessage>
    }
  }

  return (
    <>
      <Container>
        <Header>
          Entire Inventory
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