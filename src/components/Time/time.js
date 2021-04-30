import React, {Component} from 'react';
import './time.css';

export default class Time extends Component {
    
    state = {
        time: ''
    }

    componentDidMount() {
        this.updateTime();
        this.timerId = setInterval(this.updateTime, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateTime = () => {
        const realTime = new Date()
        this.setState({
            time: realTime
        })
    }

    addZero = (time) => {
        time = time < 10 ? '0'+time : time;
        return time
    }

    render() {
        const time = new Date();

        return(
            <div className='time'>
                {`${this.addZero(time.getHours())}:${this.addZero(time.getMinutes())}:${this.addZero(time.getSeconds())}`}
            </div>
        )
    }
}