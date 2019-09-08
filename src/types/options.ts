import { Callbacks, Settings } from '.';

export type Options = {
  readonly elements: HTMLElement | HTMLElement[];
  readonly settings: Settings;
  readonly callbacks: Callbacks;
};
