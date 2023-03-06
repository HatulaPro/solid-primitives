import { Component, createSignal } from "solid-js";
import { render } from "solid-js/web";
import { Repeat } from "@solid-primitives/range";
import { createVisibilityObserver, withDirection, withOccurrence, DirectionY } from "../src";
import "uno.css";

const App: Component = () => {
  const useVisibilityObserver = createVisibilityObserver(
    {},
    withOccurrence(
      withDirection((entry, { occurrence, directionY, directionX, visible }) => {
        if (!entry.isIntersecting && directionY === DirectionY.Top && visible) {
          return true;
        }
        return entry.isIntersecting;
      }),
    ),
  );

  const [enabled, setEnabled] = createSignal(true);
  const [length, setLength] = createSignal(20);

  return (
    <div class="center-child box-border w-full h-screen overflow-hidden bg-gray-900">
      <div class="flex flex-col items-center">
        <div class="flex">
          <button class="btn" onClick={() => setEnabled(p => !p)}>
            {enabled() ? "Disable" : "Enable"}
          </button>
          <button class="btn" onClick={() => setLength(p => p + 1)}>
            Add
          </button>
          <button class="btn" onClick={() => setLength(p => p - 1)}>
            Remove
          </button>
        </div>
        <div class="h-100 w-100 rounded-lg shadow-lg overflow-y-scroll bg-white">
          <Repeat times={length()}>
            {x => (
              <div class="flex">
                <Repeat times={length()}>
                  {y => {
                    let ref: HTMLDivElement | undefined;
                    const isVisible = useVisibilityObserver(() => enabled() && ref);
                    return (
                      <div
                        ref={el => (ref = el)}
                        class="h-20 w-90 flex-shrink-0 center-child transition duration-1500 rounded-lg m-5 text-white"
                        classList={{
                          "bg-slate-500 scale-x-75": !isVisible(),
                          "bg-blue-900": isVisible(),
                        }}
                      >
                        Item_{x}_{y}
                      </div>
                    );
                  }}
                </Repeat>
              </div>
            )}
          </Repeat>
        </div>
      </div>
    </div>
  );
};

render(() => <App />, document.getElementById("root")!);
