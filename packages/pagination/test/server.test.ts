import { describe, test, expect } from "vitest";
import { createRoot, Suspense, createSignal } from "solid-js";
import { createInfiniteScroll, createPagination } from "../src";
import { renderToStringAsync } from "solid-js/web";

describe("createPagination", () => {
  test("createPagination returns page getter and setter", () =>
    createRoot(dispose => {
      const [, page, setPage] = createPagination({ pages: 100 });
      expect(page(), "initial value should be 1").toBe(1);
      setPage(2);
      expect(page(), "value after change should be 2").toBe(2);
      dispose();
    }));

  test("createPagination returns props", () =>
    createRoot(dispose => {
      const [paginationProps, page, setPage] = createPagination({ pages: 100 });
      expect(paginationProps().map(({ children }) => children)).toEqual([
        "|<",
        "<",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        ">",
        ">|",
      ]);
      expect(paginationProps().findIndex(({ ["aria-current"]: current }) => current)).toBe(2);
      setPage(page() + 1);
      expect(paginationProps().findIndex(({ ["aria-current"]: current }) => current)).toBe(3);
      dispose();
    }));

  test("createPagination clamps start", () =>
    createRoot(dispose => {
      const [paginationProps, _page, _setPage] = createPagination({
        pages: 10,
        maxPages: 13,
      });
      const extraProps = 4;
      expect(paginationProps().length, "pages").toBe(10 + extraProps);
      dispose();
    }));

  test("createPagination pages reused", () =>
    createRoot(dispose => {
      const commonOptions = {
        showFirst: false,
        showPrev: false,
        showNext: false,
        showLast: false,
      };
      const [options, setOptions] = createSignal({ ...commonOptions, pages: 3 });
      const [paginationProps, _page, _setPage] = createPagination(options);
      const initialPages = paginationProps();
      setOptions({ ...commonOptions, pages: 2 });
      const updatedPages = paginationProps();
      expect(updatedPages.every((page, index) => Object.is(page, initialPages[index]))).toBe(true);
      dispose();
    }));
});

describe("createInfiniteScroll", () => {
  const fetcher = async (page: number) => Array.from({ length: page + 1 }, (_, i) => i);

  test("createInfiniteScroll", async () => {
    let run = 0;

    await new Promise<void>(resolve => {
      renderToStringAsync(() => {
        Suspense({
          get children() {
            const [pages] = createInfiniteScroll(fetcher);

            if (run === 0) {
              expect(pages(), "initial run").toEqual([]);
            } else {
              expect(pages(), "after fetcher resolved").toEqual([0]);
              resolve();
            }

            run++;
            return "";
          },
        });
      });
    });

    expect(run).toBe(2);
  });
});
