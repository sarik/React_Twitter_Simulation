import React, { Component } from 'react';

class TweetItem extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    const { post, created_at,firstname } = this.props;

    return (
      <div style={{ marginLeft:'100px',marginBottom: '5px' ,
      backgroundColor:'#eee',width:'490px',height:'200px',
      textAlign:'center'}}>
       
        <div style={{ textAlign:'right'}}>
          
          {!firstname ? created_at: <div > <div style = {{fontWeight:'bold'}}>{firstname}</div>   {created_at} </div> }
          <hr />
        </div>
        <div style={{ fontWeight: 'bold',textAlign:'left' ,wordWrap:'break-word'}}>
          {post}
         
        </div>
        
      </div>)
  }



}

export default TweetItem;
