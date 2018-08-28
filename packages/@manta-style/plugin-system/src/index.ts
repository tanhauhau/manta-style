import findPlugins from './discovery';

export type Plugin = { name: string; mock: Function };

type Plugins = {
  [name: string]: Array<Plugin>;
};

class PluginSystem {
  static async discover(filePath: string) {
    return new PluginSystem(await findPlugins(filePath));
  }

  mockPlugin: Plugins;
  constructor(plugins: { name: string; module: string }[]) {
    this.mockPlugin = {};
    for (const plugin of plugins) {
      if (plugin.name.match(/@manta-style\/plugin-mock-/)) {
        const mockPlugin = require(plugin.module);
        const { name, mock } = mockPlugin;
        for (const mockType in mock) {
          (this.mockPlugin[mockType] = this.mockPlugin[mockType] || []).push({
            name,
            mock: mock[mockType],
          });
        }
      }
    }
  }

  getMockValueFromPlugin(type: string, node: any, annotation: any) {
    const plugins = this.mockPlugin[type];
    if (plugins) {
      for (const plugin of plugins) {
        try {
          const value = plugin.mock(node, annotation);
          if (value !== null) {
            return value;
          }
        } catch (e) {
          console.error(`@manta-style Error from plugin: ${plugin.name}`);
          console.error(e);
        }
      }
    }
    return null;
  }
}

export default PluginSystem;
