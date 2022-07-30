import { rest } from 'msw'

const loginUserName = 'admin'
const loginPassword = 'admin'

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const { name, password } = await req.json()
    if (name === loginUserName && password === loginPassword) {
      return Response.success(res, ctx, ctx.cookie('auth-token', 'token'))
    } else {
      return Response.unauthorized(res, ctx)
    }
  }),
  rest.post('/session', (req, res, ctx) => {
    const { authToken } = req.cookies
    if (!authToken) {
      return Response.unauthorized(res, ctx)
    }
  }),
  rest.get('/categories', (_req, res, ctx) => {
    return Response.success(
      res,
      ctx,
      ctx.json(
        [...Array(100).keys()].map(v => ({
          id: (v + 1).toString(),
          title: `カテゴリ${v + 1}`,
          imageUrl: `https://source.unsplash.com/random/${v + 1}`
        }))
      )
    )
  }),
  rest.get('/categories_news', (_req, res, ctx) => {
    return Response.success(
      res,
      ctx,
      ctx.json([
        {
          id: '1',
          label: 'カテゴリ１',
          type: 'array',
          items: [
            {
              id: '1-1',
              label: '記事１',
              type: 'string'
            },
            {
              id: '1-2',
              label: '記事２',
              type: 'string'
            }
          ]
        },
        {
          id: '2',
          label: 'カテゴリ２',
          type: 'array',
          items: [
            {
              id: 'game',
              label: 'ゲーム',
              type: 'array',
              items: [
                {
                  id: '2-game-4',
                  label: '記事３',
                  type: 'string'
                }
              ]
            }
          ]
        },
        {
          id: '3',
          label: 'カテゴリ３',
          type: 'array',
          items: [
            {
              id: '3-1',
              label: '記事３',
              type: 'string'
            }
          ]
        }
      ])
    )
  }),
  rest.get('/news', (_req, res, ctx) => {
    return Response.success(
      res,
      ctx,
      ctx.json([
        {
          id: '1',
          title: 'テスト１',
          overview: 'テスト記事１です。',
          createdAt: '2022-12-11',
          updatedAt: '2022-12-11'
        },
        {
          id: '2',
          title: 'テスト２',
          overview: 'テスト記事２です。',
          createdAt: '2022-12-11',
          updatedAt: '2022-12-11'
        },
        {
          id: '3',
          title: 'テスト３',
          overview: 'テスト記事３です。',
          createdAt: '2022-12-11',
          updatedAt: '2022-12-11'
        }
      ])
    )
  }),
  rest.get('/count/news', (_req, res, ctx) => {
    return Response.success(
      res,
      ctx,
      ctx.json({
        count: 3,
        total: 3
      })
    )
  })
]

class Response {
  static success = (res, ctx, ...options) => {
    return res(ctx.status(200), ...options)
  }

  static unauthorized (res, ctx) {
    return res(ctx.status(401), ctx.json({ message: 'Unauthorized.' }))
  }

  static notFound (res, ctx, name) {
    return res(ctx.status(404), ctx.json({ message: `${name} not found.` }))
  }
}
