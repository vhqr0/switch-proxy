import React from "react";
import { createRoot } from "react-dom/client";
import { getProxy, getStorage } from "../chrome";
import App from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("app"));

async function main() {
  const proxy = await getProxy();
  const proxyList = await getStorage("proxyList");
  root.render(<App initProxy={proxy} initProxyList={proxyList || []} />);
}

main();
