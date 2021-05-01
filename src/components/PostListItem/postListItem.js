import React, {Component} from 'react';
import './post-list-item.css';

class PostListItem extends Component {
    state = {
        currentLetter: 0
    }

    componentDidMount() {
            this.addLetter();
    }

    addLetter = () => {
        if (this.props.animation) {
            const source = document.querySelectorAll('.label')[this.props.id-1];
            const newSpan = document.querySelectorAll('.animatedLabel')[this.props.id-1];
            let currentLetter = this.state.currentLetter;
            
            newSpan.innerHTML += source.innerHTML.substr(this.state.currentLetter, 1);
            currentLetter += 1;

            this.setState({
                currentLetter: currentLetter
            })
        }
    }

    componentDidUpdate(prevState) {
        const {id} = this.props;
        if (this.state.currentLetter !== prevState.currentLetter) {
            if (this.state.currentLetter<this.props.label.length) {
                setTimeout(() => this.addLetter(), 50);
            } 
            
            if(this.state.currentLetter===this.props.label.length) {
                console.log('stop animate');
                //this.props.changeStatus(id);
            }
        }  
    }
        

    render() {
        const {label} = this.props;

        return(
                <div className = 'postListItem'>
                    <span className = 'label' style={{display: 'none'}}>
                        {label}
                    </span>
                    <span className = 'animatedLabel'>

                    </span>
                </div>

        )
    }
}

export default PostListItem;