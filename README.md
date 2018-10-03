# Color-blocks

This app pixellates photos and then reorganises the resulting pixel blocks by brightness and lightness,
as [defined this way](https://en.wikipedia.org/wiki/HSL_and_HSV).

Using Html canvas to sample, manipulate and create images, plus this helpful npm module: [colorsys](https://www.npmjs.com/package/colorsys)

This came about from a conversation with my photographer friend who is interested in breaking down photographs from Instagram.

# Run the app

Dev mode: `npm run start` starts webpack dev server and runs webpack in watch mode.

To get the express routing to work, start the node server in a new tab: `node server.js`

To build: `npm run build`
