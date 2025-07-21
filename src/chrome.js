export async function getStorage(key) {
  const data = await chrome.storage.sync.get(key);
  return data[key];
}

export async function setStorage(key, value) {
  await chrome.storage.sync.set({ [key]: value });
}

export async function getProxy() {
  const proxy = await chrome.proxy.settings.get({ incognito: false });
  return proxy.value;
}

export async function setProxy(value) {
  return await chrome.proxy.settings.set({ value, scope: "regular" });
}

export async function setSystemProxy() {
  return await setProxy({ mode: "system" });
}

export async function setProxyServer(url) {
  const parsed_url = new URL(url);
  const scheme = parsed_url.protocol.substring(
    0,
    parsed_url.protocol.length - 1,
  );
  const host = parsed_url.hostname;
  const port = parsed_url.port == "" ? null : parseInt(parsed_url.port);
  const server = { scheme, host };
  if (port) server.port = port;
  return await setProxy({
    mode: "fixed_servers",
    rules: { singleProxy: server },
  });
}
