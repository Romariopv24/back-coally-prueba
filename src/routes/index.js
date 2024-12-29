import userRouters from '../modules/users/routes/auth.routes.js';
import taskRouters from '../modules/tasks/routes/task.routes.js';

const routes = [
    userRouters,
    taskRouters
]

export default routes