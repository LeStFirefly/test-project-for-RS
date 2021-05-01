import React from 'react';
import './post-list.css';
import PostListItem from '../PostListItem';

const PostList = ({posts}) => {

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

export default PostList;