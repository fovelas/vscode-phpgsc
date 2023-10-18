import { Variable } from '../commands/types/variable';

export class Parser {

    // Parsing PHP variables on vscode active document (page).
    public parseVariables(str: string): Array<Variable> {
        const regex = /(public|private|protected)\s+(\w+\s+)?\$(\w+);/g; // magical regex
        const matches = str.matchAll(regex);

        const variableArr: Array<Variable> = [];

        for (const match of matches) {
            const variable: Variable = {
                type: match[2] === undefined ? '' : match[2].trim(),
                name: match[3].trim(),
            };

            variableArr.push(variable);
        }

        return variableArr;
    }
}