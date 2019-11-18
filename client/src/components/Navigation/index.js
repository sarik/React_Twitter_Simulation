import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


const listStyle = {
  //display: 'inline', 
  marginBottom: '20px',
  fontWeight: 'bold',

}

const linkStyle = { textDecoration: 'none' }

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
    <ul
      className="v-menu "
      style={{
        listStyleType: 'None',
        position: 'fixed',
        width: '200px',
        height: '30px',
        left: '36px',
        top: '136px',
        fontSize: '22px',
        rightMargin: '20px'
      }}


    >
      {/* <li style = {{linkStyle}} style={listStyle}>
        <Link  style ={linkStyle} to={ROUTES.LANDING}>Landing</Link>
      </li> */}
      <li style={listStyle}>
        <Link style={linkStyle} to={ROUTES.HOME}><span style={{ fontSize: 20 }}>Home</span></Link>
      </li>
      {/*  <li style = {{linkStyle}} style={listStyle}>
        <Link  style ={linkStyle} to={ROUTES.ACCOUNT}>Account</Link>
      </li> */}
      { /*  {!!authUser.roles[ROLES.ADMIN] && (} */}
      <li style={listStyle}>
        <Link style={linkStyle} to={ROUTES.ADMIN}><span style={{ fontSize: 20 }}>Your Tweets</span></Link>
      </li>
      <li style={listStyle}>
        <a style={linkStyle} href={ROUTES.EXPLORE}><span style={{ fontSize: 20 }}>Explore</span></a>
      </li>
      {/*  )} */}
      <li >
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <ul className="h-menu">
    <li style={listStyle}>
      <Link style={linkStyle} to={ROUTES.LANDING}>Home</Link>
    </li>
    <li style={listStyle}>
      <Link style={linkStyle} to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
