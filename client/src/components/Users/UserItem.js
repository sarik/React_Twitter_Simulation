import React, { Component } from 'react';

class UserItem extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    const { firstname, created_at ,firebaseid} = this.props;

    return (
      <div style={{ marginLeft:'100px',marginBottom: '15px' ,
      backgroundColor:'#eee',width:'490px',height:'100px',
      textAlign:'center'}}>
       
        <div style={{ textAlign:'right'}}>
          Member since:{created_at.substring(0,10)}
          <hr />
        </div>
        
        <div style={{ fontWeight: 'bold',textAlign:'left',fontSize:'22px'}}>
        <button style={{ marginRight:'10px'}} id = {firebaseid}>Follow</button>
          {firstname}
         
        </div>
        
      </div>)
  }



}

export default UserItem;
