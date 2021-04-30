import React from 'react';
import './post-add-form.css';

class PostAddForm extends React.Component {
    state = {
            text : ''
        }

    onValueChange = (e) => {
        this.setState({text : e.target.value})
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({text : ''})
    }
    
    render() {
        return(
            <form 
                className = 'form'
                onSubmit = {this.onSubmit}>
                <input
                    type = 'text'
                    placeholder = 'О чем вы думаете сейчас?'
                    className = 'textArea'
                    onChange = {this.onValueChange}
                    value = {this.state.text}
                />
                <button 
                    type = 'submit'
                    className = 'submitButton'>
                    Отправить
                </button>
            </form>
        )
    }
}

export default PostAddForm;