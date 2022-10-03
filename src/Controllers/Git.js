import { Command } from './Command.js';

export const Git = {
    doesBranchExist(branch) {
        try{
            Command.run(['git', 'show-ref', '--verify', 'refs/heads/' + branch]);
            
            return true;
        }
        catch(e) {
            return false;
        }
    },

    isBranchFetched() {

    },

    installBranch() {

    },

    pullBranch() {

    },
}