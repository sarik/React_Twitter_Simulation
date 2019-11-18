import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const listStyle = { 
  //display: 'inline', 
  marginBottom: '20px' ,
  }

const linkStyle = {textDecoration: 'none'}
  
const orderStyle = { marginLeft: '20px' }

const Navigation = () => (
  <div style={{ textAlign: 'center' }}>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
            <NavigationNonAuth />
          )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <div>
    <ul style={{
      listStyleType:'None',
      position: 'fixed',
      width: '150px',
      height: '30px',
      left: '36px',
      top: '136px',
      fontSize:'22px',
    

      
    }} >
      {/* <li style = {{linkStyle}} style={listStyle}>
        <Link  style ={linkStyle} to={ROUTES.LANDING}>Landing</Link>
      </li> */}
      <li  style={listStyle}>
        <Link  style ={linkStyle} to={ROUTES.HOME}>Home</Link>
      </li>
     {/*  <li style = {{linkStyle}} style={listStyle}>
        <Link  style ={linkStyle} to={ROUTES.ACCOUNT}>Account</Link>
      </li> */}
      { /*  {!!authUser.roles[ROLES.ADMIN] && (} */}
      <li style={listStyle}>
        <Link  style ={linkStyle} to={ROUTES.ADMIN}>Your Tweets</Link>
      </li>
      <li style={listStyle}>
        <a style ={linkStyle} href={ROUTES.EXPLORE}>Explore</a>
      </li>
      {/*  )} */}
      <li style={listStyle}>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <ul >
    <li style={listStyle}>
      <Link  style ={linkStyle} to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li  style={listStyle}>
      <Link  style ={linkStyle} to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
