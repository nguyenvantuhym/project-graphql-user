import React, { Component } from 'react';
import gql from 'graphql-tag';

import {Link} from 'react-router-dom'
import {Query, Mutation} from 'react-apollo';

const GET_USER = gql`
  query user($id: String!)
  {
    user(id: $id){
        _id
        username
        password
        name
        email
    
      }
  }
`;
const DELETE_USER = gql`
  mutation removeUser($id :String!){
    removeUser(id: $id)
    {
        _id
    }
  }
`;

class Detail extends Component {
  render() {
    return (
      <Query pollInterval={2000} query={GET_USER} variables={{id: this.props.match.params.id}}>
      
     {
       ({loading, error, data})=>{
          if(loading) return 'Loading...';
          console.log(this.props.match.params.id);
          if(error) return ('error ! '+error);
        return(
            <div>

                <ul className="list-group">
                    <li className="list-group-item active">Thoong tin chi tieets cuar {data.user._id}</li>
                    <li className="list-group-item ">{data.user.username}</li>
                    <li className="list-group-item ">{data.user.email}</li>
                    <li className="list-group-item ">{data.user.name}</li>
                   
                    
                </ul>
                <Mutation mutation={DELETE_USER} onCompleted={()=> this.props.history.push('/')}>
                {
                    (removeUser,{loading,error,data})=>
                    <div>
                        <button type="button" className="btn btn-danger" onClick={
                            (event)=>{
                                removeUser({variables:{id : this.props.match.params.id}})
                            }
                        }>detele</button>
                        <Link to={`/edit/${this.props.match.params.id}`}><button type="button" className="btn btn-outline-primary">chinh sua</button></Link>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                    </div>
                }
                </Mutation>
          </div>
          )
        
       }
      }
        
     
      </Query>
    );
  }
}

export default Detail;
