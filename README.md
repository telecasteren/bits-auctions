# Bits Action House

### Technologies and tools

- Typescript
- Vite
- Vitest
- Playwright
- Husky

- Tailwind (styles)
- Shadcn (components)

### Dependencies and setup

If you add any libraries that require type definitions, install them using:

```bash
npm install --save-dev @types/<library>
```

### Workflow and testing

```bash
npm install --save-dev husky
npx husky install
```

```js
"scripts": {
  "prepare": "husky install"
}
```

```bash
npm install --save-dev vitest

npm install --save-dev playwright
npx playwright install
```

### Resources

[void element.offsetWidth](https://stackoverflow.com/questions/60686489/what-purpose-does-void-element-offsetwidth-serve)
