import React from 'react';

const FirebaseContext = React.createContext(null);

//makes the wrapped component have firebase as props
export const withFirebase = Component => props => {console.log('in fre');return (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)};

export default FirebaseContext;
