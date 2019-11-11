import React from 'react';
import { compose } from 'recompose';


import { withAuthorization, withEmailVerification, withAuthentication } from '../Session';
import Tweet from '../Tweets';

const HomePage = () => (
 
  <div style = {{marginLeft:'220px'}}>
   {/*  <h1>Home Page</h1> */}
    <h2>See what your followers are tweeting.</h2>

    <Tweet showTweetArea = {false} context = "followers"/>
  </div>
 
);

const condition = authUser => !!authUser;

 export default compose(
  //withEmailVerification,
  withAuthorization(condition),
  //withAuthentication
)(HomePage); 


