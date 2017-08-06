const express = require('express');
const app = express();
const bodyParser = require('body-parser');
users = [
  {id: 1, email:"test@free.fr", nickname: 'Tutu' , password: "aze", role: "admin"},
  {id: 1, email:"test2@free.fr", nickname: 'Tutu2' , password: "aze", role: "user"}
];
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

let data  = require('./jobs');
let initialJobs = data.jobs;
let addJobs = [];

const getAllJobs = () => {
  return [...addJobs, ...initialJobs];
}

const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
  if(req.body){
    const email = req.body.email.toLowerCase();
    const pwd = req.body.password.toLowerCase();
    const index = users.findIndex(user => user.email === email)

    if(index > -1 && users[index].password === pwd) {
      delete req.body.password
      // res.json({success: true, data: req.body});
      let user = users[index];
      let token = '';
      if(user.email === "test@free.fr"){
        token = jwt.sign({iss: 'http://localhost:4002', role: 'admin', email: req.body.email, nickname: user.nickname}, secret);
      }else{
        token = jwt.sign({iss: 'http://localhost:4002', role: 'user', email: req.body.email, nickname: user.nickname}, secret);
      }

      res.json({success: true, token});
    }else{
      res.status(401).json({success: false, message: "Identidiants incorrects"});
    }
  }else{
    res.status(500).json({success: false, message: 'données manquantes!!'});
  }
});

auth.post('/register', (req, res) => {
  console.log(req.body);
  if(req.body) {
    const email = req.body.email.toLowerCase().trim();
    const pwd = req.body.password.toLowerCase().trim();
    const nickname = req.body.nickname.toLowerCase().trim();
    users = [{id: Date.now(), email: email, password: pwd, nickname: nickname }, ...users]
    res.json({success: true, users});
    console.log(users);
  }else{
    res.json({success: false, message: " La création à échouée"});
  }
});

api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.get('/jobs/:email', (req, res) => {
  const email = req.params.email;
  const jobs = getAllJobs().filter(job => job.email === email);
  res.json({ success: true, jobs});
});
const checkUserToken = (req, res, next) =>{
  if(!req.header('authorization')){
    return res.status(401).json({ success: false, message: "Authentification à échouer"});
  }

  const authorizationsParts = req.header('authorization').split(' ');
  let token  = authorizationsParts[1];
  jwt.verify(token, secret, (error, decodedToken) => {
    if(error) {
      return res.status(401).json({ success: false, message: 'Token non valide'})
    }else{
      next();
    }
  });

  next();
};

api.post('/jobs', checkUserToken, (req, res) => {
  const job = req.body;
  addJobs = [job, ...addJobs];
  res.json(job);
});
api.get('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const job = getAllJobs().filter(j => j.id === id);
  if(job.length === 1){
    res.json({success: true, job: job[0]});
  }else{
    res.json({success: false, message: "Pas de job"});
  }
});

api.get('/search/:term/:place?', (req, res) => {
  const term= req.params.term.toLowerCase().trim();
  let place = req.params.place;
  let jobs = getAllJobs().filter( j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
  if(place){
    place = place.toLowerCase().trim();
    jobs = jobs.filter( j => (j.city.toLowerCase().includes(place)))
  }
  res.json({sucess: true, jobs});
});

app.use('/api', api);
app.use('/auth', auth);
const port = 4002;
app.listen(port, () => {
  console.log(`listeng on port ${port}`);
})
