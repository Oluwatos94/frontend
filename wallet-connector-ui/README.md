# connect wallet Dapp Sample Frontend for Starknet

This repository contains a reusable React component for connecting to StarkNet wallets (e.g., Argent X, Braavos). This is a boilerplate and does not imply completeness.
You should extend on this to build you own design.


This project uses `yarn` package manager.

## Technologies Used

- [starknet-react](https://starknet-react.com/docs/getting-started)
- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `yarn`:

```bash
yarn
```

### Run the development server

```bash
yarn dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
