import React, { Component, useContext, useState, useEffect } from 'react';
import { AuthUserContext } from '../Session';
import axios from 'axios';
import { useFetch } from './useFetch';

import TweetItem from './TweetItem';

import { auth } from 'firebase';

const TweetList = (props) => {

 
  //const { id } = useContext(AuthUserContext);
  const { id } = props;

  const { tweets, isFetching } = useFetch(id);


  //const [mytweets, setMyTweets] = useState({ tweets: [], isFetching: false });

  //useEffect(() => {
  //console.log('inital');
  /* const fetchTweets = async () => {
    try {
      console.log('closing');
      setMyTweets({ tweets: [], isFetching: true });
      
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
  fetchTweets(); */
  // return ()=>{console.log('closing');}
  //}, []);




  return (<div>

    {isFetching ? '.....Wait' :
      <ul style={{ listStyleType: 'None' }}>
        {
          tweets.map(tweet => <li><TweetItem {...tweet} /></li>)
        }
      </ul>}

  </div>)
}

export default TweetList;
