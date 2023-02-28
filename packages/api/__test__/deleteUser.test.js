const {handler} = require('../handlers/deleteUser');
const {userId} = require('./data')
test('Status 201', async () => {
    const response = await handler({pathParameters:{param:userId}});
    expect(response.statusCode).toBe(201);
});

test('Status 401', async () => {
    const response = await handler({pathParameters:{param:99999999}});
    expect(response.statusCode).toBe(401);
    const _body = JSON.parse(response.body);
    expect(_body.message).toBe("Invalid User id!");
});
