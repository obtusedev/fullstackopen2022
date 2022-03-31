Objectives:

-   Rendering data collections.
-   Submitting data to React application using HTML forms.
-   Fetching data and storing to backend.
-   Styling React app with CSS.

Using `map` to create list of elements:

```jsx
items.map(item => <li key={item.id}>{item.name}</li>); // don't forget to add a key
```

Using array index as keys is an Anti-Pattern:

Wow didn't know this. Guilty of doing this.

```jsx
items.map((item, index) => <li key={index}>{item.name}</li>);
```

The reason being if you push or remove an element from the array, the index will point to another item and React might point to the wrong element.

> React uses _index_ as _key_ if no key is passed. [source](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318#1917)

There are some situations where you don't need a key (from the article):

1. The list and items are static-they are not computed and do not change.
2. The items in the list have no ids.
3. The list is _never_ ordered or filtered.

When _all_ 3 conditions are met, you **safely use the index as a key**.
