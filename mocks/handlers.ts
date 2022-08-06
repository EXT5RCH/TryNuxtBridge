import { rest } from 'msw'
import { Categories, CategoriesNews, Count, News, Session } from './api'

export const handlers = [
  rest.post('/login', Session.login),
  rest.post('/logout', Session.logout),
  rest.post('/session', Session.session),
  rest.get('/categories', Categories.index),
  rest.get('/categories_news', CategoriesNews.index),
  rest.get('/news', News.index),
  rest.get('/count/news', Count.news),
]
