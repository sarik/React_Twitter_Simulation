import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => {console.log('in fre');return (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)};

export default FirebaseContext;
