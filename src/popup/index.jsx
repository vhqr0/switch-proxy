import React from "react";
import { createRoot } from "react-dom/client";
import { getProxy, getStorage } from "../chrome";
import App from "./App";
import "./styles.css";

async function main() {
  const proxy = await getProxy();
  const proxyList = await getStorage("proxyList");
  const root = createRoot(document.getElementById("app"));
  root.render(<App initProxy={proxy} initProxyList={proxyList || []} />);
}

main();
