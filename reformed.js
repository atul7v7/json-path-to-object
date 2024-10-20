// const data = {
//     name: 'atul',
//     vehicle: [
//       { model: 'BMW 2012', price: 1000000 },
//       { model: 'Audi Q7', price: 9000000 },
//     ],
//     income: {
//       salary: { ctc: 20000, net: 12000 },
//       freelancing: { ctc: 120000, net: 102000 },
//     },
//   };
  
//   const jsonPath = {
//     name: '$.name',
//     vehiclePrice: '$.vehicle[*].price',
//     salaryIncome: '$.income.salary.ctc',
//   };
  
//   const convertJsonPathToObjectPath = (jsonPath) => {
//     let isArrayDetected = false;
//     const pathSegments = jsonPath.split('.').filter(segment => segment !== '$');
//     let objectPath = '';
  
//     for (const [index, segment] of pathSegments.entries()) {
//       if (segment.includes('[*]')) {
//         isArrayDetected = true;
//         objectPath += `.${processArrayPath(segment, index, pathSegments)}`;
//       } else if (!isArrayDetected) {
//         objectPath += objectPath ? `.${segment}` : segment;
//       }
//     }
  
//     return objectPath.startsWith('.') ? objectPath : `.${objectPath}`;
//   };
  
//   const processArrayPath = (currentSegment, currentIndex, pathSegments) => {
//     currentSegment = currentSegment.replace('[*]', '');
//     const remainingPath = pathSegments.slice(currentIndex + 1).join('.');
//     const mappedPath = remainingPath ? convertJsonPathToObjectPath(remainingPath) : '';
  
//     return mappedPath
//       ? `${currentSegment}.map(item => item${mappedPath})`
//       : `${currentSegment}.map(item => item)`;
//   };
  
//   const buildObjectPathMap = (data, jsonPathMap) => {
//     const result = {};
//     for (const key in jsonPathMap) {
//       const objectPath = convertJsonPathToObjectPath(jsonPathMap[key]);
//       result[key] = `data${objectPath}`;
//     }
//     return result;
//   };
  
//   const result = buildObjectPathMap(data, jsonPath);
//   console.log({ result });
  

const data = {
    name: 'atul',
    vehicle: [
      { model: 'BMW 2012', price: 1000000 },
      { model: 'Audi Q7', price: 9000000 },
    ],
    income: {
      salary: { ctc: 20000, net: 12000 },
      freelancing: { ctc: 120000, net: 102000 },
    },
  };
  
  const jsonPath = {
    name: '$.name',
    vehiclePrice: '$.vehicle[*].price',
    salaryIncome: '$.income.salary.ctc',
  };
  
  const convertJsonPathToObjectPath = (jsonPath) => {
    let isArrayDetected = false;
    const pathSegments = jsonPath.split('.').filter(segment => segment !== '$');
    let objectPath = 'data';
  
    for (const [index, segment] of pathSegments.entries()) {
      if (segment.includes('[*]')) {
        isArrayDetected = true;
        objectPath += `.${processArrayPath(segment, index, pathSegments)}`;
      } else if (!isArrayDetected) {
        objectPath += `.${segment}`;
      }
    }
  
    return objectPath;
  };
  
  const processArrayPath = (currentSegment, currentIndex, pathSegments) => {
    currentSegment = currentSegment.replace('[*]', '');
    const remainingPath = pathSegments.slice(currentIndex + 1).join('.');
    const mappedPath = remainingPath ? convertJsonPathToObjectPath(`$.${remainingPath}`).replace('data.', 'item.') : 'item';
  
    return `${currentSegment}.map(item => ${mappedPath})`;
  };
  
  const buildObjectPathMap = (data, jsonPathMap) => {
    const result = {};
    for (const key in jsonPathMap) {
      const objectPath = convertJsonPathToObjectPath(jsonPathMap[key]);
      result[key] = objectPath;
    }
    return result;
  };
  
  const result = buildObjectPathMap(data, jsonPath);
  console.log({ result });
  