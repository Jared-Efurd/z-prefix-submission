import Styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

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
`;

const MyInventory = () => {

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id === 0) {
      navigate('/login');
    }
  }, 
  [user]);

  return (
    <Container>
      <Header>
        Your Inventory
      </Header>
      <Divider />
      <CreateNewItemButton onClick={() => {navigate('/create-new-item')}}>
        Create New Item
      </CreateNewItemButton>
      <ItemContainer>

      </ItemContainer>
    </Container>
  );
}

export default MyInventory;