const Axios = require('axios')
const Fs = require('fs')
const Path = require('path')
const templateJS = require('./template')
const template = require('./template')
var Airtable = require('airtable');
const { env } = require('process')
var base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(env.AIRTABLE_BASE_ID);

const URLAPI = "https://api.sheety.co/d3f89089e9af5459568c5c1cd81c9357/appMarketplace/sheet1"


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

async function apiCall() {
    const { data: { sheet1 } } = await Axios.get(URLAPI)
    return sheet1
}


async function createpages() {
    const pagesInfo = await apiCall()
    const ToolData = await getToolsId()

    let AllTools = []

    for (let i = 0; i < pagesInfo.length; i++) {
        const page = pagesInfo[i];
        // console.log("page", page)
        page.name
        if (page.oneLiner) {

            // STEP 1
            // Download image
            // let imageName = getImageName(page)
            // await downloadImage(page.oneLiner, imageName)
            
            let airtableObject = {
                "id": ToolData[page.name],
                "fields": {
                    "Tool": page.name,
                    "Logo": [
                        {
                            "url": page.oneLiner
                        }
                    ],
                }
            }
            // STEP 2
            // Creating airtable objects to be sent later
            AllTools.push(airtableObject)
        }
    }

    // STEP 3
    // BATCH OF 10S
    // console.log("AllTools", AllTools)
    // return 
    var size = 10; var toolsBatch = [];
    for (var i=0; i<AllTools.length; i+=size) {
        toolsBatch.push(AllTools.slice(i,i+size));
    }
    for (let index = 0; index < toolsBatch.length; index++) {
        const currentBatch = toolsBatch[index];
        console.log(currentBatch)
        // break
        base('Marketplace (Source of truth)').update(currentBatch, 
            function(err, records) {
                if (err) {
                  console.error(err);
                  return;
                }
                records.forEach(function(record) {
                  console.log("🍓done", record.get('Tool'));
                });
              })
        // break
        sleep(500);
    }

}


function getImageName(page) {
    return page.oneLiner.split('/').slice(-1)[0]
}



async function downloadImage(url, name) {
    console.log("url,name", url, name)
    if (!Fs.existsSync('./images')) {
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


createpages()
// getToolsId()

async function getToolsId() {
    const ToolData = {};
    const records = await base('Marketplace (Source of truth)').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 156,
        view: "Grid view"
    }).all()
    records.map((record) => { ToolData[record.get('Tool')] = record.getId(); })
    console.log("ToolData", ToolData)
    return ToolData
}