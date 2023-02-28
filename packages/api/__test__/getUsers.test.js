const {handler} = require('../handlers/getUsers');
	
test('Status 200', async () => {
    const response = await handler();
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("string");
    const _body = JSON.parse(response.body);
    expect(Array.isArray(_body.users)).toBe(true);
});