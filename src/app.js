import proxy from 'express-http-proxy';
import express from 'express';
import path from 'path';
import { Settings } from './Controllers/Settings.js';
import { WorkTree } from './Controllers/WorkTree.js';

const app = express();

app.get('*', (req, res, next) => {
    const branch = req.subdomains[0];

    if (branch) {
        const workTreeFullPath = WorkTree.loadNewWorktree(branch);
        
        if (workTreeFullPath) {
            res.locals.worktree = workTreeFullPath;
            next();
        }
        else {
            req.send('Worktree already exist or the requested branch does not exist');
        }
    }

    res.locals.worktree = Settings.PROJECT_FULL_PATH;
    next();
});

app.use('*', proxy(process.env.PROXY_DOMAIN, {
    proxyReqPathResolver: function (req) {
        return path.join(req.worktree, req.originalUrl);
    }
}));

export default app;