const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	//建置的模式
	mode: "development", //預設production(上線模式)
	//入口
	entry: "./src/index.js",
	//輸出，path.resolve是把相對路徑轉成絕對路徑，__dirname表示現在檔案的工作路徑，後面接想讓輸出的檔案放到哪個資料夾
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public"),
	},
	devServer: {
		//實際執行檔的根目錄
		static: {
			directory: path.join(__dirname, "./public"),
		},
		//make /recipe or /signin page can reload without happening 404 not Found
		historyApiFallback: true,
	},
	//Fix DevTools failed to load SourceMap
	devtool: "eval-source-map",

	//模組載入規則
	module: {
		rules: [
			//CSS 樣式表檔案名稱符合載入規則(test)，則使用style-loader/css-loader載入器(use)
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/, //排除node
				loader: "babel-loader", //只有一個loader，所以不用use
			},
			{
				test: /\.(png|jpg|gif|svg|ico)$/i,
				type: "asset/resource",
			},
		],
	},
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		template: "./public/index.html",
	// 		filename: "./index.html",
	// 	}),
	// ],
};
