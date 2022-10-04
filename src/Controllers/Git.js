import { Command } from './Command.js';

export const Git = {
    doesBranchExist(branch, gitFolder) {
        try {
            Command.run(['git', 'show-ref', '--verify', 'refs/heads/' + branch], gitFolder);
            
            return true;
        }
        catch(e) {
            return false;
        }
    },

    checkoutBranch(branch, gitFolder) {
        return Command.run(['git', 'checkout', branch], gitFolder)
    },

    pull(gitFolder) {
        return Command.run(['git', 'pull'], gitFolder);
    },

    createWorkTree(branch, path, gitFolder) {
        return Command.run(['git', 'worktree', 'add', '-f', path, branch], gitFolder);
    },
}