import React, { Component } from 'react';

class TweetItem extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    const { post, created_at } = this.props;

    return (
      <div style={{ marginLeft:'100px',marginBottom: '5px' ,
      backgroundColor:'#eee',width:'490px',height:'200px',
      textAlign:'center'}}>
       
        <div style={{ textAlign:'right'}}>
          Created at:{created_at}
          <hr />
        </div>
        <div style={{ fontWeight: 'bold',textAlign:'left'}}>
          {post}
         
        </div>
        
      </div>)
  }



}

export default TweetItem;
