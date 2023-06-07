import type { StorybookConfig } from "@storybook/react-webpack5";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          // Require your preprocessor
          implementation: require("sass"),
        },
        scssBuildRule: {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            // snipped for brevity
          ]
        },
      },
    },
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
