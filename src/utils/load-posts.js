export const carregarPosts = async() => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const imgResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    const [posts, images] = await Promise.all([postResponse, imgResponse])

    const postsJson = await posts.json()
    const imgJson = await images.json()
    const imgsAndPosts = postsJson.map((post, index) => {
        return { ...post, img: imgJson[index] }
    })

    return imgsAndPosts
}