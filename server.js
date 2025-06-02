const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;

// Enable CORS for your frontend origin
server.use(cors({
  origin: 'http://localhost:5173',
}));

// ✅ Mock /auth/me route with role included
server.get('/auth/me', (req, res) => {
  res.json({
    id: 1,
    username: 'mockUser',
    email: 'mockuser@example.com',
    role: 'admin', // Change to 'user' or 'admin' as needed
  });
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
