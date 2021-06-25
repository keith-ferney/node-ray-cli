/* eslint-disable no-unused-vars */

import { classOf } from '@/lib/helpers';
import { Argv } from 'yargs';
import { Ray } from 'node-ray';

export abstract class Command {
    public command = '';

    public help = '';

    public static instance: Command;

    public client: any = null;
    public uuid: string | null = null;

    public argv: Argv | null = null;

    constructor() {
        Command.instance = this;
    }

    public name(): string {
        return <string>this.command.split(' ').shift();
    }

    public builder = (): Record<string, any> => {
        return {};
    };

    public handle(argv: Argv) {
        this.argv = argv;
    }

    public execute(argv) {
        if (!Command.instance.command.length) {
            throw new Error('Command string not defined!');
        }

        return Command.instance.handle(argv);
    }

    public displayUuid(instance: Ray) {
        if (this.argv === null) {
            return;
        }

        if (typeof this.argv['quiet'] === 'undefined') {
            console.log(instance.uuid);
        }
    }

    public static create(): Command {
        const thisClass = classOf(this);

        return new thisClass();
    }
}