import React, {Component, Fragment} from 'react';
import './Chat.css';
import {fetchMessage, fetchMessageDate, postMessage} from "../../store/actions/actions";
import {connect} from "react-redux";

class Chat extends Component {

    state = {
      author: '',
      message: ''
    };

    async componentDidMount() {
        setInterval(() => {
            this.getObjectMessages();
        }, 2000);
    }

    changeInputHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    postingMessage = async () => {
        const newMessage = {
          author: this.state.author,
          message: this.state.message
        };
        await this.props.postMessage(newMessage);
    };

    getObjectMessages = async (datetime) => {
      if (datetime === null || datetime === undefined) {
          await this.props.fetchMessage();
      } else {
          const lastDateTime = this.props.messages[this.props.messages.length - 1].datetime;
          await this.props.fetchMessageDate(lastDateTime);
      }
    };

    async componentDidUpdate() {
       await clearInterval(() => {
            this.getObjectMessages();
        })
    }

    render() {
        return (
            <Fragment>
            <div className="Chat">
                {Object.keys(this.props.messages).map(obj => (
                    <div className="chat-block" key={obj}>
                    <p className="author">{this.props.messages[obj].author}</p>
                    <p className="message">{this.props.messages[obj].message}</p>
                    <p className="date">{this.props.messages[obj].datetime}</p>
                    </div>
                ))}
            </div>
                <div className="form-block">
                    <input type="text" placeholder="author" name="author" onChange={this.changeInputHandler}/>
                    <input type="text" placeholder="message" name="message" onChange={this.changeInputHandler}/>
                    <button onClick={this.postingMessage}>Send</button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages,
});

const mapDispatchToProps = dispatch => ({
    fetchMessage: (message) => dispatch(fetchMessage(message)),
    postMessage: (newMessage) => dispatch(postMessage(newMessage)),
    fetchMessageDate: (date) => dispatch(fetchMessageDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);