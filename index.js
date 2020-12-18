const Axios = require('axios')
const Fs = require('fs')
const Path = require('path')
const templateJS = require('./template')
const template = require('./template')

const URLAPI = "https://v2-api.sheety.co/d3f89089e9af5459568c5c1cd81c9357/landing/automatisation"



async function apiCall() {
    const { data: { automatisation } } = await Axios.get(URLAPI)
    return automatisation
}


async function createpages() {
    const pagesInfo = await apiCall()
    for (let i = 0; i < pagesInfo.length; i++) {
        console.log(i)
        const page = pagesInfo[i];
        console.log("page", page)
        if (page.image) {

            // STEP 1
            // Download image

            let imageName = getImageName(page)
            // await downloadImage(page.image, imageName)

            // STEP 2
            // get template and replace with variables
            let template = interpolateTemplate(imageName, page);
            // STEP 3
            // Write js File
            writePage(page.lien, template)
        }
    }
}

function interpolateTemplate(imageName, page) {
    let newPage = template
    newPage = newPage.replace(/Titre/, page.titre)
    newPage = newPage.replace("Titre2", page.titre)
    newPage = newPage.replace("Description", page.description)
    newPage = newPage.replace("Call To Action", page.callToAction)
    newPage = newPage.replace("Link CTA", page.linkCta)
    let liFeatures = page.features.split(',').map((feature, index) => (`<li key={'feature--key${index}'}><Icon icon={checkmarkCircled} /> ${feature}</li>`)).join('\n')
    newPage = newPage.replace("Features", liFeatures)
    newPage = newPage.replace("altImage", imageName)
    newPage = newPage.replace("path", imageName)
    return newPage
}

function writePage(name, template) {
    if (!Fs.existsSync('./pages')){
        Fs.mkdirSync('./pages');
    }
    Fs.writeFile(`pages/${name}.js`, template, function (err) {
        if (err) return console.log(err);
    });
}

function getImageName(page) {
    let imageName = page.lien
    if (page.image || page.image.includes('.png')) {
        imageName = imageName.concat('.png')
    } else if (page.image.includes('.jpg')) {
        imageName = imageName.concat('.jpg')
    } else if (page.image.includes('.jpeg')) {
        imageName = imageName.concat('.jpeg')
    } else {
        imageName = imageName.concat('.jpg')
    }
    return imageName
}



async function downloadImage(url, name) {
    if (!Fs.existsSync('./images')){
        Fs.mkdirSync('./images');
    }
    const path = Path.resolve(__dirname, 'images', name)
    const writer = Fs.createWriteStream(path)

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

//   downloadImage('https://unsplash.com/photos/AaEQmoufHLk/download?force=true', 'code.jpg') 
createpages()
// console.log(templateJS)

// console.log(template.replace(/Titre/, 'COUCOUUU'))