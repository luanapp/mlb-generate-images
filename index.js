const AWS = require('aws-sdk');
const { BLEND_SOURCE_OVER, read } = require('jimp');

const start = async () => {
  try {
    const awsS3Location = 'https://mlb-movile.s3-sa-east-1.amazonaws.com/bot/';
    const images = ['people1.png', 'people2.png', 'people3.png'];
    const baseImage = 'people-base.png';
    const baseJimp = await read(`${awsS3Location}${baseImage}`);

    const jimps = Promise.all(images.map(async image => await read(`${awsS3Location}${image}`)));

    (await jimps).forEach(async jp =>
      baseJimp.composite(jp, 0, 0, {
        mode: BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
      })
    );
    baseJimp.writeAsync('dist/person.jpg');
  } catch (error) {
    console.error('Error while composing files', error);
  }
};

start()
  .then(() => {
    console.log('File generated successfully');
  })
  .catch(console.error);
