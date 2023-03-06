import { createStaticStore, MaybeAccessor, Position } from "@solid-primitives/utils";
import { createSharedRoot } from "@solid-primitives/rootless";
import {
  DEFAULT_MOUSE_POSITION,
  DEFAULT_RELATIVE_ELEMENT_POSITION,
  makeMouseInsideListener,
  makeMousePositionListener,
  getPositionToElement,
} from "./common";
import {
  FollowTouchOptions,
  MousePositionInside,
  PositionRelativeToElement,
  UseTouchOptions,
} from "./types";
import { Accessor, createComputed, createEffect, onMount } from "solid-js";

export interface MousePositionOptions extends UseTouchOptions, FollowTouchOptions {
  /**
   * Initial values
   * @default { x: 0, y: 0, isInside: false, sourceType: null }
   */
  initialValue?: Partial<MousePositionInside>;
}

export interface PositionToElementOptions extends UseTouchOptions, FollowTouchOptions {
  /**
   * Initial value
   * @default { x: 0, y: 0, top: 0, left: 0, width: 0, height: 0, isInside: false }
   */
  initialValue?: Partial<PositionRelativeToElement>;
}

/**
 * Attaches event listeners to {@link target} element to provide a reactive object of current mouse position on the page.
 * @param target (Defaults to `window`) element to attach the listeners to – can be a reactive function
 * @param options {@link MousePositionOptions}
 * @returns reactive object of current mouse position on the page
 * ```ts
 * { x: number, y: number, sourceType: MouseSourceType, isInside: boolean }
 * ```
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/mouse#createmouseposition
 * @example
 * const [el, setEl] = createSignal(ref)
 * const pos = createMousePosition(el, { touch: false })
 * createEffect(() => {
 *   console.log(pos.x, pos.y)
 * })
 */
export function createMousePosition(
  target?: MaybeAccessor<Window | Document | HTMLElement>,
  options: MousePositionOptions = {},
): MousePositionInside {
  if (process.env.SSR) {
    return DEFAULT_MOUSE_POSITION;
  }
  const [state, setState] = createStaticStore<MousePositionInside>({
    ...DEFAULT_MOUSE_POSITION,
    ...options.initialValue,
  });

  const attachListeners = (el: Window | Document | HTMLElement | undefined) => {
    makeMousePositionListener(el, setState, options);
    makeMouseInsideListener(el, setState.bind(void 0, "isInside"), options);
  };

  if (typeof target !== "function") attachListeners(target);
  else createEffect(() => attachListeners(target()));

  return state;
}

/**
 * Attaches event listeners to `window` to provide a reactive object of current mouse position on the page.
 *
 * This is a [shared root primitive](https://github.com/solidjs-community/solid-primitives/tree/main/packages/rootless#createSharedRoot).
 * @returns reactive object of current mouse position on the page
 * ```ts
 * { x: number, y: number, sourceType: MouseSourceType, isInside: boolean }
 * ```
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/mouse#useMousePosition
 * @example
 * const pos = useMousePosition()
 * createEffect(() => {
 *   console.log(pos.x, pos.y)
 * })
 */
export const useMousePosition = /*#__PURE__*/ createSharedRoot(
  createMousePosition.bind(void 0, void 0, void 0),
);

/**
 * Provides an autoupdating position relative to an element based on provided page position.
 *
 * @param element target `Element` used in calculations
 * @param pos reactive function returning page position *(relative to the page not window)*
 * @param options {@link PositionToElementOptions}
 * @returns Autoupdating position relative to top-left of the target + current bounds of the element.
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/mouse#createPositionToElement
 *
 * @example
 * const [el, setEl] = createSignal(ref)
 * const pos = useMousePosition()
 * const relative = createPositionToElement(el, () => pos)
 * createEffect(() => {
 *   console.log(relative.x, relative.y)
 * })
 */
export function createPositionToElement(
  element: Element | Accessor<Element | undefined>,
  pos: Accessor<Position>,
  options: PositionToElementOptions = {},
): PositionRelativeToElement {
  const fallback: PositionRelativeToElement = {
    ...DEFAULT_RELATIVE_ELEMENT_POSITION,
    ...options.initialValue,
  };
  if (process.env.SSR) {
    return fallback;
  }
  const calcState = (el: Element) => {
    const { x, y } = pos();
    return getPositionToElement(x, y, el);
  };
  const getState =
    typeof element === "function"
      ? () => {
          const el = element();
          return el ? calcState(el) : fallback;
        }
      : calcState.bind(void 0, element);

  const [state, setState] = createStaticStore<PositionRelativeToElement>(fallback);
  createComputed(() => setState(getState()));
  if (typeof element === "function") onMount(() => setState(getState()));

  return state;
}
