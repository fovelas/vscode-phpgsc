import { Variable } from '../commands/types/variable';
import { Parser } from '../utils/parser';

export class GenerateConstructor {

    // Execute command
    public static exec(str: string): string {
        const parser = new Parser();
        const variableArr: Array<Variable> = parser.parseVariables(str);
        return this.generate(variableArr);
    }

    // Generate constructor
    private static generate(variableArr: Array<Variable>): string {
        const codeStr: Array<string> = [];

        codeStr.push('public function __construct');
        codeStr.push('(');

        variableArr.forEach((variable, idx) => {
            let parameterStr = this.generateParameter(variable);

            if (idx !== variableArr.length - 1) {
                parameterStr += ', ';
            }

            codeStr.push(parameterStr);
        });

        codeStr.push(')');

        codeStr.push('{');

        variableArr.forEach((variable, idx) => {
            const definationStr = this.generateDefination(variable);
            codeStr.push(definationStr);
        });

        codeStr.push('}\r\n\t');

        return codeStr.join('');
    }

    // Generate constructor paramater
    private static generateParameter(variable: Variable): string {
        return `${variable.type} $${variable.name}`;
    }

    // Generate variable defination
    private static generateDefination(variable: Variable): string {
        return `$this->${variable.name} = $${variable.name};`;
    }
}