const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ]

    const listWithSomeBlogs = [
        {
            _id: '5a422aa71b54a676234d17f7',
            title: 'Go To Statement Considered Harmful 1',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 9,
            __v: 0,
        },
    ]

    const listWithNegativeBlogs = [
        {
            _id: '5a422aa71b54a676234d17f7',
            title: 'Go To Statement Considered Harmful 1',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: -9,
            __v: 0,
        },
    ]

    test('when list is empty, there are 0 likes', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has more than one blog, likes are the sum of all the blogs', () => {
        const result = listHelper.totalLikes(listWithSomeBlogs)
        expect(result).toBe(16)
    })

    test('when a blog has negative likes, likes are the sum of all the blogs. It can be negative?', () => {
        const result = listHelper.totalLikes(listWithNegativeBlogs)
        expect(result).toBe(-2)
    })
})
