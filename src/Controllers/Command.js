import { execSync } from 'child_process';
import { quote } from 'shell-quote';

export const Command = {
    run(command, workingDirectory) {
        command = quote(command);

        return execSync(command, {
            cwd: workingDirectory
        }).toString();
    },
}