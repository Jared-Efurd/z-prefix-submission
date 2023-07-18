import Styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const Container = Styled.div`
  background-color: #D9D9D9;
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

const MyInventoryNavButton = Styled.div`
  grid-column: 1 / 2;
  cursor: pointer;
  padding-left: 1vw;
`;

const InventoryNavButton = Styled.div`
  grid-column: 2 / 3;
  cursor: pointer;
  text-align: center;
`;

const LoginNavButton = Styled.div`
  grid-column: 3 / 4;
  cursor: pointer;
  text-align: right;
  padding-right: 1vw;
`;

const LogoutNavButton = Styled.div`
  grid-column: 3 / 4;
  cursor: pointer;
  text-align: right;
  padding-right: 1vw;
`;

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {

  }, [user])

  return (
    <Container>
      {user.id ? (
        <MyInventoryNavButton onClick={() => {navigate('/my-inventory')}}>
          My Inventory
        </MyInventoryNavButton>
      ): <></>}
      <InventoryNavButton onClick={() => {navigate('/')}}>
        <h2>
          Inventory
        </h2>
      </InventoryNavButton>
      {user.id ? (
        <LogoutNavButton onClick={() => {navigate('/login')}}>
          Logout
        </LogoutNavButton>
      ) : (
        <LoginNavButton onClick={() => {navigate('/login')}}>
          Login
        </LoginNavButton>
      )}
    </Container>
  );
}

export default Header;