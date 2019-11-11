import React, { Component, Suspense } from 'react';
import axios from 'axios';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
//const TweetList = React.lazy(() => import('./TweetList'));
import TweetList from './TweetList';

class Tweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: '',
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  createTweet = (authUser) => {

    axios
      .post("http://192.168.1.16:5000/api/storetweet", {

        firebaseId: authUser.uid,
        tweet: this.state.tweet,
      }).then(
        alert("Tweeted successfully")
      ).catch(e => alert("Failed to register tweet", e))
  }


  render() {
    const { text, messages, loading } = this.state;

    return (
      <div>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
             {/*  <div>{authUser.email}</div> */}
              <form
                onSubmit={event =>
                  this.createTweet(authUser)
                }
              >
               { this.props.showTweetArea || <textarea value={this.state.tweet} style={{ height: '200px', width: '600px', marginLeft: '20px' }}
                  onChange={e => this.setState({ tweet: e.target.value })} />}
                { this.props.showTweetArea || <button type="submit"
                  disabled={0 >= this.state.tweet.length || this.state.tweet.length > 140}>Tweet</button>}
                {
                  (this.state.tweet.length > 140) ? "Pls keep your tweet upto 140 words" : ""
                }
              </form>
              <Suspense fallback={<div>Please wait while we fetch tweets</div>}>
                <div></div>
                <TweetList id = {authUser.uid} context = {this.props.context}/>
              </Suspense>
            </div>
          )}


        </AuthUserContext.Consumer>
      </div>
    );
  }
}

export default withFirebase(Tweet);
