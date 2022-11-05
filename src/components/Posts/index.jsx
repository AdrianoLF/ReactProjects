import './styles.css'

import {PostCard} from "../PostCard/index"

export const Posts = ({ posts }) => (
    <div className="posts">
        {posts.map(e => (
            <PostCard
                className='post'
                key={e.id}
                posts={e}
            />
        ))}
    </div>
)