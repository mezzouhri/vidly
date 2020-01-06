import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://d065395eab094f85b0694e75ea49027d@sentry.io/1871794"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
