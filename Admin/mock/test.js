const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@name',
    residualNum: '@integer(0, 100)',
    totalNum: '@integer(100, 150)',
    price: '免费',
    desc: '@sentence(10, 20)',
    'title|1': ['新品', '火热'],
    image: '@image(300x300)'
  }]
})

module.exports = [
  {
    url: '/test',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          lessons: items
        }
      }
    }
  }
]
