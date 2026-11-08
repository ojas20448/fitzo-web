const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
function load(relativePath, imports = {}) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
    reportDiagnostics: true,
  });
  assert.equal(compiled.diagnostics.length, 0);
  const module = { exports: {} };
  vm.runInNewContext(compiled.outputText, {
    module, exports: module.exports,
    require: name => imports[name] || require(name),
  });
  return module.exports;
}

const links = load("lib/links.ts");
const { GET } = load("app/get/route.ts", { "@/lib/links": links });
const { NextRequest } = require("next/server");
for (const [userAgent, destination] of [
  ["Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)", links.STORE.ios],
  ["Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)", links.STORE.ios],
  ["Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36", links.STORE.android],
  ["Mozilla/5.0 (Linux; Android 14; wv) Instagram", links.STORE.android],
  ["Mozilla/5.0 (Windows NT 10.0; Win64; x64)", links.SITE_URL + "/#download"],
  ["", links.SITE_URL + "/#download"],
]) {
  const response = GET(new NextRequest(links.SITE_URL + "/get", {
    headers: { "user-agent": userAgent },
  }));
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("location"), destination);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("vary"), "User-Agent");
}
console.log("Download link: six device and cache-isolation checks passed.");
