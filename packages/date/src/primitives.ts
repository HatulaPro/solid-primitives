import { access, MaybeAccessor, accessWith } from "@solid-primitives/utils";
import { createWritableMemo } from "@solid-primitives/memo";
import { createPolled, TimeoutSource } from "@solid-primitives/timer";
import { Accessor, createComputed, createMemo, createSignal } from "solid-js";
import { createStore, Store } from "solid-js/store";
import { DEFAULT_MESSAGES, HOUR, MINUTE } from "./variables";
import { formatDate, formatDateRelative, getCountdown, getDate, getDateDifference } from "./utils";
import type { Countdown, DateInit, DateSetter, TimeAgoOptions, GetUpdateInterval } from "./types";

/**
 * Creates a reactive `Date` signal.
 *
 * @param init timestamp `number` | date `string` | `Date` instance; *May be a reactive signal*
 * @returns [`Date` signal, setter function]
 */
export const createDate = (init: MaybeAccessor<DateInit>): [Accessor<Date>, DateSetter] => {
  const [date, setDate] = createWritableMemo(() => getDate(access(init)));
  const setter: DateSetter = input => setDate(prev => getDate(accessWith(input, prev)));
  return [date, setter];
};

/**
 * Creates an autoupdating and reactive `new Date()`
 *
 * @param interval delay in ms for updating the date. Set to `false` to disable autoupdating. *Default = `30000`*
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/date#createDateNow
 *
 * @example
 * ```ts
 * // updates every second:
 * const [now] = createDateNow(1000);
 *
 * // reactive timeout value
 * const [timeout, setTimeout] = createSignal(500);
 * const [now] = createDateNow(timeout);
 *
 * // won't autoupdate:
 * const [now, update] = createDateNow(() => false);
 *
 * // update manually:
 * update()
 * ```
 */
export function createDateNow(
  interval: TimeoutSource = MINUTE / 2,
): [Accessor<Date>, VoidFunction] {
  const [track, trigger] = createSignal(undefined, { equals: false });
  const memo = createPolled(
    () => {
      track();
      return new Date();
    },
    interval,
    undefined,
    { equals: (a, b) => a.getTime() === b.getTime() },
  );
  return [memo, trigger];
}

/**
 * Provides a reactive time difference *(in ms)* signal.
 *
 * @param from timestamp `number` | date `string` | `Date` instance;
 * *May be a reactive signal*
 * @param to timestamp `number` | date `string` | `Date` instance;
 * *May be a reactive signal*
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/date#createTimeDifference
 *
 * @example
 * const [target, setTarget] = createSignal(1641408329089)
 * const [diff, { from, to }] = createTimeDifference("2020 1 11", target)
 * diff() // T: number
 * from() // T: Date
 * to() // T: Date
 */
export function createTimeDifference(
  from: MaybeAccessor<DateInit>,
  to: MaybeAccessor<DateInit>,
): [difference: Accessor<number>, extra: { from: Accessor<Date>; to: Accessor<Date> }] {
  const [fromDate] = createDate(from),
    [toDate] = createDate(to);
  const diff = createMemo(() => getDateDifference(fromDate(), toDate()));
  return [diff, { from: fromDate, to: toDate }];
}

/**
 * Provides a autoupdating, reactive time difference *(in ms)* from today *(now)* as a signal.
 *
 * @param to a target timestamp `number` | date `string` | `Date` instance;
 * *May be a reactive signal*
 * @param updateInterval number or a function returning a number of ms to wait before updating the **now**
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/date#createTimeDifferenceFromNow
 *
 * @example
 * const [target, setTarget] = createSignal(1641408329089)
 * const [diff, { target, now, update }] = createTimeDifferenceFromNow(target)
 * diff() // T: number
 * target() // T: Date
 * now() // T: Date
 * // manual update (automatic one can be disabled by passing false)
 * update()
 */
export function createTimeDifferenceFromNow(
  to: MaybeAccessor<DateInit>,
  updateInterval: number | GetUpdateInterval = diff =>
    Math.abs(diff) <= HOUR ? MINUTE / 2 : HOUR / 2,
): [
  difference: Accessor<number>,
  extra: { now: Accessor<Date>; target: Accessor<Date>; update: VoidFunction },
] {
  const interval =
    typeof updateInterval === "function" ? () => updateInterval(diff()) : updateInterval;
  const [now, update] = createDateNow(interval);
  const [diff, { to: target }] = createTimeDifference(now, to);
  return [diff, { update, target, now }];
}

