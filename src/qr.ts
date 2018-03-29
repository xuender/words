import QRCode from 'qrcode'
import program from 'commander'
import { exec } from 'shelljs'

async function main(text: string) {
  const url = await QRCode.toDataURL(text)
  exec(`chromium-browser "${url}"`, { silent: true })
}

program
  .version('0.0.1')
  .description('生成QR码,并在浏览器中打开')
  .arguments('<text>')
  .action(text => {
    main(text)
  })
  .parse(process.argv)

if (!program.args.length) { program.help() }
