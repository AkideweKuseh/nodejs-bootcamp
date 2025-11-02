const fs = require('fs');
const express = require('express');
require('dotenv').config({ quite: true, override: true });

const app = express();

//Middleware
app.use(express.json());

// Load Tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/4-natours/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((t) => t.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFileSync(
    `${__dirname}/4-natours/dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  );
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

const updateTour = (req, res) => {
  const tour = tours.find((t) => t.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  // Update the tour
  Object.assign(tour, req.body);
  fs.writeFile(
    `${__dirname}/4-natours/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Could not update the tour',
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const tour = tours.find((t) => t.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  // Delete the tour
  tours.splice(tours.indexOf(tour), 1);
  fs.writeFile(
    `${__dirname}/4-natours/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Could not update the tour',
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    }
  );
};

app.get('/api/v1/tours', getAllTours);

app.get('/api/v1/tours/:id', getTour);

app.post('/api/v1/tours', createTour);

app.patch('/api/v1/tours/:id', updateTour);

app.delete('/api/v1/tours/:id', deleteTour);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
