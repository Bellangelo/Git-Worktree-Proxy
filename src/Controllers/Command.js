import { execSync } from 'child_process';

export const Command = {
    run(command) {
        return execSync(command).toString();
    },
}