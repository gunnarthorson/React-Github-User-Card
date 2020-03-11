import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';


class UserCard extends React.Component {


    constructor() {
        super();
        this.state = {
            followers: []
        }
    }

    componentDidMount() {
        console.log("component did mount");
        fetch('https://api.github.com/users/dustinmyers/followers')
            .then(res => res.json())
            .then(result => {this.setState({ followers: result }) })
            .catch(err => console.log('Error fetching followers.', err));
    }

    render() {
        return (
                <div className="container">
                <Card>
                <CardImg width="20%" src={this.props.user.avatar_url} />
                <CardBody>
                <CardTitle>Name: {this.props.user.name}</CardTitle>
                <CardSubtitle>Username: {this.props.user.login} </CardSubtitle>
                <CardText>Location: {this.props.user.location}</CardText>
                <CardText>Followers: {this.state.followers.map((item) => <p>{item.login}</p>)}</CardText>
                </CardBody>
                </Card>
                </div>
        );
    }
}

export default UserCard; 