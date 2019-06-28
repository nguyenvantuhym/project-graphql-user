import React, { Component } from 'react';
import gql from 'graphql-tag';

import {Mutation} from 'react-apollo';

const  CREATE_USER = gql`
  mutation addUser(
      $username: String!,
      $password: String!,
      $name: String!,
      $email: String!,
      $roles: String!,
      $author: String!,
    )
  {
    addUser(
        username: $username,
        password: $password,
        name: $name,
        email: $email,
        roles: $roles,
        author: $author,
    )
        {
        _id
        username
        password
        name
        email
        roles
        author
    
      }
  }
`;


class CreateUser extends Component {
    state = { message :''}
  render() {
      let username, password, email, name, roles, author;
    return (
      <Mutation mutation={CREATE_USER} onCompleted={
          ()=> this.props.history.push("/")}>

      {
          (addUser,{loading,error})=>{
              return(
                <div className="container">
                    <label for="basic-url">username</label>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref={node => {
                        username = node;
                    }}/>
                    
                    <label for="basic-url">password</label>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref={node => {
                        password = node;
                    }} />

                    <label for="basic-url">email</label>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref={node => {
                        email = node;
                    }}/>

                    <label for="basic-url">name</label>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref={node => {
                        name = node;
                    }}/>

                    <label for="basic-url">roles</label>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref={node => {
                        roles = node;
                    }}/>

                    <label for="basic-url">author</label>
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" ref={node => {
                        author = node;
                    }}/>

                    <button type="button" className="btn btn-primary"
                        onClick={
                            (e)=>{
                               if(!(username.value === '' || password.value === '' ||name.value === ''||

                               email.value === '' ||

                               roles.value === ''||


                               author.value === ''))
                               {
                                    addUser({variables:{
                                        username: username.value,
                                        password: password.value,
                                        email: email.value,
                                        name: name.value,
                                        roles: roles.value,
                                        author: author.value
                                    }});
                                    username.value = '';

                                password.value = '';

                                name.value = '';

                                email.value = '';

                                roles.value = '';


                                author.value = '';
                                this.setState({message:""})
                                }
                                else {
                                    this.setState({message:"xin vui long nhap lai"})
                                }
                                

                            }
                        }
                    >Primary</button>
                    <br/>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                            {this.state.message!==''&& this.state.message}
              </div>

              )
          }
      }
      </Mutation>
    );
  }
}

export default CreateUser;
