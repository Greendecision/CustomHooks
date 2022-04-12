# Custom Hooks

A series of custom hooks used in various projects by [Greendecision](https://www.greendecision.eu/wp/)

- [useCookie](#usecookie)
- [useDebounce](#usedebounce)
- [useEventListener](#useeventlistener)
- [useTimeout](#usetimeout)
- [useWindowSize](#usewindowsize)
- [usePageTitle](#usepagetitle)
- [useAlert](#useAlert)
- [useForm](#useForm)

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

## useSynchronousWindowSize

Hook similar to `useWindowsSize` that synchronously keeps track of window resizing.

**Params**
_nothing_

**Returns**

```js
{
  width: number,
  height: number,
}
```

## usePageTitle

Hook that can be used to set the page title.
It uses jquery, and it relies on two classes: `HookPageTitle-container` and `HookPageTitle-text`.

**Params**

- titleProps: object containing `text: string` and `url: string`

**Returns**

- setTitle: a function that accepts a titleProps object, it can be used to update the title after the initialization.

**Example**

_ui/components/Navbar.tsx_

```js
import { PageTitleContainerClass, PageTitleTextClass } from "@greendecision/hooks/usePageTitle";

[...]

<Button className={PageTitleContainerClass}>
  <div className={PageTitleTextClass} />
</Button>
```

_ui/page/myPage.tsx_

```js
import { usePageTitle } from "@greendecision/hooks";
[...]
const setTitle = usePageTitle({ title: 'home', url: '/' })
[...]
setTitle({ title: 'new title', url: '/' })
```

## useAlert

Hook that uses `notistack` to enqueue alerts.  

**Prerequisites**

Install `notistack` on your project:
```
npm install notistack@latest-mui-v4
yarn add notistack@latest-mui-v4
```

Then, the Snackbar provider should be included in the application:
```js
import { SnackbarProvider } from 'notistack';
[...]
<SnackbarProvider>
    <App />
</SnackbarProvider>
[...]
```

**Returns**

- showAlert: Adds an alert with optional action button(s) to current stack of alerts. It will be hidden after 3.5 seconds.
- showAlertWithContent: Adds an alert with optional sub-content to current stack of alerts. It will be hidden after 3.5 seconds.

**Example**

```js
import { PageTitleContainerClass, PageTitleTextClass } from "@greendecision/hooks/useAlert";

[...]
const { showAlert } = useAlert();
showAlert("This is a stacked alert!", "info")
showAlert("This is another one!", "error");
```

## useForm

Hook for validating and submitting a form (e.g.: login, password change).
