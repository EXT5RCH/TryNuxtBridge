import { ResponseResolver, MockedRequest, restContext } from 'msw'

export default class CategoriesNews {
  static index: ResponseResolver<MockedRequest, typeof restContext> = (
    _req,
    res,
    ctx
  ) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: '1',
          label: 'カテゴリ１',
          type: 'array',
          items: [
            {
              id: '1-1',
              label: '記事１',
              type: 'string',
            },
            {
              id: '1-2',
              label: '記事２',
              type: 'string',
            },
          ],
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
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          id: '3',
          label: 'カテゴリ３',
          type: 'array',
          items: [
            {
              id: '3-1',
              label: '記事３',
              type: 'string',
            },
          ],
        },
      ])
    )
  }
}
