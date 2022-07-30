import { worker } from "../mocks/browser.js";

export default () => {
  if (process.env.NODE_ENV === "development") {
    worker.start();
  }
};
