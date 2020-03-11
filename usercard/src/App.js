import React from 'react';
import UserCard from "./components/UserCard"
import './App.css';
import axios from 'axios'

class App extends React.Component {


  constructor() {
    super();
    this.state = {
      name: '',
      avatar_url: '',
      location: '',
      followers: [],
      user: [],
      url: '',
      new_user: ''
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/users/dustinmyers')
    .then(res => res.json())
    .then(user => {this.setState({user: user}) })
    .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({
      new_user: e.target.value
    });
  };

  UserSearch = e => {
    e.preventDefault();
    axios
      .all([
        axios.get(`https://api.github.com/users/${this.state.new_user}`),
        axios.get(
          `https://api.github.com/users/${this.state.new_user}/followers`
        )
      ])
      .then(
        axios.spread((userRes, followerRes) => {
          this.setState({
            name: userRes.data.name,
            location: userRes.data.location,
            url: userRes.data.html_url,
            followers: followerRes.data
          });
        })
      )
      .catch(err => console.log(err));
  };




  render() {
    return (
      <div>
       
        <h3>Search Github Users:</h3>
        <input 
        type='text'
        value={this.state.new_user}
        onChange={this.handleChange}
        placeholder="Search Github Users"
        />
        
        <button onClick={this.UserSearch}>Search</button>
        <UserCard user={this.state.user} />
      </div>
    );
  }
}

export default App;

