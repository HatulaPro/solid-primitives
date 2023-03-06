/* @refresh reload */
import { Component, lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Routes, Route, Link } from "@solidjs/router";
import "uno.css";

const Lazy = lazy(() => import("./lazy"));
const LazySuspense = lazy(() => import("./lazy-suspense"));
const Async = lazy(() => import("./async"));
const Grouped = lazy(() => import("./grouped"));
const Cache = lazy(() => import("./cache"));
const Writable = lazy(() => import("./writable-page"));

const App: Component = () => {
  return (
    <Router>
      <nav class="fixed top-2 left-2 flex space-x-4">
        <a class="text-yellow-400" href="/">
          reload
        </a>
        <Link class="text-yellow-400" href="/lazy">
          /lazy
        </Link>
        <Link class="text-yellow-400" href="/lazy-suspense">
          /lazy-suspense
        </Link>
        <Link class="text-yellow-400" href="/async">
          /async
        </Link>
        <Link class="text-yellow-400" href="/grouped">
          /grouped
        </Link>
        <Link class="text-yellow-400" href="/cache">
          /cache
        </Link>
        <Link class="text-yellow-400" href="/writable">
          /writable
        </Link>
      </nav>
      <div class="p-24 box-border w-full min-h-screen space-y-4 bg-gray-800 text-white overflow-hidden">
        <Routes>
          <Route path="/lazy" element={<Lazy />} />
          <Route path="/lazy-suspense" element={<LazySuspense />} />
          <Route path="/async" element={<Async />} />
          <Route path="/grouped" element={<Grouped />} />
          <Route path="/cache" element={<Cache />} />
          <Route path="/writable" element={<Writable />} />
          <Route path="/" element={<p>Welcome</p>} />
        </Routes>
      </div>
    </Router>
  );
};
render(() => <App />, document.getElementById("root")!);
