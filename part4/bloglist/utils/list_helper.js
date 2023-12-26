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
    let favorite_blog = {}
    blogs.forEach((blog) => {
        if (blog.likes > (favorite_blog.likes || 0)) {
            favorite_blog = blog
        }
    })
    return favorite_blog
}

const mostBlogs = (blogs) => {
    const num_blogs = blogs.reduce((most_blogs, blog) => {
        most_blogs[blog.author] = (most_blogs[blog.author] || 0) + 1
        return most_blogs
    }, {})

    const obj_to_list = Object.keys(num_blogs).map((key) => {
        return { author: key, num_blogs: num_blogs[key] }
    })

    return obj_to_list.reduce((author, el) => {
        if (el.num_blogs >= (author.num_blogs || 0)) return el
        return author
    }, {})
}

const mostLikes = (blogs) => {
    const num_likes = blogs.reduce((most_likes, blog) => {
        most_likes[blog.author] = (most_likes[blog.author] || 0) + blog.likes
        return most_likes
    }, {})

    const obj_to_list = Object.keys(num_likes).map((key) => {
        return { author: key, num_likes: num_likes[key] }
    })
    const aux = obj_to_list.reduce((author, el) => {
        if (el.num_likes >= (author.num_likes || 0)) return el
        return author
    }, {})
    return aux
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
