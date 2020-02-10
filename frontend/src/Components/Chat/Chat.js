import React, {Component, Fragment} from 'react';
import './Chat.css';
import {fetchMessage} from "../../store/actions/actions";
import {connect} from "react-redux";

class Chat extends Component {

    state = {
      author: '',
      message: ''
    };

    async componentDidMount() {
       this.props.fetchMessage();
    }

    render() {
        console.log(this.props.messages);
        return (
            <Fragment>
            <div className="Chat">
                {Object.keys(this.props.messages).map(obj => (
                    <div className="chat-block" key={obj}>
                    <p className="author">{this.props.messages[obj].author}</p>
                    <p className="message">{this.props.messages[obj].message}</p>
                    </div>
                ))}
            </div>
                <div className="form-block">
                    <input type="text" placeholder="author" name="author"/>
                    <input type="text" placeholder="message" name="message"/>
                    <button>Send</button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages.messages,
});

const mapDispatchToProps = dispatch => ({
    fetchMessage: (message) => dispatch(fetchMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);