import got from 'got'
import nock from 'nock'

nock('https://aaa.com')
  .get('/')
  .reply(200, 'Hello world!');

async function main() {
  const r = await got('aaa.com')
  console.log(r.body)
}

main()
