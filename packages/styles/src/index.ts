import { createSharedRoot } from "@solid-primitives/rootless";
import { Accessor, onCleanup, sharedConfig } from "solid-js";
import { createHydrateSignal } from "@solid-primitives/utils";

let serverRemSize = 16;

const totallyHiddenStyles: Partial<CSSStyleDeclaration> = {
  border: "0",
  padding: "0",
  visibility: "hidden",
  position: "absolute",
  top: "-9999px",
  left: "-9999px",
};

/**
 * Reads the current rem size from the document root.
 */
export const getRemSize = (): number =>
  process.env.SSR ? serverRemSize : parseFloat(getComputedStyle(document.documentElement).fontSize);

/**
 * Creates a reactive signal with value of the current rem size, and tracks it's changes.
 * @returns A signal with the current rem size in pixels.
 * @see [Primitive documentation](https://github.com/solidjs-community/solid-primitives/tree/main/packages/styles#createRemSize).
 * @example
 * const remSize = createRemSize();
 * console.log(remSize()); // 16
 */
export function createRemSize(): Accessor<number> {
  if (process.env.SSR) {
    return () => serverRemSize;
  }
  const [remSize, setRemSize] = createHydrateSignal(serverRemSize, getRemSize);
  const el = document.createElement("div");
  Object.assign(el.style, totallyHiddenStyles, { width: "1rem" });
  document.body.appendChild(el);
  let init = true;
  const ro = new ResizeObserver(() => {
    if (init) return (init = false);
    setRemSize(getRemSize());
  });
  ro.observe(el);
  onCleanup(() => {
    el.remove();
    ro.disconnect();
  });
  return remSize;
}

const sharedRemSize: () => Accessor<number> = /*#__PURE__*/ createSharedRoot(createRemSize);

/**
 * Returns a reactive signal with value of the current rem size, and tracks it's changes.
 *
 * This is a [shared root primitive](https://github.com/solidjs-community/solid-primitives/tree/main/packages/rootless#createSharedRoot) except if during hydration.
 *
 * @returns A signal with the current rem size in pixels.
 * @see [Primitive documentation](https://github.com/solidjs-community/solid-primitives/tree/main/packages/styles#useRemSize).
 * @example
 * const remSize = useRemSize();
 * console.log(remSize()); // 16
 */
export const useRemSize: () => Accessor<number> = process.env.SSR
  ? () => () => serverRemSize
  : () => (sharedConfig.context ? createRemSize() : sharedRemSize());

/**
 * Set the server fallback value for the rem size. {@link getRemSize}, {@link createRemSize} and {@link useRemSize} will return this value on the server.
 */
export const setServerRemSize = process.env.SSR
  ? (size: number) => {
      serverRemSize = size;
    }
  : () => {};
