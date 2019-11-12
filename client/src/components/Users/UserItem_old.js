import React, { Component } from 'react';

class UserItem extends Component {
  constructor(props) {
    super(props);
    console.log('props are',props)


  }

  toggleFollowing = (firebaseId) => {
    console.log(firebaseId,)

     axios
      //.post("http://192.168.1.16:5000/api/storetweet", {
      .post("http://localhost:5000/api/storetweet", {

        firebaseId,
        user: this.state.tweet,
        action:"follow"
      }).then(
        alert("Tweeted successfully")
      ).catch(e => alert("Failed to register tweet", e)) 
  }


  render() {
    const { firstname, created_at, firebaseid } = this.props;

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
            onClick={e => { this.toggleFollowing(firebaseid); }}>Follow</button>
          {firstname}

        </div>

      </div>)
  }



}

export default UserItem;
