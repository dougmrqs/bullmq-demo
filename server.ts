import Fastify from 'fastify';

const fastify = Fastify();

fastify.get('/', async (request, reply) => {
  console.log('Request received');
  return { message: 'hello world' };
});

fastify.listen({ port: 3000 }, (_, address) => {
  console.log(`Server is listening on ${address}`);
});
