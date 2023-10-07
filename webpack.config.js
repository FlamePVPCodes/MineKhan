const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlinePlugin = require("html-inline-script-webpack-plugin");
const path = require("path");
const fs = require("fs");

// Define an array to hold your Webpack plugins
const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    inject: "body",
  }),
];

// Set the default output path to the "dist" folder
let output = "./dist";

// Check for specific development environments
if (__dirname.includes("willard/server/dev")) {
  // If coding on your VPS, build to the beta page on willard.fun
  output = "../../public/minekhan/beta";
} else if (__dirname.includes("/home/willard/Desktop/MineKhan")) {
  // If coding on your desktop and have your VPS mounted, build to the beta page on willard.fun
  const vpsPath = "/home/willard/vps";
  if (fs.existsSync(vpsPath) && fs.readdirSync(vpsPath).includes("server")) {
    output = path.join(vpsPath, "server/public/minekhan/beta");
  }
}

// Create and export the Webpack configuration
module.exports = {
  mode: "none",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, output),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(txt|glsl)$|workers\//i,
        use: "raw-loader",
      },
    ],
  },
  plugins,
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
    // Uncomment the following line if you want to poll for changes
    // poll: 1000,
    ignored: '**/node_modules',
  },
};
