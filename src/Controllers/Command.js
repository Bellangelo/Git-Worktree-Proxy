import { execSync } from 'child_process';
import { quote } from 'shell-quote';

export const Command = {
    run(command) {
        command = quote(command);

        return execSync(command).toString();
    },
}