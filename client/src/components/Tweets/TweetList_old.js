import React, { Component, useContext, useState, useEffect } from 'react';
import { AuthUserContext } from '../Session';
import axios from 'axios';

import TweetItem from './TweetItem';

import { auth } from 'firebase';

class TweetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myTweets: [],
      loading: false,
      limit: 5,
    };
  }

  async componentDidMount() {

    try {

      if (this.props.context === "self") {
        let res = await axios.get(
          `http://192.168.1.16:5000/api/getMyTweets?userId=${JSON.stringify(
            this.props.id
          )}`
        );

        console.log('done')
        this.setState({ myTweets: res.data })
      }
      else if (this.props.context === "followers") {
        let res = await axios.get(
          `http://192.168.1.16:5000/api/getMyTweets?userId=${JSON.stringify(
            this.props.id
          )}`
        );

        console.log('done')
        this.setState({ myTweets: res.data })
      }
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

      <ul style={{ listStyleType: 'None' }}>
        {
          this.state.myTweets.map(tweet => <li><TweetItem {...tweet} /></li>)
        }
      </ul>
    </div>)
  }
}
export default TweetList;
