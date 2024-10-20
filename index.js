const data = {
    name: 'atul', 
    vehicle: [
        {
            model: 'BMW 2012',
            price: 1000000
        },
        {
            model: 'Audi Q7',
            price: 9000000
        },
    ],
    income: {
        salary: {
            ctc: 20000,
            net: 12000
        },
        freelancing: {
            ctc: 120000,
            net: 102000
        }
    }
}

const jsonPath = {
    name : '$.name',
    vehiclePrice: '$.vehicle[*].price',
    salaryIncome: '$.salary.ctc'
}


const objectifyJsonPath = (jsonPath) => {
    // there are two scenario 
    // array is encountered 
    // object is encountered 

    let isArrayEncounter = false

    const paths = jsonPath.split('.') // ['$', 'vehicle[*]']

    if(paths.includes('$')){
        paths.shift()
    }


    let finalObject = ``

    for (let [index, path] of paths.entries()){
        // check it is object 

        if(path.includes('[*]')){
            isArrayEncounter = true
            const arrayed = handleArray(path, index, paths)
           
            finalObject = finalObject + '.'+arrayed
            // matter of array 
        }

        if(!isArrayEncounter)
            {
                // handle normal object 
                if(finalObject === ''){
                    finalObject = path
                    
                }else{
                    finalObject = `${finalObject}.${path}`
                }
                
            }
        
    }

    if(!finalObject.includes('.')){
        finalObject = '.'+finalObject
    }

    return finalObject

}

// current index, complete path 
const handleArray = (currentKey,index,  paths) => {
    currentKey = currentKey.replace('[*]', '')
    let remainingPath = ''
    for(let i = index+1; i< paths.length; i++){
        if(i === index + 1){
            remainingPath = paths[i]
        }else{

            remainingPath = remainingPath + '.' + paths[i]
        }
    }
    const innerValue =  objectifyJsonPath(remainingPath)
    if(innerValue === ''){
        return `${currentKey}.map( (item) =>  item )`
    }else{
return `${currentKey}.map( (item) => { return item.${innerValue} } )`
    }
    
}

const constructObjectifyValue = (data, jsonPathifyObject) => {
    const result = {}
    for(const key in jsonPathifyObject){
        const objectifyPath = objectifyJsonPath(jsonPathifyObject[key])
        result[key] = `data${objectifyPath}`
    }
    return result
}

const jsonPathss = '$.data[*].atul.singh.hatela.number[*]'
const result = constructObjectifyValue(data, jsonPath)
console.log({result})

