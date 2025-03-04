import { parseWithoutProcessing } from 'handlebars';
import type { VHtmlTemplate } from '../composables/useHtmlRenderer';

const getVariablesFromStatementsRecursive = (statements: hbs.AST.Statement[]): string[] => {
  return statements.reduce<string[]>((acc, statement) => {
    const { type } = statement;

    if ('BlockStatement' === type) {
      const { inverse, program } = statement as hbs.AST.BlockStatement;

      if (program.body) {
        acc = acc.concat(getVariablesFromStatementsRecursive(program.body));
      }

      if (inverse.body) {
        acc = acc.concat(getVariablesFromStatementsRecursive(inverse.body));
      }
    } else if ('MustacheStatement' === type) {
      const { path } = statement as hbs.AST.MustacheStatement;

      if (path.type === 'PathExpression') {
        const pathExpression = path as hbs.AST.PathExpression;
        acc.push(pathExpression.original);
      }
    }
    return acc;
  }, []);
};

export const getHandlebarsVariables = (input: VHtmlTemplate) => {
  const ast = parseWithoutProcessing(input);
  return getVariablesFromStatementsRecursive(ast.body);
};
