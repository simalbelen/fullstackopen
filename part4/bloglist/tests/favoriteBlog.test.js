const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toBe(listWithOneBlog[0])
    })

    test('when list has more than one blog, likes are the sum of all the blogs', () => {
        const result = listHelper.favoriteBlog(listWithSomeBlogs)
        expect(result).toBe(listWithSomeBlogs[2])
    })

    test('when a blog has negative likes, likes are the sum of all the blogs. It can be negative?', () => {
        const result = listHelper.favoriteBlog(listWithNegativeBlogs)
        console.log('RESULT', result)
        expect(result).toStrictEqual(listWithSomeBlogs[1]) //.toBe gives an error: Object.is equality If it should pass with deep equality, replace "toBe" with "toStrictEqual"
    })
})
