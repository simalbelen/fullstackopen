const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((likes, blog) => {
        return likes + blog.likes
    }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    let favorite_blog = blogs[0]

    blogs.forEach((blog) => {
        if (blog.likes > favorite_blog.likes) {
            favorite_blog = blog
        }
    })
    return favorite_blog
}

const mostBlogs = () => {
    //TODO 4.6 Y 4.7
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}
