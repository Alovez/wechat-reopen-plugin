
import { BuildPlugin } from '../@types';

export const load: BuildPlugin.load = function() {
    console.debug('wechat-reopen-plugin load');
};

export const unload: BuildPlugin.load = function() {
    console.debug('wechat-reopen-plugin unload');
};

export const configs: BuildPlugin.Configs = {
    'wechatgame': {
        hooks: './hooks',
        options: {
            isReopenProject: {
                label: 'i18n:wechat-reopen-plugin.options.isReopenProject',
                description: 'i18n:wechat-reopen-plugin.options.isReopenProject',
                default: true,
                render: {
                    ui: 'ui-checkbox',
                },
            },
            weDevPath: {
                label: 'i18n:wechat-reopen-plugin.options.weDevPath',
                description: 'i18n:wechat-reopen-plugin.options.weDevPath',
                render: {
                    ui: 'ui-file',
                },
            }
        },
    },
};

export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';
