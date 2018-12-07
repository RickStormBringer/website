# Wormhole

This is the repository for [wormhole.cash](http://wormhole.cash).


# Build & Run
 Install [node.js](https://nodejs.org) if you don't have them already.

 `cd` to the repository directory and run the following command:

```
$ cd website
$ npm install
```
Start the server:

```
$ npm start
```
Then, load [http://localhost:3000](http://localhost:3000) on your browser.



# Adding Translations
To add translations to the project, use `locales/en.json` as a template and create a new json file for the language of your choice using its [ISO 639-1 code](http://www.loc.gov/standards/iso639-2/php/code_list.php) as its name.Then translate all the content inside of the file and send us a pull request.

# About Wormhole
Wormhole is a fast, portable Omni Layer implementation that is based off the Bitcoin ABC codebase (currently 0.17.2). This implementation requires no external dependencies extraneous to Bitcoin ABC, and is native to the Bitcoin Cash network just like other Bitcoin Cash nodes. It currently supports a wallet mode and is seamlessly available on three platforms: Windows, Linux and Mac OS. Wormhole Cash Layer extensions are exposed via the JSON-RPC interface. Development has been consolidated on the Wormhole product, and it is the reference client for the Wormhole Cash Layer.

# License22
[MIT](./LICENSE)




