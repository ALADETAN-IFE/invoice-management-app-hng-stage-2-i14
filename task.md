# :rocket: Frontend Wizards - Stage 2 Task: Build an Invoice Management App

## Overview

Welcome to Stage 2. You will build a responsive Invoice Management Application based on the provided [Figma design](https://www.figma.com/design/e3MtRefbZw41Ts897CQF4N/invoice-app?node-id=0-1&m=dev&t=pJoJoOU92dYwiC5p-1).

Build this as a full-stack application.

## 🎯 Core Objective

Build a fully functional invoice app that allows users to:

- Create invoices
- Read (view) invoices
- Update invoices
- Delete invoices
- Save drafts
- Mark invoices as paid
- Filter by invoice status
- Toggle light/dark mode
- Experience full responsiveness
- See hover states on interactive elements

Persist data and state using:

- LocalStorage
- IndexedDB
- Or a backend (Node/Express, Next.js API, etc.)

## 🧾 Core Features

### 1️⃣ Create, Read, Update, Delete (CRUD)

Users must be able to:

Create:

- Open invoice form
- Fill out required fields
- Save invoice

Read:

- View invoice list
- Click invoice to view full details

Update:

- Edit existing invoice
- Persist updated values

Delete:

- Delete invoice
- Show confirmation modal before deletion

### 2️⃣ Form Validations

When creating or editing invoices:

- Required fields must be validated
- Invalid fields should show error message
- Invalid fields should have visual error state
- Invalid fields should prevent submission

Example validations:

- Client name required
- Valid email format
- At least one invoice item
- Quantity and price must be positive numbers

### 3️⃣ Draft & Payment Flow

Invoices can have one of three statuses:

- Draft
- Pending
- Paid

Required behavior:

- Users can save invoice as Draft
- Draft invoices can later be edited
- Pending invoices can be marked as Paid
- Paid invoices cannot be marked back to Draft
- Status must clearly reflect in list view
- Status must clearly reflect in detail view
- Status badge color/style must reflect status clearly

### 4️⃣ Filter by Status

Users must be able to filter invoices by:

- All
- Draft
- Pending
- Paid

Requirements:

- Filter control should be intuitive (checkbox filter)
- Filtered state must update the list immediately
- Empty state should display when no invoices match filter

### 5️⃣ Light & Dark Mode Toggle

Users must be able to:

- Toggle between light mode and dark mode

Requirements:

- Theme should apply globally
- All components must adapt
- Store preference (LocalStorage recommended)
- Good color contrast in both modes

### 6️⃣ Responsive Design

The layout must adapt to:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

Requirements:

- Invoice list adapts to screen size
- Forms are usable on mobile
- No horizontal overflow
- Proper spacing and hierarchy

### 7️⃣ Hover & Interactive States

All interactive elements must have visible hover states:

- Buttons
- Links
- Invoice list items
- Status filters
- Form inputs

## 🧩 Recommended Architecture

Suggested structure:

- Invoice List Page
- Invoice Detail Page
- Invoice Form Component
- Status Badge Component
- Filter Component
- Theme Provider / Context

**NOTE: USE REACT ONLY.**

## 🧪 Acceptance Criteria

You will be graded on:

- CRUD functionality works
- Form validation prevents invalid submissions
- Status logic behaves correctly
- Filtering works accurately
- Theme toggle works across reload
- Fully responsive layout
- Clean component structure
- No console errors
- Good accessibility practices

## ♿ Accessibility Expectations

- Proper semantic HTML
- Form fields with `<label>`
- Buttons must be `<button>`
- Modal must trap focus
- Modal must close via ESC key
- Modal must be keyboard navigable
- Good color contrast (WCAG AA)

## 📦 Submission Requirements

- Live URL (Vercel / Netlify / etc.)
- GitHub repository
- README must include setup instructions
- README must include architecture explanation
- README must include trade-offs
- README must include accessibility notes
- README must include any improvements beyond requirements

[AIRTABLE LINK](https://airtable.com/appZPpwy4dtvVBWU4/shrMH9P1zv4TPhvns?TK29T=b%3AWzAsWyJURWtBWiIsNixbInJlY29ySkh6Ym5KdHlXaGVKIl1dXQ&C3OrT=recCkXkt7TEH3Kk22)

[SUBMISSION LINK](https://docs.google.com/forms/d/e/1FAIpQLScwBeDPp672SP-hUQ3PTN2NFAUbvaWmHdeDbie560iJMDQC_w/viewform)

**Deadline:** 23/04/2026, 11:59 PM
