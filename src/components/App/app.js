import React, {Component} from 'react';
import './app.css';
import PostList from '../PostList';
import PostAddForm from '../PostAddForm';
import Time from '../Time';

export default class App extends Component {
    state = {
        data : [
            {label : 'Going to learn React', id : 1, animation: true},
            {label : 'That is so good!', id : 2, animation: true},
            {label : 'I want to sleep...', id : 3, animation: true},
            {label : 'I want to sleep...', id : 4, animation: true},
            {label : 'I want to sleep...', id : 5, animation: true},
/*             {label : 'I want to sleep...', id : 6},
            {label : 'I want to sleep...', id : 7},
            {label : 'I want to sleep...', id : 8},
            {label : 'I want to sleep...', id : 9},
            {label : 'I want to sleep...', id : 10},
            {label : 'I want to sleep...', id : 11},
            {label : 'I want to sleep...', id : 12},
            {label : 'I want to sleep...', id : 13},
            {label : 'I want to sleep...', id : 14},
            {label : 'I want to sleep...', id : 15},
            {label : 'I want to sleep...', id : 16},
            {label : 'I want to sleep...', id : 17} */
        ],
        scrollY: 0,
        frame: true,
        initialPoint: 0,
        finalPoint: 0,
    }

    addItem = (body) => {  
        let maxId = this.state.data.length;
        if (body !== '') {
            const newItem = {
                label : body,
                id: ++maxId,
                animation: true
            }
            
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                
                return {
                    data : newArr,
                }
            })
        } 
    }

    changeAnimationStatus = (id) => {
        if (this.state.data[id-1].animation) {
            let changedItem = this.state.data[id-1];
            changedItem.animation = false;
            this.setState(({data}) => {
                const newArr = [
                    ...data.slice(0,id-1),
                    changedItem,
                    ...data.slice(id)
                ];
       
                return {
                    data : newArr,
                }
            })
        } 
    }

    setScroll = (scroll) => {
        this.setState({scrollY:scroll});
    }

    startSwipe = (event) => {
        event.stopPropagation();
        this.setState({initialPoint : event.changedTouches[0]});
    }

    endSwipe = (event) => {
        event.stopPropagation();
        this.setState({finalPoint : event.changedTouches[0]});
        this.updatePage();
    }

    updatePage = () => {
        const {initialPoint, finalPoint, frame} = this.state;

        const xDif = Math.abs(finalPoint.pageX - initialPoint.pageX); 
        
        if (xDif > 50) {
            if (frame & finalPoint.pageX<initialPoint.pageX) {
                this.setState({
                    frame: !frame
                });
            } else if (!frame & finalPoint.pageX>initialPoint.pageX) {
                this.setState({
                    frame: !frame
                });
            }
        }
    }

    componentDidUpdate(prevFrame) {
        if (this.state.frame !== prevFrame.frame) {
            this.updatePage();
        }
    }

    render() {
        const {frame} = this.state;

        const content = frame ? 
        <PostSection startSwipe={this.startSwipe} endSwipe={this.endSwipe} data={this.state.data} scrollY={this.state.scrollY} setScroll={this.setScroll} onAdd={this.addItem} changeStatus={this.changeAnimationStatus}/>
        : <TimeSection startSwipe={this.startSwipe} endSwipe={this.endSwipe}/>;
        
        return(
            <div className = 'app'>
                {content}
            </div>
        )

    }

}

class PostSection extends Component {


    componentDidMount() {
        window.scrollTo(0,this.props.scrollY)
        window.addEventListener('scroll', this.listenToScroll);      
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
    }

    listenToScroll = () => {
        const scroll = window.pageYOffset;
        this.props.setScroll(scroll);
    }

    render() {
        const {data} = this.props;

        return (
            <>
            <PostAddForm 
            onAdd = {this.props.onAdd}/>
            <div className='SwipeZone' onTouchStart={event => this.props.startSwipe(event)} onTouchEnd={event => this.props.endSwipe(event)}>
                <PostList posts={data} changeStatus={(id) => this.props.changeStatus(id)}/>
            </div>
        </>
        )

    }
}
class TimeSection extends Component{
    render() {
        return (
            <div className='SwipeZone' onTouchStart={event => this.props.startSwipe(event)} onTouchEnd={event => this.props.endSwipe(event)}>
                <Time/>
            </div>
        )
    }
}