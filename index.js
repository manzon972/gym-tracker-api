const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/get-routine', (req, res) => {
    const jsonData = require('./data.json');
    res.status(200).json({success: true, routine: jsonData});
});

app.put('/update-exercise-set', (req, res) => {
    try {
        const {dayId, exerciseId, setIndex, setDoneState} = req.body;
        const jsonData = require('./data.json'); // Assuming your JSON file is named data.json
        const day = jsonData.days.find(d => d.id === dayId)
        const exercise = day.exercises.find(e => e.id === exerciseId);
        const set = exercise.sets[setIndex]
        set.done = setDoneState;
        // Write the updated JSON back to the file
        fs.writeFileSync('./data.json', JSON.stringify(jsonData, null, 2));

        res.status(200).json({success: true, message: 'JSON updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});