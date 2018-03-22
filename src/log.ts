import pino from 'pino'
const log = pino({ prettyPrint: true })

log.info('xxx [ %d ]', 30, 44)
log.error('xxx [ %d ]', 30, 44)
