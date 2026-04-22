# Frontend Wizards Invoice Management App - hng-stage-2(i14)

This project is the HNG Frontend Stage 2 task implementation: a testable, accessible, and responsive invoice management application.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM

## Task Coverage

- Invoice list view with status badges (`draft`, `pending`, `paid`)
- Create invoice flow with form validation
- Edit existing invoices and persist updates
- Save invoice as draft and send as pending
- Mark pending invoices as paid
- Delete invoice with confirmation modal
- Responsive layouts for mobile, tablet, and desktop

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Live Demo
- Vercel deployment: [Vercel](https://invoice-management-app-hng.vercel.app)

## Author

- Name: Fortune Ife Aladetan
- Email: [contact@ifecodes.xyz](mailto:fortuneifealadetan01@gmail.com)
- GitHub: [ALADETAN-IFE](https://github.com/ALADETAN-IFE)
- Portfolio: [ifecodes.xyz](https://www.ifecodes.xyz)

## Notes

- Invoice state is managed in-app via the invoice context.
- Core actions supported: create, edit, status updates, and delete.
