const {parse} = require('csv-parse');
const fs = require('fs');

const results = [];

const validPlanets = [];

function isHabitable(validPlanets)
{
    return (validPlanets['koi_disposition'] === "CONFIRMED" 
    && validPlanets['koi_insol']>0.36 && validPlanets['koi_insol']< 1.11 
    && validPlanets['koi_prad']<1.6);
    
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', (data) => {
    if(isHabitable(data))
    {
    validPlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(`${validPlanets.length} planets were found habitable!`);
    console.log(validPlanets.map((validPlanets)=>{
        
        return validPlanets['kepler_name']+validPlanets['kepid'];

    }))
    console.log('done');
  });













// const parse = require('csv-parse');
// const fs = require('fs');
// const a = [];
// fs.createReadStream('kepler_data.csv')
// .pipe(parse({
//     comment: "#",
//     coloumns: true,
// }
// ))
// .on('data', (data)=>{
//     a.push(data);
    

// }).on('end', ()=>{
//     console.log('a');
//     console.log("Reached the end of data");
// })
// .on('error', (err)=>{
//     console.log("ERROR Wrong file found");
// })


