import { ResponseResolver, MockedRequest, restContext } from 'msw'

export default class count {
  static news: ResponseResolver<MockedRequest, typeof restContext> = (
    _req,
    res,
    ctx
  ) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 3,
        total: 3,
      })
    )
  }
}
