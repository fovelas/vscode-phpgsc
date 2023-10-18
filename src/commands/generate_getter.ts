import { Variable } from '../commands/types/variable';
import { Parser } from '../utils/parser';

export class GenerateGetter {

    // Execute command
    public static exec(str: string): string {
        const parser = new Parser();
        const variableArr: Array<Variable> = parser.parseVariables(str);
        return this.generate(variableArr);
    }

    // Generate getter
    private static generate(variableArr: Array<Variable>): string {
        const codeStr: Array<string> = [];

        variableArr.forEach((variable, idx) => {
            codeStr.push('public function ');
            codeStr.push(this.generateFunctionName(variable));

            if (variable.type !== undefined && variable.type !== '') {
                codeStr.push('(): ');
                codeStr.push(variable.type + ' ');
            } else {
                codeStr.push('() ');
            }

            codeStr.push('{');
            codeStr.push(this.generateReturn(variable));
            codeStr.push('}');

            codeStr.push('\r\n');
            codeStr.push('\r\n\t');
        });

        return codeStr.join('');
    }

    // Generate function name
    private static generateFunctionName(variable: Variable): string {
        const variableExploded: Array<String> = variable.name.split('_');

        let functionName: string = 'get';

        variableExploded.forEach((item) => {
            functionName += item.charAt(0).toUpperCase() + item.slice(1);
        });

        return functionName;
    }

    // Generate return
    private static generateReturn(variable: Variable): string {
        return `return $this->${variable.name};`;
    }
}