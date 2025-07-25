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
  const [inputProxy, setInputProxy] = useState("");
  const syncProxy = async () => {
    const newProxy = await getProxy();
    setProxy(newProxy);
  };
  const onSwitchSystemProxy = async () => {
    await setSystemProxy();
    await syncProxy();
  };
  const onSwitchProxyServer = (url) => {
    return async () => {
      await setProxyServer(url);
      await syncProxy();
    };
  };
  const onDeleteProxyServer = (url) => {
    return async () => {
      const newProxyList = proxyList.filter((proxyURL) => proxyURL != url);
      await setStorage("proxyList", newProxyList);
      setProxyList(newProxyList);
    };
  };
  const onInputProxyChange = (event) => {
    setInputProxy(event.target.value);
  };
  const onInputProxySubmit = async (event) => {
    event.preventDefault();
    const newProxyList = proxyList.concat([inputProxy]);
    await setStorage("proxyList", newProxyList);
    setProxyList(newProxyList);
    setInputProxy("");
  };
  return (
    <div className="app">
      <div className="proxy">
        <h2 className="proxy-header">Proxy</h2>
        <code className="proxy-content">{JSON.stringify(proxy)}</code>
      </div>
      <div className="proxy-list">
        <h2 className="proxy-list-header">Proxy List</h2>
        <ul className="proxy-list-content">
          <li className="proxy-item system-proxy-item">
            system
            <button
              className="button switch-button"
              onClick={onSwitchSystemProxy}
            >
              Switch
            </button>
          </li>
          {proxyList.map((url) => (
            <li className="proxy-item proxy-server-item" key={url}>
              {url}
              <button
                className="button switch-button"
                onClick={onSwitchProxyServer(url)}
              >
                Switch
              </button>
              <button
                className="button delete-button"
                onClick={onDeleteProxyServer(url)}
              >
                Delete
              </button>
            </li>
          ))}
          <li className="proxy-item proxy-input-item">
            <form
              className="form proxy-input-form"
              onSubmit={onInputProxySubmit}
            >
              <input
                className="input proxy-input"
                type="text"
                value={inputProxy}
                onChange={onInputProxyChange}
              />
              <button className="button add-button" type="submit">
                Add
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