/**
 * Provides a reactive, formatted, autoupdating date difference in relation to **now**.
 *
 * @param to a target timestamp `number` | date `string` | `Date` instance;
 * *May be a reactive signal*
 * @param options
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/date#createTimeAgo
 *
 * @example
 * ```ts
 * const [myDate, setMyDate] = createDate('Jun 28, 2021')
 * const [timeago, { target, now, update, difference }] = createTimeAgo(myDate);
 *
 * timeago() // => 5 months ago
 * difference() // T: number
 * target() // T: Date
 * now() // T: Date
 * // manual update (automatic one can be disabled by passing false)
 * update()
 * ```
 */
export function createTimeAgo(
  to: MaybeAccessor<DateInit>,
  options: TimeAgoOptions = {},
): [
  timeago: Accessor<string>,
  extra: {
    now: Accessor<Date>;
    target: Accessor<Date>;
    update: VoidFunction;
    difference: Accessor<number>;
  },
] {
  const {
    min = MINUTE,
    max = Infinity,
    dateFormatter = formatDate,
    messages,
    relativeFormatter = (a, b, diff) => formatDateRelative(diff, messages),
  } = options;

  const [difference, extra] = createTimeDifferenceFromNow(to, options.interval);

  const timeAgo = createMemo(() => {
    const absDiff = Math.abs(difference());
    if (absDiff < min) return messages?.justNow ?? DEFAULT_MESSAGES.justNow;
    if (absDiff > max) return dateFormatter(extra.target());
    return relativeFormatter(extra.now(), extra.target(), difference());
  });

  return [timeAgo, { ...extra, difference }];
}

/**
 * Provides a reactive broken down time remaining Store.
 * @param from timestamp `number` | date `string` | `Date`;
 * *May be a reactive signal*
 * @param to timestamp `number` | date `string` | `Date`;
 * *May be a reactive signal*
 *
 * **OR**
 *
 * @param difference Time difference between two dates; *May be a reactive signal*
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/date#createCountdown
 * @example
 * const [to, setTo] = createSignal(1641408329089)
 * const countdown = createCountdown("2020 1 11", to)
 *
 * countdown.minutes // e.g. 5
 * countdown.hours // e.g. 1
 * countdown.seconds // e.g. 48
 */
export function createCountdown(
  from: MaybeAccessor<DateInit>,
  to: MaybeAccessor<DateInit>,
): Store<Countdown>;
export function createCountdown(difference: Accessor<number>): Store<Countdown>;
export function createCountdown(
  a: MaybeAccessor<DateInit> | Accessor<number>,
  b?: MaybeAccessor<DateInit>,
): Store<Countdown> {
  let difference: Accessor<number>;
  if (b !== undefined) difference = createTimeDifference(a, b)[0];
  else difference = a as Accessor<number>;
  const [countdown, setCountdown] = createStore<Countdown>(getCountdown(difference()));
  createComputed(() => setCountdown(getCountdown(difference())));
  return countdown;
}

/**
 * Provides a reactive, autoupdating *(from **now**)*, broken down "time remaining" as a Store.
 * @param to a target timestamp `number` | date `string` | `Date`;
 * *May be a reactive signal*
 * @param updateInterval number or a function returning a number of ms to wait before updating the **now**. Defaults to one second.
 *
 * @see https://github.com/solidjs-community/solid-primitives/tree/main/packages/date#createCountdownFromNow
 * @example
 * // target date may be reactive
 * const [to, setTo] = createSignal(1641408329089)
 * const [countdown, { now, target, update }] = createCountdownFromNow(to, 500)
 *
 * countdown.minutes // e.g. 5
 * countdown.hours // e.g. 1
 * countdown.seconds // e.g. 48
 *
 * target() // T: Date
 * now() // T: Date
 * // manual update (automatic one can be disabled by passing false)
 * update()
 */
export function createCountdownFromNow(
  to: MaybeAccessor<DateInit>,
  updateInterval: TimeoutSource | GetUpdateInterval = 1000,
): [
  countdown: Store<Countdown>,
  extra: { now: Accessor<Date>; target: Accessor<Date>; update: VoidFunction },
] {
  const [difference, extra] = createTimeDifferenceFromNow(to, updateInterval);
  const countdown = createCountdown(difference);
  return [countdown, extra];
}
