// Make a GET HTTP response and parse the JSON response
export default async (url, options = {}) => {
  // Try first with fetch() - browser, worker, polyfilled, etc
  if (typeof fetch !== "undefined") {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error ${res.status} retrieving ${url}`);
    return res.json();
  }

  // Now try with Node.js, which needs to be promisified
  if (typeof require !== "undefined") {
    return new Promise((resolve, reject) => {
      const handler = res => {
        res.setEncoding("utf8");
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Error ${res.statusCode} retrieving ${url}`));
        }
        let data = "";
        res.on("data", chunk => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      };
      require("https")
        .get(url, options, handler)
        .on("error", reject);
    });
  }

  // No supported method was found, display the warning
  throw new Error("fetch() is not available, please polyfill it");
};
