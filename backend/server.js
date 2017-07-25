const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fakeUser = {email:"test@free.fr", password: "aze"}
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-type');
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

    if(email === fakeUser.email && pwd === fakeUser.password){
      delete req.body.password
      // res.json({success: true, data: req.body});
      const token = jwt.sign({iss: 'http://localhost:4002', role: 'admin', email: req.body.email}, secret);
      res.json({success: true, token});
    }else{
      res.json({success: false, message: "donnée manquantes"});
    }
  }
});

api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});
api.post('/jobs', (req, res) => {
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
