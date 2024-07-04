/** @type {import('next-sitemap').IConfig} */

console.log('process.env', process.env)
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN || '',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: true
}