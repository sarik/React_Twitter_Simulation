import React, { Component, useContext, useState, useEffect } from 'react';
import { AuthUserContext } from '../Session';
import axios from 'axios';
import { useFetch } from './useFetch';

import TweetItem from './TweetItem';
import _ from 'lodash';
import { auth } from 'firebase';

const TweetList = (props) => {


  //const { id } = useContext(AuthUserContext);
  const { id, context } = props;

  //this usefetch will run everttime a new id is passed,like if it generated from setState
  const { tweets, isFetching } = useFetch(id, context);


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

        <h2 style ={{marginTop:'40px'}}>{(tweets.length > 0) ? '' : (context === "self") ? 'Tweet to get started' : 'No tweets from followers'}
        </h2>
        {
          _.orderBy(tweets, "created_at", "desc").map(tweet => <li key={tweet.created_at}><TweetItem {...tweet} /></li>)
        }
      </ul>}

  </div>)
}

export default TweetList;
