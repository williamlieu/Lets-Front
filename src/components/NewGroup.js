import React, { Component } from 'react'
import axios from 'axios'
import Header from './Header'
import { Redirect } from 'react-router'

const GROUPS_SERVER_URL = 'https://backend-lets.herokuapp.com/groups.json'

class NewGroup extends Component {
  constructor() {
    super()
    this.state = { name: '', description: '', location: '', image: '', nickname: '', redirect: false }
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  handleChange = (name) => (event) => this.setState({ [name]: event.target.value })

  createNewGroup(group) {
    console.log(this.state)
    axios.post(GROUPS_SERVER_URL,  {headers:{"Authorization": 'Bearer ' + localStorage.getItem('jwt')}}, {data:{ name: group.name, description: group.description, image: group.image, location: group.location, nickname: group.nickname }}).then((results) => {
      console.log(results.data)
      this.setState({ redirect: true })
    }).catch(function (error) {
      console.log(error.response)
    })
  }

  _handleSubmit(event) {
    event.preventDefault()
    this.createNewGroup(this.state)
    this.setState({ name: '', description: '', location: '', image: '', nickname: '' })
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/groups' />;
    }
    return (

      <div className="container">
        <Header />
        <div className="creategroup">
        <h1>New Group</h1>
        <form onSubmit={this._handleSubmit}>
          <ul>
          <li><label>
            Name:
            <input type='text' name='name' onChange={this.handleChange('name')} value={this.state.name} />
          </label></li>
          <li><label><br></br>
            Description:
            <input type='text' name='description' onChange={this.handleChange('description')} value={this.state.description} />
          </label></li>
          <li><label><br></br>
            Location:
            <input type='text' name='location' onChange={this.handleChange('location')} value={this.state.location} />
          </label></li><br></br>
          <li><label>
            Image:
            <input type='text' name='image' onChange={this.handleChange('image')} value={this.state.image} />
          </label></li>
          <li><label><br></br>
            Nicknames:
            <input type='text' name='nicknames' onChange={this.handleChange('nickname')} value={this.state.nickname} />
          </label></li><br></br>
          <input type='submit' value='Create' className='button' />
          </ul>
        </form>
        </div>
      </div>
    )
  }
}

export default NewGroup
