export async function getStorage(key) {
  const data = await chrome.storage.sync.get(key);
  return data[key];
}

export async function setStorage(key, value) {
  const data = { [key]: value };
  await chrome.storage.sync.set(data);
}

export async function getProxy() {
  const proxy = await chrome.proxy.settings.get({ incognito: false });
  return proxy.value;
}

export async function setProxy(value) {
  const proxy = { value, scope: "regular" };
  return await chrome.proxy.settings.set(proxy);
}

export async function setSystemProxy() {
  const value = { mode: "system" };
  return await setProxy(value);
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
  const value = {
    mode: "fixed_servers",
    rules: { singleProxy: server },
  };
  return await setProxy(value);
}
