import React, {Component} from 'react';
import './post-list-item.css';

class PostListItem extends Component {
    state = {
        currentLetter: 0,
        animate: true
    }

    componentDidMount() {
        this.addLetter();
        if (!this.props.animation) {
            const source = document.querySelectorAll('.label')[this.props.id-1];
            source.style.display = 'block';
            const newSpan = document.querySelectorAll('.animatedLabel')[this.props.id-1];
            newSpan.style.display = 'none';
        }
    }

    addLetter = () => {
        if (this.props.animation & this.state.animate) {
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
                this.props.changeStatus(id);
            }
        }  
    }

    componentWillUnmount() {
        this.setState({animate:false});
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