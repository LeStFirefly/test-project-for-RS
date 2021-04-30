import React, {Component} from 'react';
import './app.css';
import PostList from '../PostList';
import PostAddForm from '../PostAddForm';
import Time from '../Time';

class App extends Component {
    state = {
        data : [
            {label : 'Going to learn React', id : 1},
            {label : 'That is so good!', id : 2},
            {label : 'I want to sleep...', id : 3},
            {label : 'I want to sleep...', id : 4},
            {label : 'I want to sleep...', id : 5},
            {label : 'I want to sleep...', id : 6},
            {label : 'I want to sleep...', id : 7},
            {label : 'I want to sleep...', id : 8}
        ],
        frame: true,
        initialPoint: 0,
        finalPoint: 0
    }

    addItem = (body) => {  
        let maxId = this.state.data.length;
        if (body !== '') {
            const newItem = {
                label : body,
                id: ++maxId
            }
            
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                
                return {
                    data : newArr
                }
            })
        } 
        
    }

    startSwipe = (event) => {
        //event.preventDefault();
        event.stopPropagation();
        this.setState({initialPoint : event.changedTouches[0]});
    }

    endSwipe = (event) => {
        //event.preventDefault();
        event.stopPropagation();
        this.setState({finalPoint : event.changedTouches[0]});
        this.updatePage();
    }

    updatePage = () => {

        const {initialPoint, finalPoint, frame} = this.state;

        const xDif = Math.abs(finalPoint.pageX - initialPoint.pageX); 
        
        if (xDif > 20) {
            if (frame & finalPoint.pageX<initialPoint.pageX) {
                this.setState({frame: !frame});
            } else if (!frame & finalPoint.pageX>initialPoint.pageX) {
                this.setState({frame: !frame});
            }
        }
    }

    componentDidUpdate(prevState) {
        if (this.state.frame !== prevState.frame) {
            this.updatePage();
        }
    }

    render() {
        const {data, frame} = this.state;
        let content;

        if (frame) {
            content = 
                <>
                    <PostAddForm 
                    onAdd = {this.addItem}/>
                    <PostList 
                    posts={data}
                    />
                </>
            
        } else {
            content = <Time/>
        }
        
        return(
            <div className = 'app' onTouchStart={event => this.startSwipe(event)} onTouchEnd={event => this.endSwipe(event)}>
                {content}
            </div>
        )

    }

}

export default App;