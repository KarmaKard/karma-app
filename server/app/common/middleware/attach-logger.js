import bunyan from 'bunyan'
import config from 'config'

export function create () {
  var streams = [{
    level: 'trace',
    stream: process.stdout
  }]

  var log = bunyan.createLogger({
    name: config.log.name,
    streams: streams
  })

  log.on('error', function (err, stream) {
    console.error('Error for log stream %s: %j', stream, err)
  })

  return log
}


export default function (log) {
  return function(req, res, next) {
    req.log = log.child({
      request_id: req.id
    })

    var start = new Date().getTime()

    function logResponse () {
      var duration = (new Date().getTime() - start)
      res.removeListener('finish', logResponse)
      res.removeListener('close', logResponse)
    }

    res.on('finish', logResponse)
    res.on('close', logResponse)
    next()
  }
}
