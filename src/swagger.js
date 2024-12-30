import swaggerAutoGen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './src/routes/index.js',
    './src/modules/users/routes/auth.routes.js',
    './src/modules/tasks/routes/task.routes.js'
];

const doc = {
    info: {
        version: "1.0.0",
        title: "Coally Crud Swagger",
        description: "API de Express para el crud de Coally",
    },
    host: "localhost:4321",
    basePath: "/api/v1",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        { name: "Auth", description: "Endpoints creados para la Autenticacion del usuario" },
        { name: "Tasks", description: "Endpoints creados para las Tasks del usuario " }
    ],
    securityDefinitions: {
        JWT: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: ""
        }
    }
};

swaggerAutoGen(outputFile, endpointsFiles, doc).then(() => {
    import('./server.js'); 
});