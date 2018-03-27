import levelup from 'levelup'
import leveldown from 'leveldown'

async function main() {
  const db = levelup(leveldown('/tmp/my-db'))
  await db.put('foo', 'bar')
  const v = (await db.get('foo')) as Buffer
  console.log(v.toString())
}

main()
