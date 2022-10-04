import { Command } from './Command.js';

export const Git = {
    doesBranchExist(branch) {
        try {
            Command.run(['git', 'show-ref', '--verify', 'refs/heads/' + branch]);
            
            return true;
        }
        catch(e) {
            return false;
        }
    },

    checkoutBranch(branch) {
        return Command.run(['git', 'checkout', branch])
    },

    pull() {
        return Command.run(['git', 'pull']);
    },

    createWorkTree(branch, path) {
        return Command.run(['git', 'worktree', 'add', '--track', branch, path]);
    },
}