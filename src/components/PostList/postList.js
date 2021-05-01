import React, {Component} from 'react';
import './post-list.css';
import PostListItem from '../PostListItem';

export default class PostList extends Component {
    
    render() {
        const {posts} = this.props;

        const elements = posts.map((post) => {
            return(
                <li key={post.id} className = 'listItem'>
                    <PostListItem 
                    label= {post.label} 
                    animation = {post.animation}
                    id = {post.id}
                    changeStatus = {(id) => this.props.changeStatus(id)}
                    />
                </li>
            ) 
        })

        return(
            <ul className = 'list'>
                {elements}
            </ul>
        )
    }   
}
