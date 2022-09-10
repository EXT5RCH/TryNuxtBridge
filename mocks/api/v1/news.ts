import { ResponseResolver, MockedRequest, restContext } from 'msw'

export default class News {
  static index: ResponseResolver<MockedRequest, typeof restContext> = (
    req,
    res,
    ctx
  ) => {
    const paramLimit = req.url.searchParams.get('limit')
    const paramPage = req.url.searchParams.get('page')
    const limit = paramLimit ? Number(paramLimit) : null
    const page = paramPage ? Number(paramPage) : 1

    const list = [...Array(99)].map((_, index) => {
      return {
        id: `${index + 1}`,
        title: `テスト${index + 1}`,
        overview: `テスト記事${index + 1}です。`,
        createdAt: '2022-12-11',
        updatedAt: '2022-12-11',
      }
    })

    const newsList = limit ? list.slice(limit * (page - 1), limit * page) : list

    return res(
      ctx.status(200),
      ctx.json({
        count: Math.min(list.length, newsList.length + limit * (page - 1)),
        totalCount: list.length,
        newsList,
      })
    )
  }
}
