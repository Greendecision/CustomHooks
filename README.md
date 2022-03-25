# Custom Hooks

A series of custom hooks used in various projects by [Greendecision](https://www.greendecision.eu/wp/)

- useCookie
- useDebounce
- useEventListener
- useTimeout
- useWindowSize

## useCookie

A `useState` like hook, that under the hood saves the value with the browser cookies API.

**Params**

- key: key used by the browser to store the value
- defaultValue: initial value
- options: object of Cookies.CookieAttributes. Some default options are passed (sameSite: "Strict", secure: true)

**Returns**
`[value, updateValue, deleteValue]`

## useDebounce

A `useEffect` like hook, it takes an array of dependencies, but unlike `useEffect`, it calls the callback only after a certain time passed without any changes in the observed variables.

**Params**

- callback: function called when after the variables stopped changing
- delay: time to wait before calling callback (in milliseconds)
- dependencies: array of variables to watch

**Returns**
void

## useEventListener

Hook that is triggered when a certain event happens

**Params**

- eventType: type of the event to watch
- callback: function called when the event triggers the listener
- element: element to observe, the event must happen within the element. The default falue is `window`

**Returns**
void

## useTimeout

Hook that takes a callback and calls it after a certain delay has passed.
It returns a function that can be used to restart it and one that can be used to stop it.

**Params**

- callback: function called once the time passed
- delay: time to wait before calling the callback (in milliseconds)

**Returns**
`[reset, clear]` (both are functions that take no argument)

## useWindowSize

Hook that updated the return value every time the dimension of the window changes

**Params**
_nothing_

**Returns**

```js
{
  width: number,
  height: number,
}
```
