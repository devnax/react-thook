import React from "react";
import { MethodType, StateHook, ThookOption, useState } from "./types"
import { createBucket } from 'react-state-bucket';

const thook = <O extends ThookOption>(option: ThookOption) => {

  return class Thook {
    private useState: useState;
    state: StateHook<O['state']> = {} as StateHook<O['state']>;
    events: { [key: string]: MethodType[] } = {};
    options: { [key: string]: any } = {};

    [key: string]: any;

    constructor(options: { [key: string]: any }) {
      this.options = options;
      this.useState = createBucket(option.state || {}) as any;
      this.render = this.render.bind(this);

      if (option.methods) {
        Object.keys(option.methods).forEach((methodName) => {
          const method = option.methods![methodName] as MethodType;
          if (typeof method !== 'function') {
            throw new Error(`Method ${methodName} is not a function`);
          }
          if (typeof (this as any)[methodName] === 'function') {
            throw new Error(`Method ${methodName} already exists`);
          }
          (this as any)[methodName] = method.bind(this);
        });
      }
    }

    render() {
      this.state = this.useState();
      const Template = option.template.bind(this);
      return <Template />;
    }

    emit(eventName: string, ...args: any[]) {
      if (this.events[eventName]) {
        this.events[eventName].forEach((callback) => {
          callback.apply(this, args);
        });
      }
    }

    on(eventName: string, callback: MethodType) {
      if (typeof callback !== 'function') throw new Error(`Callback for event ${eventName} is not a function`);
      if (!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(callback);
    }

    off(eventName: string, callback: MethodType) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
      }
    }
  };
};

export default thook;