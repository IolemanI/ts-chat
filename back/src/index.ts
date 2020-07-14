import './LoadEnv'; // Must be the first import
import app from '@server';
import { createServer, Server } from 'http';
import logger from '@shared/Logger';
import Chat from '@chat';

// Start the server
const port = Number(process.env.PORT || 5000);

const server = createServer(app);
server.listen(port, () => {
    logger.info('Express server started on port: ' + port);

    new Chat(server);
});
