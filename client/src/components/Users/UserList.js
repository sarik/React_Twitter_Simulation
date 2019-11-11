import React, { Component, useContext, useState, useEffect,Suspense } from 'react';
import { AuthUserContext } from '../Session';
import axios from 'axios';



import { auth } from 'firebase';

//import UserItem from './UserItem';

/* const slowImport = (value, ms = 1000) =>{
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

const UserItem = React.lazy(() => slowImport(import('../Users/UserItem'))); */
const UserItem = React.lazy(() => import('../Users/UserItem'));

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      limit: 5,
    };
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (this.props.search !== nextProps.search) {
      try {


        let res = await axios.get(
          `http://192.168.1.16:5000/api/fecthUsers?searchText=${JSON.stringify(
            nextProps.search
          )}`
        );

        console.log('done')
        this.setState({ users: res.data })

      }
      catch (e) {
        console.log('Fetching tweets failed', e);
      }
    }
  }

  async componentDidMount() {

    try {


      let res = await axios.get(
        `http://192.168.1.16:5000/api/fecthUsers?searchText=${JSON.stringify(
          this.props.search
        )}`
      );

      console.log('done')
      this.setState({ users: res.data })

    }
    catch (e) {
      console.log('Fetching tweets failed', e);
    }


  }

  //const { id } = useContext(AuthUserContext);
  //const [ mytweets, setMyTweets ] = useState({ tweets: [], isFetching: false });

  /*  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setMyTweets({ users: [], isFetching: true });
        let res = await axios.get(
          `http://192.168.1.16:5000/api/getMyTweets?userId=${JSON.stringify(
            id
          )}`
        );
        setMyTweets({ tweets: res.data, isFetching: false });
      } catch (e) {
        console.log(e);
        setMyTweets({ tweets: [], isFetching: false });
      }
    };
    fetchTweets();
  }, [mytweets]); 

  
 */
  render() {
    return (<div>
      {this.props.search}
      <ul style={{ listStyleType: 'None' }}>
      {this.state.users.map(user => <Suspense fallback = {<div>loading user...</div>}><li><UserItem {...user}/></li></Suspense>)}
      </ul>
    </div>)
  }
}
export default UserList;
