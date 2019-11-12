import React, { Component, useContext, useState, useEffect } from 'react';
import { AuthUserContext } from '../Session';
import axios from 'axios';
import { useFetch } from './useFetch';

import TweetItem from './TweetItem';

import { auth } from 'firebase';

const TweetList = (props) => {

  const [mytweets, setMyTweets] = useState({ tweets: [], isFetching: false });
 
  //const { id } = useContext(AuthUserContext);
  const { id ,context} = props;

  //this usefetch will run everttime a new id is passed,like if it generated from setState
  //const { tweets, isFetching } = useFetch(id,context);


  //const [mytweets, setMyTweets] = useState({ tweets: [], isFetching: false });

  useEffect(() => {
  console.log('inital');
   const fetchTweets = async () => {
    try {
      console.log('closing');
      setMyTweets({ tweets: [], isFetching: true });
      
      let res = await axios.get(
        `http://localhost/api/getMyTweets?userId=${JSON.stringify(
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
   return ()=>{console.log('closing');}
   //why mytweets cant be passed here is since we are listening to it and we are changing mytweets through 
   //setMyTweets inside,so it will 
   //get stuck in an infinite loop
  }, []);




  return (<div>

    {mytweets.isFetching ? '.....Wait' :
      <ul style={{ listStyleType: 'None' }}>
        {
          mytweets.tweets.map(tweet => <li><TweetItem {...tweet} /></li>)
        }
      </ul>}

  </div>)
}

export default TweetList;
