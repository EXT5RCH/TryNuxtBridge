import { ResponseResolver, MockedRequest, restContext } from 'msw'

export default class Categories {
  static index: ResponseResolver<MockedRequest, typeof restContext> = (
    _req,
    res,
    ctx
  ) => {
    return res(
      ctx.status(200),
      ctx.json(
        [...Array(100).keys()].map((v: number) => ({
          id: (v + 1).toString(),
          title: `カテゴリ${v + 1}`,
          imageUrl: `https://source.unsplash.com/random/${v + 1}`,
        }))
      )
    )
  }
}
