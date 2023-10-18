import { Variable } from '../commands/types/variable';
import { Parser } from '../utils/parser';

export class GenerateSetter {

    // Execute command
    public static exec(str: string): string {
        const parser = new Parser();
        const variableArr: Array<Variable> = parser.parseVariables(str);
        return this.generate(variableArr);
    }

    // Generate setter
    private static generate(variableArr: Array<Variable>): string {
        const codeStr: Array<string> = [];

        variableArr.forEach((variable, idx) => {
            codeStr.push('public function ');
            codeStr.push(this.generateFunctionName(variable));
            codeStr.push('(');
            codeStr.push(this.generateParameter(variable));
            codeStr.push(')');

            codeStr.push(': void ');

            codeStr.push('{');
            codeStr.push(this.generateDefination(variable));
            codeStr.push('}');

            codeStr.push('\r\n');
            codeStr.push('\r\n\t');
        });

        return codeStr.join('');
    }

    // Generate function name
    private static generateFunctionName(variable: Variable): string {
        const variableExploded: Array<String> = variable.name.split('_');

        let functionName: string = 'set';

        variableExploded.forEach((item) => {
            functionName += item.charAt(0).toUpperCase() + item.slice(1);
        });

        return functionName;
    }

    // Generate setter paramater
    private static generateParameter(variable: Variable): string {
        return `${variable.type} $${variable.name}`;
    }

    // Generate variable defination
    private static generateDefination(variable: Variable): string {
        return `$this->${variable.name} = $${variable.name};`;
    }
}