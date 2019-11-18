import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import Tweet from '../Tweets';

const AdminPage = () => (
  <div style={{ marginLeft: '280px' }}>
    <div style={{ marginBottom: '40px',marginTop:'80px' }}>
      <h1>You tweeted the following</h1>
    </div>

    {/* <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch> */}
    <Tweet showTweetArea={true} context="self" />
  </div>
);

const condition = authUser => !!authUser
// authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
