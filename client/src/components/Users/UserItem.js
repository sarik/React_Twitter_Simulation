import React, { Component ,useContext,useState} from 'react';
import {AuthUserContext} from "../Session";
import axios from 'axios'
const UserItem = (props) => {
  
  const {uid} = useContext(AuthUserContext);
  
  //check useState method to check for initializing with  value
  const [following,setFollowing] =useState(props.dofollow);

  function toggleFollowing  (firebaseId)  {
   

      axios
      //.post("http://192.168.1.16:5000/api/storetweet", {
      .post("http://localhost:5000/api/toggleFollowing", {

        user:uid,
        follower: firebaseid,
        action:following?"unfollow":"follow"
      }).then(
        //alert("Tweeted successfully")
        setFollowing(!following)
      ).catch(e => alert("operation Failed ", e))  

      
  }

    const {firebaseid,created_at,firstname,dofollow} = props;

    return (
      <div style={{
        marginLeft: '100px', marginBottom: '15px',
        backgroundColor: '#eee', width: '490px', height: '100px',
        textAlign: 'center'
      }}>

        <div style={{ textAlign: 'right' }}>
          Member since:{created_at.substring(0, 10)}
          <hr />
        </div>

        <div style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '22px' }}>
          <button style={{ marginRight: '10px' }} id={firebaseid}
            onClick={e => { toggleFollowing(firebaseid); }}>{following?'Following':'Follow'}</button>
          {firstname}

        </div>

      </div>)
  }




export default UserItem;
