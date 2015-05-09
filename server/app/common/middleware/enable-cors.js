import cors from 'cors'
import config from 'config'

export default function enableCORS (req, res, next) {
  var options = {
    origin(originURL, done) {
      return done(null, config.cors.whitelist.indexOf(originURL) !== -1)
    }
  }
  cors(options)(req, res, next)
}
