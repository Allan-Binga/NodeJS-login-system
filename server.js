const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '786029452466-kclsrsoateeb1gkmp3r5dlu9kpv55i2q.apps.googleusercontent.com'
const client = new OAuth2Client();

const PORT = process.env.PORT || 3900

//Middleware
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    let token = req.body.token;

    console.log(token)
    async function verify(){
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload)
}
  verify()
  .then(()=>{
    res.cookie('session-token', token)
    res.send('success')
  }).catch(console.error); 
})

app.get('/profile', (req, res)=>{
    let user = req.user
    res.render('profile', {user})
})

app.get('/protectedroute', (req, res)=>{
    res.render('protectedroute.ejs')
})

app.get('/logout', (req, res)=>{
    res.clearCookie('serrion-token')
    res.redirect('/login')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})