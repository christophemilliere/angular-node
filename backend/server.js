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
app.use('/api', api);
const port = 4002;
app.listen(port, () => {
  console.log(`listeng on port ${port}`);
})
