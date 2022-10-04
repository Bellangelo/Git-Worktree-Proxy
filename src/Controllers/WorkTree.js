import crypto from 'crypto';
import fs from 'fs';

import { Git } from './Git.js';

const md5 = crypto.md5;

export const WorkTree = {
    loadNewWorktree(branch) {
        if (Git.doesBranchExist(branch)) {
            if (!this.doesWorkTreeAlreadyExist(branhc, '')) {
                this.createNewWorkTree(branch, '', '');
            }
        }
    },

    createNewWorkTree(branch, projectParentFolder, projectFolderName) {
        const workTreeFolder = this.calculateFolderForWorkTree(branch, projectFolderName);

        fs.mkdirSync(workTreeFolder);
        Git.createWorkTree(branch);
    },

    calculateFolderForWorkTree(branch, projectFolderName) {
        const branchToHex = Buffer.from(branch, 'utf8').toString('hex');

        return projectFolderName + '-' + branchToHex;
    },

    doesWorkTreeAlreadyExist(branch, projectFolderName) {
        const workTreeFolder = this.calculateFolderForWorkTree(branch, projectFolderName);

        return fs.existsSync(workTreeFolder);
    },
}