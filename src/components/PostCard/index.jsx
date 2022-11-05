import './styles.css'

export const PostCard = (props) => {
    const {posts} = props
    return (
        < div className='post' >
            <img src={posts.img.url} alt={posts.img.title}></img>
            <div>
                <h2>{posts.title}</h2>
                <h3>{posts.body}</h3>
            </div>
        </div >
    )
}