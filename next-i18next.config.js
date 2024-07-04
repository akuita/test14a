const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  localePath: typeof window === "undefined"
    ? path.resolve("./public/locales")
    : "/public/locales",
  defaultNS: ["all"],
}