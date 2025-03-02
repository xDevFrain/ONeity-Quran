module.exports = class UpdateChecker {

  static async checkVersion() {
    fetch("https://api.github.com/repos/XDevFrain/ONeity-Quran/tags").then((res) => {
      if (Math.floor(res.status / 100) !== 2) return console.warn("🔄  Failed to pull latest version from server".bgRed);
      res.json().then((json) => {
        const latest = json[0].name.split(".").map((k) => parseInt(k));
        const current = require("../../../package.json").version.split(".")
          .map((k) => parseInt(k));
        if (
          latest[0] > current[0] ||
          (latest[0] === current[0] && latest[1] > current[1]) ||
          (latest[0] === current[0] && latest[1] === current[1] && latest[2] > current[2])
        )
          console.warn(`🔄 Quran Radio is New version available: ${json[0].name}; Current Version: ${current.join(".")}`.bgRed);
        else console.log("🔄  The Quran Radio is up to date".bgGreen);
      });
    });
  }
}