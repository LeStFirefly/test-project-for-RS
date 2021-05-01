import React, {Component} from 'react';
import './app.css';
import PostList from '../PostList';
import PostAddForm from '../PostAddForm';
import Time from '../Time';

export default class App extends Component {
    state = {
        data : [
            {label : 'Going to learn React', id : 1},
            {label : 'That is so good!', id : 2},
            {label : 'I want to sleep...', id : 3},
            {label : 'I want to sleep...', id : 4},
            {label : 'I want to sleep...', id : 5},
            {label : 'I want to sleep...', id : 6},
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
            {label : 'I want to sleep...', id : 17}
        ],
        frame: true,
        initialPoint: 0,
        finalPoint: 0,
        scrollY: 0
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
                    data : newArr,
                }
            })
        } 
        
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
        
        if (xDif > 30) {
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
    componentDidMount() {
        if (this.state.frame) {
            console.log('создан'+this.state.scrollY);
            window.scrollTo(0,this.state.scrollY)
            console.log('done');
            window.addEventListener('scroll', this.listenToScroll);
        }        
    }
    componentDidUpdate(prevFrame) {
        if (this.state.frame !== prevFrame.frame) {
            this.updatePage();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
        console.log('уничтожен'+this.state.scrollY)
    }

    listenToScroll = () => {
        if (this.state.frame) {
            const scroll = window.pageYOffset;
            this.setState({
              scrollY: scroll,
            })
            console.log(this.state.scrollY);
        }
      }

    render() {
        const {data, frame} = this.state;

        const postSection = (
            <>
                <PostAddForm 
                onAdd = {this.addItem}/>
                <div className='SwipeZone' onTouchStart={event => this.startSwipe(event)} onTouchEnd={event => this.endSwipe(event)}>
                    <PostList posts={data}/>
                </div>
            </>
        );

        const timeSection = (
            <div className='SwipeZone' onTouchStart={event => this.startSwipe(event)} onTouchEnd={event => this.endSwipe(event)}>
                <Time/>
            </div>
        );


        const content = frame ? postSection : timeSection;
        
        return(
            <div className = 'app'>
                {content}
            </div>
        )

    }

}