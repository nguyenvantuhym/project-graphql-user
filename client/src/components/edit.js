import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';

const GET_USER = gql`
		query user($id: String!)
		{
				user(id: $id)
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

const  UPDATE_USER = gql`
	mutation updateUser(
			$id: String!
			$username: String!,
			$password: String!,
			$name: String!,
			$email: String!,
			$roles: String!,
			$author: String!,
		)
	{
		updateUser(
				id: $id, 
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
			<Query query={GET_USER} variables={{id :this.props.match.params.id}}>
			{
					({data,loading,error})=>{
						if (loading) return 'Loading...';
						if (error) return `Error! ${error.message}`;
								return(
										<Mutation mutation={UPDATE_USER} >
						
										{
												(updateUser,{loading,error})=>{
												console.log(data)
														return(
														<div className="container">
																<label htmlFor="basic-url">username</label>
																<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"  ref={node => {
																		username = node;
																}} defaultValue={data.user.username}/>
																
																<label htmlFor="basic-url">password</label>
																<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" defaultValue={data.user.password} ref={node => {
																		password = node;
																}} />
						
																<label htmlFor="basic-url">email</label>
																<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" defaultValue={data.user.name} ref={node => {
																		email = node;
																}}/>
						
																<label htmlFor="basic-url">name</label>
																<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" defaultValue={data.user.email} ref={node => {
																		name = node;
																}}/>
						
																<label htmlFor="basic-url">roles</label>
																<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" defaultValue={data.user.roles} ref={node => {
																		roles = node;
																}}/>
						
																<label htmlFor="basic-url">author</label>
																<input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" defaultValue={data.user.author} ref={node => {
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
																								updateUser({variables:{
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
																					 
																						}
																						else {
																							 
																						}
																						
						
																				}
																		}
																>Primary</button>
																<br/>
																				{loading && <p>Loading...</p>}
																				{error && <p>Error :( Please try again</p>}
														</div>
						
														)
												}
										}
										</Mutation>
								)
					}
			}
			</Query>
		);
	}
}

export default CreateUser;
