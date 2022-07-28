import { rest } from "msw";

export const handlers = [
  rest.post("/login", (_req, res, ctx) => {
    return res(ctx.cookie("auth-token", "token"));
  }),
  rest.post("/session", (_req, res, ctx) => {
    const { authToken } = req.cookies;
    if (!authToken) {
      return res(ctx.status(403), ctx.json(ThrowError(403)));
    }
  }),
  rest.get("/categories", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(
        [...Array(100).keys()].map((v) => ({
          id: v.toString(),
          title: `カテゴリ${v + 1}`,
        }))
      )
    );
  }),
  rest.get("/news", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "1",
          title: "テスト１",
          overview: "テスト記事１です。",
          createdAt: "2022-12-11",
          updatedAt: "2022-12-11",
        },
        {
          id: "2",
          title: "テスト２",
          overview: "テスト記事２です。",
          createdAt: "2022-12-11",
          updatedAt: "2022-12-11",
        },
        {
          id: "3",
          title: "テスト３",
          overview: "テスト記事３です。",
          createdAt: "2022-12-11",
          updatedAt: "2022-12-11",
        },
      ])
    );
  }),
  rest.get("/count/news", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 3,
        total: 3,
      })
    );
  }),
];

const ThrowError = (statusCode) => {
  switch (statusCode) {
    case 401:
      return "Failed to authenticate.";
    default:
      return "";
  }
};
