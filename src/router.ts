import express, { NextFunction, Request, Response } from 'express'
const Saml2js = require('saml2js');
import passport from './middleware/passportHandler'
import useragent from 'useragent'
import { createUserSession } from './controllers/authController';
import bodyParser from 'body-parser';

const router = express.Router()

//middleware para pegar os dados de device de quem esta acessando
const userAgentHandler = (req: any, res: Response, next: NextFunction) => {
  const agent = useragent.parse(req.headers['user-agent'])

  const deviceInfo = Object.assign({}, {
    device: agent.device,
    os: agent.os
  })

  //console.log('deviceInfo', deviceInfo)
  req.device = deviceInfo
  
  return next()
}

/*rota de autenticação
  autentica se IDP
  se a sessão está ativa retorna a saml response
  se a sessão não está ativa redireciona para o idp login form
*/
router.get('/login/sso',
  passport.authenticate('saml', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

router.post('/login/sso/callback',
  userAgentHandler,
  passport.authenticate('saml',
    {
      failureRedirect: '/login',
      failureMessage: true
    }
  ),
  (req, res, next) => createUserSession(req, res, next)
)

export default router