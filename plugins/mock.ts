import { worker } from '../mocks/browser'

export default () => {
  if (process.env.NODE_ENV === 'development') {
    worker.start()
  }
}
