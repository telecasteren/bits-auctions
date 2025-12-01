# Bits Action House

![image](src/assets/readme-logo.png)
**Live site:** [bits-auctions](https://telecasternilsen.com/bits-auctions/)

A modular Auction house site where users can manage and display items (listings) for auction and view charts with stats. The codebase is set up for scalability, using a clear folder structure and helper utilities.

**Author:** Tele Caster Nilsen<br/>
**Website:** [www.telecasternilsen.com](https://telecasternilsen.com)

---

### Table of contents

- [Technologies](#technologies-and-tools)
- [Get started](#get-started)
- [Workflow and Testing](#workflow-and-testing)
- [.env](#environment-variables)
- [Github project](https://github.com/users/telecasteren/projects/3)
- [Acknowledgements](#acknowledgements)
- [Resources](#resources)

---

## Project Structure

```
src/
  app/
    script.ts
    components/
      navbar/
    events/
    ui/
      features/
  assets/
    Typography/
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

### Get started

#### Dependencies and setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/telecasteren/bits-auctions.git
   cd bits-auctions
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

---

### Workflow and testing

#### Workflow

This site is deployed with Github Pages.<br/>
Some jobs like formatting with Prettier and linting with Eslint is automated with a [workflow](.github/workflows/workflow.yml) upon release.

When developing, use

```bash
npm run dev
```

When building for production, use

```bash
npm run build
npm run deploy
```

See [workflow file](.github/workflows/workflow.yml) for all automated jobs.<br/>
See [here](package.json) for all available scripts.

#### Testing

The project use Vitest and Playwright for testing.

```bash
npm run test:unit # Vitest
npm run test:e2e # Playwright test
```

Tests can be found [here](src/utils/tests)

---

### Environment variables

See the [.env.example](.env.example) file for how to use.

### Branding / CSS Variables

**These file centralise the themes:**<br/>
[App](css/variables.css)<br/>
[shadcn components](css/shadcn/variables.css)

## Acknowledgements

### Typography

Lemon font by [Rajesh Rajput](https://rajputrajesh-448.gumroad.com/l/Lemon9)

---

### Resources

[playwright config](https://playwright.dev/docs/test-configuration)<br/>
