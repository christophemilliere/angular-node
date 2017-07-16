const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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
const port = 4002;
app.listen(port, () => {
  console.log(`listeng on port ${port}`);
})
