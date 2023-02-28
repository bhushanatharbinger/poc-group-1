const {handler} = require('../handlers/userDetail');
const {userId} = require('./data')
test('Status 200', async () => {
    const response = await handler({pathParameters:{param:userId}});
    expect(response.statusCode).toBe(200);
});

test('Status 401', async () => {
    const response = await handler({pathParameters:{param:99999999}});
    expect(response.statusCode).toBe(401);
    const _body = JSON.parse(response.body);
    expect(_body.message).toBe("Invalid User id!");
});

test('Status 400', async () => {
    const response = await handler();
    expect(response.statusCode).toBe(400);
    const _body = JSON.parse(response.body);
    expect(_body.message).toBe("Invalid request, User id is missing the request!");
});
