import { ResponseResolver, MockedRequest, restContext } from 'msw'

const loginUserName = 'admin'
const loginPassword = 'admin'
const authToken = 'token'

const isValidToken = (req: MockedRequest) => {
  return req.cookies['auth-token'] === authToken
}

export default class Session {
  static login: ResponseResolver<MockedRequest, typeof restContext> = async (
    req,
    res,
    ctx
  ) => {
    const { name, password } = await req.json()
    if (name === loginUserName && password === loginPassword) {
      return res(ctx.status(200), ctx.cookie('auth-token', authToken))
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized.' }))
    }
  }

  static logout: ResponseResolver<MockedRequest, typeof restContext> = (
    _req,
    res,
    ctx
  ) => {
    return res(ctx.status(200), ctx.cookie('auth-token', '', { maxAge: 0 }))
  }

  static session: ResponseResolver<MockedRequest, typeof restContext> = (
    req,
    res,
    ctx
  ) => {
    if (isValidToken(req)) {
      return res(ctx.status(200), ctx.json({}))
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized.' }))
    }
  }
}
