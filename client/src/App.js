import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';

const GET_LISTUSER = gql`{
  users{
    _id
    username
    password
    name
    email
  }
}`;

class App extends Component {
  render() {
    return (
      <Query pollInterval={500} query={GET_LISTUSER}>
     {
       ({loading, error, data})=>{
          if(loading) return 'Loading...';
          if(error) return ('error ! '+error);
        return(

          <ul className="list-group">
          <li className="list-group-item active">Danh sach User</li>
            {
              
              data.users.map((user)=>{
                
              return(
                  <Link to={`/show/${user._id}`} key={user._id}><li className="list-group-item">{user.username}</li></Link>
                )
              })
            }
          </ul>)
       }
      }
      </Query>
    );
  }
}

export default App;
