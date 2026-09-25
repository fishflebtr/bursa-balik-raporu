const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const ADMIN_USER = "FishFleb";
const ADMIN_PASS = "BursaLRF2026";
const ADMIN_TOKEN = "fishfleb-secret-token-2026";

const contentPath = path.join(__dirname, "data", "content.json");
const locationsPath = path.join(__dirname, "data", "locations.json");
const publicDir = path.join(__dirname, "public");

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    return null;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function getToken(req) {
  const auth = req.headers["x-admin-token"];
  if (auth) return auth;
  const cookie = req.headers.cookie || "";
  const match = cookie.match(/adminToken=([^;]+)/);
  return match ? match[1] : null;
}

function isAdmin(req) {
  return getToken(req) === ADMIN_TOKEN;
}

function sendJSON(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-token",
    "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS"
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

function serveStatic(req, res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
  };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": types[ext] || "text/plain" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-token",
      "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS"
    });
    res.end();
    return;
  }

  if (pathname === "/api/locations" && req.method === "GET") {
    return sendJSON(res, 200, readJSON(locationsPath) || { regions: [] });
  }

  if (pathname === "/api/content" && req.method === "GET") {
    return sendJSON(res, 200, readJSON(contentPath) || {});
  }

  if (pathname === "/api/admin/login" && req.method === "POST") {
    const body = await parseBody(req);
    if (body.username === ADMIN_USER && body.password === ADMIN_PASS) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Set-Cookie": "adminToken=" + ADMIN_TOKEN + "; Path=/; Max-Age=604800; SameSite=Lax",
        "Access-Control-Allow-Origin": "*"
      });
      res.end(JSON.stringify({ success: true, token: ADMIN_TOKEN, message: "Hos geldin FishFleb!" }));
    } else {
      sendJSON(res, 401, { success: false, message: "Hatali kullanici adi veya sifre" });
    }
    return;
  }

  if (pathname === "/api/admin/logout" && req.method === "POST") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Set-Cookie": "adminToken=; Path=/; Max-Age=0",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  if (pathname === "/api/admin/check" && req.method === "GET") {
    return sendJSON(res, 200, { isAdmin: isAdmin(req) });
  }

  if (pathname === "/api/content" && req.method === "PUT") {
    if (!isAdmin(req)) return sendJSON(res, 403, { success: false, message: "Yetkisiz" });
    const body = await parseBody(req);
    const current = readJSON(contentPath) || {};
    const updated = Object.assign({}, current, body, {
      updatedAt: new Date().toISOString(),
      updatedBy: "FishFleb"
    });
    writeJSON(contentPath, updated);
    return sendJSON(res, 200, { success: true, data: updated });
  }

  if (pathname === "/api/locations" && req.method === "PUT") {
    if (!isAdmin(req)) return sendJSON(res, 403, { success: false, message: "Yetkisiz" });
    const body = await parseBody(req);
    writeJSON(locationsPath, body);
    return sendJSON(res, 200, { success: true });
  }

  let filePath = path.join(publicDir, pathname === "/" ? "index.html" : pathname);
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return serveStatic(req, res, filePath);
  }

  serveStatic(req, res, path.join(publicDir, "index.html"));
});

server.listen(PORT, () => {
  console.log("\nBursa Balik Raporu (FishFleb) calisiyor!");
  console.log("   http://localhost:" + PORT);
  console.log("\n   Yonetici: FishFleb / BursaLRF2026\n");
});
