# React Three Fiber

[Docs](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

- [Threejs the basics](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [R3F API](https://docs.pmnd.rs/react-three-fiber)
- [Discover Threejs](https://discoverthreejs.com/)
- [React Hooks](https://react.dev/reference/react)

## React Three Fiber Ecosystem

- [drei](https://github.com/pmndrs/drei)
- [GLTF JSX](https://github.com/pmndrs/gltfjsx)

## Adding a Mesh Component

```jsx
<Canvas>
  <mesh />
```

`Note that we don't need to import anything, All three.js objects will be treated as native JSX elements, just like you can just write <div /> or <span /> in regular ReactDOM. The general rule is that Fiber components are available under the camel-case version of their name in three.js.`
