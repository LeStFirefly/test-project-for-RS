import React from 'react';
import './post-list-item.css';

class PostListItem extends React.Component {
    render() {
        const {label} = this.props;

        return(
                <div className = 'postListItem'>
                    <span className = 'label'>
                        {label}
                    </span>
                </div>

        )
    }
}

export default PostListItem;