import fs from 'fs';

import { Git } from './Git.js';
import { Settings } from './Settings.js';
import path from 'path';

export const WorkTree = {
    loadNewWorktree(branch) {
        if (Git.doesBranchExist(branch, Settings.PROJECT_FULL_PATH)) {
            if (this.doesWorkTreeAlreadyExist(branch)) {
                return true;
            }
            else {
                return this.createNewWorkTree(branch);
            }
        }

        return false;
    },

    createNewWorkTree(branch) {
        const workTreeFolder = this.calculateFolderForWorkTree(branch, Settings.PROJECT_FOLDER);

        Git.createWorkTree(branch, path.join('..', workTreeFolder), Settings.PROJECT_FULL_PATH);

        return path.join(Settings.PROJECT_FULL_PATH, workTreeFolder);
    },

    doesWorkTreeAlreadyExist(branch) {
        const workTreeFolder = this.calculateFolderForWorkTree(branch, Settings.PROJECT_FOLDER);
        
        return this.doesFolderExist(Settings.PROJECT_PARENT_FOLDER, workTreeFolder);
    },

    calculateFolderForWorkTree(branch, projectFolderName) {
        const branchToHex = Buffer.from(branch, 'utf8').toString('hex');

        return projectFolderName + '-' + branchToHex;
    },

    doesFolderExist(folderPath, folderName) {
        return fs.existsSync(path.join(folderPath, folderName));
    }
}