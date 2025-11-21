# Bits Action House

A modular Auction house site where users can manage and display items for auction and view charts with stats. The codebase is set up for scalability, using a clear folder structure and helper utilities.

### Table of contents

- [Get started]()
- [Technologies]()
- [Workflow and Testing]()
- [Scripts]()
- [.env]()

## Project Structure

```
src/
  app/
    script.ts
    components/
      charts/
      listings/
        helpers/
      navbar/
    events/
    ui/
      features/
  services/
    api/
    helpers/
    types/
  utils/
    config/
    storage/
```

### Technologies and tools

- Typescript
- Vite
- Vitest
- Playwright
- Husky

- Tailwind (styles)
- Shadcn (components)

### Dependencies and setup

1. **Clone the repository**

   ```bash
   git clone XXX
   cd XXX
   git switch dev
   ```

   All work happens at the dev branch/feature branches, then gets pulled into main when approved.

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the project**
   ```bash
   npm run dev
   ```

---

**!Note!**<br/>
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
