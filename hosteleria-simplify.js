(async () => {
    const fs = require('fs/promises');
    
    const response = await fetch('https://intranet.caib.es/opendatacataleg/datastore/dump/8757335e-8f8f-4f78-b07e-cd9708c81c48?format=json');
    const data = await response.json();

    const dataProcessed = data.fields.map(field => field.id)

    dataProcessed = data.records.map(async record => {

        const dataElement = {}

        for(let i = 0; i < record.length; i++){
            dataElement[fields[i]] = record[i]
        }
    })
    
    dataElement = dataProcessed.reduce((acc, item) => {
        const municipi = item['Municipi']
        const grup = item['Grup']

        acc[municipi] = acc[municipi] || {}
        acc[municipi][grup] = acc[municipi][grup] + 1 || 1

        return acc
    })

    const json = JSON.stringify(dataElement, null, 2);
    await fs.writeFile('hosteleria-simplify.json', json, 'utf8');
})()