/**
 * Patched Vite resolver for eslint-plugin-import.
 *
 * Based on `eslint-import-resolver-vite`:
 * https://github.com/pzmosquito/eslint-import-resolver-vite
 *
 * The upstream resolver replaces every matching path segment when applying
 * aliases. This breaks imports like `docs/components/...` when both `docs`
 * and `components` are aliases, producing invalid paths.
 *
 * This version fixes the behavior so aliases only match the **leading prefix**
 * of the import specifier, which matches how Vite/Rollup aliasing works.
 *
 * Additional improvements
 * -----------------------
 * - Supports both object and array alias forms used by Vite
 * - Supports RegExp `find` entries in array aliases
 * - Avoids rewriting absolute paths incorrectly
 * - Cleans up root/publicDir resolution logic
 *
 */

import path from 'node:path';
import resolve from 'resolve';
import createDebug from 'debug';
import { existsSync } from 'node:fs';

const namespace = 'eslint-plugin-import:resolver:vite';
const log = createDebug(namespace);

function loadViteConfig(config) {
  if (!config) {
    throw new Error("'config' option must be a path to a vite config file.");
  }

  const file = path.resolve(process.cwd(), config);

  if (!existsSync(file)) {
    return;
  }

  const mod = require(file);
  return mod.default || mod;
}

function tryResolve(source, resolveOptions, label) {
  log('resolving:\t', `(${label})`, source);
  const resolvedPath = resolve.sync(source, resolveOptions);
  log('resolved:\t', resolvedPath);
  return { found: true, path: resolvedPath };
}

function normalizeAliasEntries(alias) {
  if (!alias) {
    return [];
  }

  if (Array.isArray(alias)) {
    return alias.filter(Boolean).map((entry) => ({
      find: entry.find,
      replacement: entry.replacement,
    }));
  }

  if (typeof alias === 'object') {
    return Object.entries(alias).map(([find, replacement]) => ({
      find,
      replacement,
    }));
  }

  throw new Error(
    'The alias must be either an object, or an array of objects.',
  );
}

function applyStringAlias(source, find, replacement) {
  if (source === find) {
    return replacement;
  }

  if (source.startsWith(find + '/')) {
    return replacement + source.slice(find.length);
  }

  return null;
}

function processAlias(alias, source) {
  const entries = normalizeAliasEntries(alias);

  for (const { find, replacement } of entries) {
    if (!find || !replacement) {
      continue;
    }

    if (find instanceof RegExp) {
      if (find.test(source)) {
        return source.replace(find, replacement);
      }
      continue;
    }

    if (typeof find === 'string') {
      const resolved = applyStringAlias(source, find, replacement);
      if (resolved) {
        return resolved;
      }
    }
  }

  return source;
}

function resolveRoot(root) {
  if (!root) {
    return process.cwd();
  }

  if (path.isAbsolute(root)) {
    return root;
  }

  return path.resolve(process.cwd(), root);
}

export const interfaceVersion = 2;

function resolveImport(source, file, config) {
  log('\nin file:\t', file);

  if (resolve.isCore(source)) {
    log('resolved:\t', source);
    return { found: true, path: null };
  }

  const viteConfig = loadViteConfig(config?.config);
  if (!viteConfig) {
    return { found: false };
  }

  const defaultExtensions = [
    '.mjs',
    '.js',
    '.ts',
    '.d.ts',
    '.jsx',
    '.tsx',
    '.json',
  ];
  const viteResolve = viteConfig.resolve || {};
  const extensions = viteResolve.extensions || defaultExtensions;
  const resolveOptions = {
    basedir: path.dirname(file),
    extensions,
  };

  try {
    return tryResolve(source, resolveOptions, 'as is');
  } catch {}

  const parsedSource = processAlias(viteResolve.alias, source);
  if (parsedSource !== source) {
    try {
      return tryResolve(parsedSource, resolveOptions, 'with alias');
    } catch {}
  }

  if (path.isAbsolute(parsedSource)) {
    try {
      return tryResolve(parsedSource, resolveOptions, 'absolute path');
    } catch {}
  }

  if (viteConfig.publicDir !== false) {
    const rootDir = resolveRoot(viteConfig.root);
    const publicDir = viteConfig.publicDir || 'public';
    const publicBase = path.isAbsolute(publicDir)
      ? publicDir
      : path.resolve(rootDir, publicDir);

    const publicSource = path.resolve(publicBase, parsedSource);

    try {
      return tryResolve(publicSource, resolveOptions, 'in public directory');
    } catch {}
  }

  log('ERROR:\t', 'Unable to resolve');
  return { found: false };
}

export function createViteImportResolver(config) {
  return {
    interfaceVersion: 3,
    name: 'eslint-import-resolver-vite',
    resolve: (source, file) => resolveImport(source, file, config),
  };
}

export { resolveImport as resolve };
