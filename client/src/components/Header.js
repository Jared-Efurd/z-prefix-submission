import Styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const Container = Styled.div`
  background-color: white;
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  box-shadow: 0px 0px 16px #0004;
`;

const MyInventoryNavButton = Styled.div`
  grid-column: 1 / 2;
  cursor: pointer;
  padding-left: 1vw;
  &:hover {
    color: #166895
  };
`;

const InventoryNavButton = Styled.div`
  grid-column: 2 / 3;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #166895
  };
`;

const LoginNavButton = Styled.div`
  grid-column: 3 / 4;
  cursor: pointer;
  text-align: right;
  padding-right: 1vw;
  &:hover {
    color: #166895
  };
`;

const LogoutNavButton = Styled.div`
  grid-column: 3 / 4;
  cursor: pointer;
  text-align: right;
  padding-right: 1vw;
  &:hover {
    color: #166895
  };
`;

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    setUser({
      id: 0,
      first_name: '',
      last_name: '',
      username: ''
    });
  }

  return (
    <>
    
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
          <LogoutNavButton onClick={handleLogout}>
            Logout
          </LogoutNavButton>
        ) : (
          <LoginNavButton onClick={() => {navigate('/login')}}>
            Login
          </LoginNavButton>
        )}
      </Container>
    </>
  );
}

export default Header;