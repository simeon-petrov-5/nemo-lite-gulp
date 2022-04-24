const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const pathFresh = 'src/assets/imgs/fresh'
const pathGallery = 'src/assets/imgs/gallery'


const generateMinImages = ({ destinationPath, w = 320, q = 80 }) => {
    const directoryPath = path.join(__dirname, '..', destinationPath);
    fs.readdir(directoryPath, (err, files) => {
        if (err) return console.log('Unable to scan directory: ' + err);

        files.forEach((file) => {
            sharp(`${destinationPath}/${file}`)
                .resize({ width: w })
                .jpeg({ mozjpeg: true, quality: q, })
                .toFile(destinationPath + '-min' + '/' + file)
        });
    });
}

generateMinImages({ destinationPath: pathFresh });
generateMinImages({ destinationPath: pathGallery, w: 600, q: 90 });
