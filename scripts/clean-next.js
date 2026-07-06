const fs = require("fs");
const net = require("net");
const path = require("path");

const nextDir = path.join(process.cwd(), ".next");
const DEV_PORTS = [3000, 3001, 3002];

function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(true));
    server.once("listening", () => {
      server.close();
      resolve(false);
    });
    server.listen(port, "127.0.0.1");
  });
}

async function anyDevPortInUse() {
  for (const port of DEV_PORTS) {
    if (await isPortInUse(port)) return port;
  }
  return null;
}

async function main() {
  const busyPort = await anyDevPortInUse();
  if (busyPort) {
    console.error(
      `Impossible de supprimer .next : un serveur écoute déjà sur le port ${busyPort}.`,
    );
    console.error("Arrêtez-le d'abord (Ctrl+C), puis relancez npm run dev:clean.");
    process.exit(1);
  }

  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log("Cache .next supprimé.");
  } catch {
    /* dossier absent — ok */
  }
}

main();
