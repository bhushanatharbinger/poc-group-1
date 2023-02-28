const { handler } = require('../handlers/addUser');
const {newUserBody} = require('./data')

const body = JSON.stringify(newUserBody)

test('Status 201', async () => {
  const response = await handler({ body });
  expect(response.statusCode).toBe(201);
  const _body = JSON.parse(response.body);
  expect(typeof _body?.user?.id).toBe("number")
});
test('Status 400_no_body', async () => {
  const response = await handler();
  expect(response.statusCode).toBe(400);
  const _body = JSON.parse(response.body);
  expect(_body.message).toBe("Invalid Data!");
});