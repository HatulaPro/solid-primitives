import { Component, For, Show } from "solid-js";
import { render } from "solid-js/web";
import "uno.css";
import { createInfiniteScroll, createPagination } from "../src";

async function fetcher(page: number) {
  let elements: string[] = [];
  let res = await fetch(`https://openlibrary.org/search.json?q=hello%20world&page=${page + 1}`, {
    method: "GET",
  });
  if (res.ok) {
    let json = await res.json();
    json.docs.forEach((b: any) => elements.push(b.title));
  }
  return elements;
}

const App: Component = () => {
  const [paginationProps, page, setPage] = createPagination({ pages: 100 });
  const [pages, infiniteScrollLoader, { end }] = createInfiniteScroll(fetcher);

  return (
    <div class="w-full min-h-screen flex">
      <div class="p-24 box-border w-1/2 flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white">
        <div class="wrapper-v">
          <h4>Pagination component</h4>
          <p>Current page: {page()} / 100</p>
          <nav class="flex flex-row">
            <For each={paginationProps()}>{props => <button {...props} />}</For>
          </nav>
          <button onClick={() => setPage(Math.round(Math.random() * 100 + 1))}>
            jump to random page
          </button>
        </div>
      </div>
      <div class="bg-gray-800 w-1/2 text-white max-h-screen flex flex-col">
        <div class="h-[10%] overflow-scroll flex items-center justify-center">
          <h1>Infinite Scrolling:</h1>
        </div>
        <div class="h-[90%] overflow-scroll">
          <For each={pages()}>{item => <p>{item}</p>}</For>
          <Show when={!end()}>
            <h1 use:infiniteScrollLoader>Loading...</h1>
          </Show>
        </div>
      </div>
    </div>
  );
};

render(() => <App />, document.getElementById("root")!);
