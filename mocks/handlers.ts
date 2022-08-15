import { rest } from 'msw'
import { Categories, CategoriesNews, Count, News, Session } from './api/v1'

export const handlers = [
  rest.post('/api/v1/login', Session.login),
  rest.post('/api/v1/logout', Session.logout),
  rest.post('/api/v1/session', Session.session),
  rest.get('/api/v1/categories', Categories.index),
  rest.get('/api/v1/categories_news', CategoriesNews.index),
  rest.get('/api/v1/news', News.index),
  rest.get('/api/v1/count/news', Count.news),
  rest.post('/api/v1/console/login', Session.login),
  rest.post('/api/v1/console/logout', Session.logout),
  rest.post('/api/v1/console/session', Session.session),
]
