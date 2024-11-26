// // metro.config.js
// module.exports = {
//     transformer: {
//         // Additional transformers can go here if needed
//     },
//     resolver: {
//         newArchitecture: false, // Disables the new architecture (bridgeless mode)
//     },
// };
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;


