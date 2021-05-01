import React, {Component} from 'react';
import './post-add-form.css';

class PostAddForm extends Component {
    state = {
            text : ''
        }

    onValueChange = (e) => {
        this.setState({text : e.target.value})
    }
    
    onSubmit = (e) => {    
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({text : ''});
    }
    
    render() {
        return(
            <form 
                className = 'form'
                onSubmit = {this.onSubmit}>
                <textarea
                    placeholder = 'О чем вы думаете сейчас?'
                    className = 'textArea'
                    onChange = {this.onValueChange}
                    value = {this.state.text}
                    autoFocus
                />
                <button color="info"
                    type = 'submit'
                    className = 'submitButton'>
                    Отправить
                </button>
            </form>
        )
    }
}

export default PostAddForm;