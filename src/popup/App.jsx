import React, { useState } from "react";
import {
  setStorage,
  getProxy,
  setSystemProxy,
  setProxyServer,
} from "../chrome";

function App({ initProxy, initProxyList }) {
  const [proxy, setProxy] = useState(initProxy);
  const [proxyList, setProxyList] = useState(initProxyList);
  const onSwitchSystemProxy = async () => {
    await setSystemProxy();
    const newProxy = await getProxy();
    setProxy(newProxy);
  };
  const onSwitchProxyServer = (url) => {
    return async () => {
      await setProxyServer(url);
      const newProxy = await getProxy();
      setProxy(newProxy);
    };
  };
  const onDeleteProxyServer = (url) => {
    return async () => {
      const newProxyList = proxyList.filter((proxyURL) => proxyURL != url);
      await setStorage("proxyList", newProxyList);
      setProxyList(newProxyList);
    };
  };
  const onSaveNewProxy = async () => {
    const url = document.getElementById("add-proxy").value;
    const newProxyList = proxyList.concat([url]);
    await setStorage("proxyList", newProxyList);
    setProxyList(newProxyList);
  };
  return (
    <div>
      <div>Proxy: {JSON.stringify(proxy)}</div>
      <ul>
        <li>
          <div>System Proxy</div>
          <button onClick={onSwitchSystemProxy}>Switch</button>
        </li>
        {proxyList.map((url) => (
          <li key={url}>
            <div>Proxy Server: {url}</div>
            <button onClick={onSwitchProxyServer(url)}>Switch</button>
            <button onClick={onDeleteProxyServer(url)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <div>Add Proxy:</div>
        <input id="add-proxy" type="text" />
        <button onClick={onSaveNewProxy}>Save</button>
      </div>
    </div>
  );
}

export default App;
