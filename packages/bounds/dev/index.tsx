import { Component, createSignal, Setter } from "solid-js";
import { render } from "solid-js/web";
import { throttle } from "@solid-primitives/scheduled";
import "uno.css";
import { createElementBounds, UpdateGuard } from "../src";

const NumberInput: Component<{ value: number; setValue: Setter<number>; name: string }> = props => {
  return (
    <div class="flex flex-col">
      <label for={props.name} class="mb-1">
        {props.name}:
      </label>
      <input
        name={props.name}
        type="range"
        min="10"
        max="400"
        step="10"
        value={props.value}
        onInput={e => props.setValue(+e.currentTarget.value)}
      />
    </div>
  );
};

const App: Component = () => {
  const [width, setWidth] = createSignal(200);
  const [height, setHeight] = createSignal(200);

  let ref: HTMLDivElement | undefined;
  const throttleUpdate: UpdateGuard = fn => throttle(fn, 500);
  const es = createElementBounds(() => ref, {
    trackMutation: throttleUpdate,
    trackScroll: throttleUpdate,
  });

  return (
    <div class="p-24 box-border w-full h-150vh flex flex-col justify-center items-center space-y-4 bg-gray-800 text-white">
      <div class="w-60vw overflow-x-scroll p-8">
        <div class="w-80vw">
          <div class="center-child min-h-82">
            <div
              ref={e => (ref = e)}
              class="w-24 h-24 bg-orange-500 rounded-md shadow-bg-gray-900 shadow-lg center-child"
              style={{
                width: `${width()}px`,
                height: `${height()}px`,
              }}
            >
              <pre>{JSON.stringify(es, undefined, 2)}</pre>
            </div>
          </div>
          <div class="wrapper-h">
            <NumberInput name="width" value={width()} setValue={setWidth} />
            <NumberInput name="height" value={height()} setValue={setHeight} />
          </div>
        </div>
      </div>
    </div>
  );
};

render(() => <App />, document.getElementById("root")!);
