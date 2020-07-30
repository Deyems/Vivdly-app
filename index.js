const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },
];

//GET ALL COURSES
app.get('/api/genres', (req,res) => {
    res.send(genres);
});

//GET A SINGLE COURSE
app.get('/api/genres/:id', (req,res) => {
    const movieType = genres.find(genre => genre.id === parseInt(req.params.id));
    // console.log(movieType);

    // const {error} = validateGenres(req.body);
    if(movieType === undefined) {
        // console.log(error);
        return res.status(404).send(`The genre with the ID ${req.params.id} doesn't exist`);
    }
    res.send(movieType);
});

//POST REQUEST
app.post('/api/genres/:id', (req,res) => {
    const found = genres.find(movie => movie.id === parseInt(req.params.id));
    
    const { error } = validateGenres(req.body);
    if(error){
      return res.status(404).send(error.details[0].message);
    }
    
    const newGenre = {
        id: genre.length+1,
        name: req.body.name,
    }
    
});

//PUT REQUEST - UPDATE
app.put('/api/genres/:id', (req,res) => {

});

//DELETE REQUEST
app.delete('/api/genres/:id', (req,res) => {
    
});


//VALIDATE ENTRIES BY HUMAN
const validateGenres = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(10).required()
    })
    return schema.validate(genre);
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}....`);
});