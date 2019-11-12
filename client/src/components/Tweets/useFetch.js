import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (id, context) => {
  const [mytweets, setMyTweets] = useState({ tweets: [], isFetching: false });

  useEffect(
    () => {
      setMyTweets({ tweets: [], isFetching: true });

      //the cleanup method
      const fetchTweets = async () => {
        try {
          console.log('closing', id);
          setMyTweets({ tweets: [], isFetching: true });

          let apiToCall = "getMyTweets"
          if (context === "followers")

            apiToCall = "getFollowerTweets"

          let res = await axios.get(
            //http://192.168.1.16:5000
            `http://localhost:5000/api/${apiToCall}?userId=${JSON.stringify(
              id
            )}`
          );
          console.log(res.data, 'pr');
          setMyTweets({ tweets: res.data, isFetching: false });

        } catch (e) {
          console.log('catch');
          setMyTweets({ tweets: [], isFetching: false });
        }
      };
      fetchTweets();
    }, [id]);
  return mytweets
}
