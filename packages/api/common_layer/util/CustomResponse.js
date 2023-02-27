const customResponse = {};
const statusCode = {
    SUCCESS :200,
    DUPLICATE:209,
    NOT_FOUND:401,
    CREATED:201,
    UNPROCESSABLE:400
}
customResponse.res_200 = function (data){
    return {
        statusCode:statusCode.SUCCESS,
        body:JSON.stringify({statusCode:statusCode.SUCCESS,...data})
    }
}

customResponse.res_201 = function (data){
    return {
        statusCode:statusCode.CREATED,
        body:JSON.stringify({statusCode:statusCode.CREATED,...data})
    }
}

customResponse.res_401 = function (data){
    return {
        statusCode:statusCode.NOT_FOUND,
        body:JSON.stringify({statusCode:statusCode.NOT_FOUND,...data}, null,
            2)
    }
}

customResponse.res_409 = function (data){
    return {
        statusCode:statusCode.DUPLICATE,
        body:JSON.stringify({statusCode:statusCode.DUPLICATE,...data}, null,
            2)
    }
}
customResponse.res_400 = function (data){
    return {
        statusCode:statusCode.UNPROCESSABLE,
        body:JSON.stringify({statusCode:statusCode.UNPROCESSABLE,...data}, null,
            2)
    }
}
module.exports = customResponse;