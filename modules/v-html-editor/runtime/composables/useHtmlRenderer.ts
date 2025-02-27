import { defu } from 'defu';
import { create as createHbInstance } from 'handlebars';
import { getHandlebarsVariables } from '../utils/handlebars';

export type VHtmlVariableGroup = Record<string | number | symbol, any>;
export type VHtmlTemplate = string;
export type VHtmlRendererConfig = {
  /**
   * Set of static variables that are available before-hand (while designing).
   * They will be filled during preview and design time and will be available
   * in the runtime.
   */
  staticVariables: any;

  /**
   * Set of known helpers that can be used in the template.
   */
  knownHelpers: Record<string, () => any>;

  /**
   * Flag to indicate if the service is running in development mode.
   */
  isDevMode: boolean;
};

export type VHtmlTemplateDelegate = HandlebarsTemplateDelegate<any>;

export function useHtmlRenderer(config: VHtmlRendererConfig) {
  const hb = createHbInstance();

  const knownHelpersRegistry: Record<string, boolean> = {};

  Object.keys(config.knownHelpers).forEach((key) => {
    if (typeof config.knownHelpers[key] !== 'function') {
      throw new Error(`Invalid helper function for ${key}`);
    }
    hb.registerHelper(key, config.knownHelpers[key]);
    knownHelpersRegistry[key] = true;
  });

  const staticVariables = config.staticVariables;

  const render = (template: string, runtimeVars: VHtmlVariableGroup) => {
    const mergedVars = defu(runtimeVars, staticVariables);
    const compiledTemplate = hb.compile(template, {
      data: true,
      compat: false,
      knownHelpersOnly: true,
      preventIndent: !config.isDevMode,
      knownHelpers: knownHelpersRegistry,
      noEscape: false,
    });

    return compiledTemplate(mergedVars);
  };

  const extractVariables = (template: string) => {
    return getHandlebarsVariables(template);
  };

  return { render, extractVariables };
}
