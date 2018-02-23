import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('localhost:8080');

        this.socket.on('RECEIVE_MESSAGE', (data) => {
            addMessage(data);
        })

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
            console.log(this.state.messages);
            this.scrollToBottom();
        };

        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message:''});
        }
    }

    scrollToBottom = () => {
        this.listEnd.scrollIntoView({ behavior: "smooth" });
    }

    handleUsernameChange(val) {
        this.setState({
            username: val
        });
    }

    handleMessageChange(val) {
        this.setState({
            message: val
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">

                            <div className="card-body">
                                <div className="card-title"> ChatApp </div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return(
                                            <div className="message" ref={(el) => { this.listEnd = el; }}>
                                                {<strong>{message.author}</strong>} {message.message}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="card-footer">
                                <input type="text" placeholder="Name" className="username-form" value={this.state.username} onChange={ (e) => this.handleUsernameChange(e.target.value) } />
                                <br/>
                                <textarea type="text" placeholder="Message" className="message-form" value={this.state.message} onChange={ (e) => this.handleMessageChange(e.target.value) } />
                                <br/>
                                <button className="btn btn-primary" onClick={this.sendMessage}> Send </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;