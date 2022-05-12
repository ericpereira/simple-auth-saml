export function createUserSession(req: any, res: any, next: any){
  //console.log('auth controller req', req)
  // console.log('auth controller res', res)
  console.log('user aaa', req?.user)
  console.log('user aaa', req?.user)
  console.log('create user session')
  

  //Fazer login por session
  //let user = undefined
  // req.login(user, function(err: any) {
  //   if (err) { return next(err); }
  //   return res.redirect('/users/' + req.user.username);
  // });
  //console.log(req)

  //gerar algum token e enviar para o tanarede
  
  return res.status(200).json({ success: 'you logged in' })
}