const express = require("express")
// express
const app = express()
const port = 3000
app.use(express.json())

const tasks = [
    {id:1, task:'Learn HTML', completed:false, timestamp:'2024-06-20T12:00:00Z'},
    {id:2, task:'Learn JavaScript', completed:true, timestamp:'2024-06-20T12:00:00Z'},
    {id:3, task:'Learn CSS', completed:false, timestamp:'2024-06-20T12:00:00Z'}
]

app.get('/',(req,res)=>{
   
    res.json({tasks})
})
app.get('/tasks',(req,res)=>{
    
    res.json({tasks})
})
app.get('/about', (req, res) => {
  res.send('about');
});
app.post('/tasks',(req,res)=>{
    const {task, completed = false} = req.body
    if (typeof task !== 'string' || !task.trim()) {
        return res.status(400).json({error:'A task name is required'})
    }

    const newTask = {
        id: tasks.length ? Math.max(...tasks.map(item => item.id)) + 1 : 1,
        task: task.trim(),
        completed: Boolean(completed),
        timestamp: new Date().toISOString()
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.put('/tasks/:taskId',(req,res)=>{
    const {task, completed} = req.body
    const taskId = parseInt(req.params.taskId)
    const taskIndex = tasks.findIndex(item => item.id === taskId)
    if (taskIndex === -1) {
        return res.status(404).json({error:'Task not found'})
    }

  

    tasks[taskIndex] = {
        ...tasks[taskIndex],
       
        completed: Boolean(completed)
    }
    res.json(tasks[taskIndex])
})
app.delete('/tasks/:taskId',(req,res)=>{
    const taskId = parseInt(req.params.taskId)
    const taskIndex = tasks.findIndex(item => item.id === taskId)
    if (taskIndex === -1) {
        return res.status(404).json({error:'Task not found'})
    }
    tasks.splice(taskIndex, 1)
    res.json({message:'Task deleted successfully'})
})

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})

app.get('/', (req, res) => {
  return Promise.resolve().then(() => {
    throw new Error('BROKEN'); // Express will catch this and call next.
  });
}); 
/*app.get('/', (req, res) => {
  res.send('root');
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.get('/random.text', (req, res) => {
  res.send('random.text');
});*/