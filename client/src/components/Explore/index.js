import React, { useState, Suspense,useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
//import { UserList, UserItem } from '../Users';


import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import Tweet from '../Tweets';
import {AuthUserContext} from "../Session";
const UserList = React.lazy(() => import('../Users/UserList'));
//const {UserList} = (() => import('../Users'));


const Explore = () => {
    const [search, setSearch] = useState("");
    const {uid} = useContext(AuthUserContext);
    return (

        <div style={{ marginLeft: '320px', marginTop: '100px' }}>
             <h2>Search People to follow</h2>
            <Suspense fallback={<div>Loading Profiles...</div>}>
               
                <input type="text" placeholder="search" onChange={e => setSearch(e.target.value)} value={search} />
                {/*  <Suspense fallback={<div>Please wait while we fetch users</div>}>
               <UserList search={search} />
               </Suspense> */}


                <UserList search={search} uid = {uid} />
            </Suspense>
        </div>


    );
}
const condition = authUser => !!authUser


export default compose(
    // withEmailVerification,
    withAuthorization(condition),
)(Explore);
