exports.handler = async (event, context) => {

    const key = process.env.REACT_APP_API_KEY;
    
    return {
        statusCode: 200,
        body: JSON.stringify({msg: 'Hello World', key: key})
        }
}        