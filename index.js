(async () => {
    const fs = require('fs/promises');
    
    const response = await fetch('https://intranet.caib.es/opendatacataleg/datastore/dump/8757335e-8f8f-4f78-b07e-cd9708c81c48?format=json');
    const data = await response.json();

    const fields = data.fields.map(field => field.id)

    const dataProcessed = data.records.map( record => {

        const dataElement = {}

        for(let i = 0; i < record.length; i++){
            dataElement[fields[i]] = record[i]
        }

        return dataElement
    })


    dataElement = dataProcessed.reduce((acc, item) => {
        const municipi = item['Municipi']
        const description = item['Memoria descriptiva']

        if( !acc[municipi]){
            acc[municipi] = 0
        }

        if(description && description.toLowerCase().includes('golf')){
            acc[municipi] = acc[municipi] + 1
        }

        return acc
    })

    const json = JSON.stringify(dataElement, null, 2);
    await fs.writeFile('golf.json', json, 'utf8');
})()