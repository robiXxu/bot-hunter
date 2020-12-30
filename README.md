A bot made to automate deleting messages from bots and banning them based on a blacklist.

pm2 config example

```
module.exports = {
  apps: [
    {
      name: "bot-hunter",
      script: "./bot-hunter/app.js",
      env: {
        BOTHUNTER_TOKEN: "",
      },
    }
  ],
};
```