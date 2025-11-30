# Prescripto – Doctor Appointment Booking Application

Prescripto is a full-stack doctor appointment booking application.  
This repository currently contains the **frontend** built with React, Vite, React Router, and Tailwind CSS.  
A **Node.js / Express / MongoDB backend** will be added to handle authentication, real data, and booking logic.

The frontend is already structured in a production-ready way, so it will be easy to connect it to a real API.

---

## 1. Project Overview

Prescripto aims to provide a smooth way for patients to:

- Discover doctors by speciality  
- View doctor details and availability  
- Choose a time slot and book an appointment  
- Manage their profile and see upcoming appointments  

Right now, the frontend uses **static doctor data** from `assets/assets.js` via React Context.  
The backend will later replace this with real data from a database.

---

## 2. Tech Stack

### Frontend

- **React** (with functional components and hooks)
- **Vite** (for fast dev build and bundling)
- **React Router DOM** (client-side routing)
- **Tailwind CSS** (utility-first styling)
- **Context API** (global state for doctors and currency)
- **Axios** (ready for API calls)
- **React Toastify** (planned for notifications)

### Backend (planned)

- **Node.js** with **Express**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **REST APIs** for users, doctors, and appointments

---

## 3. Current Features (Frontend)

### 3.1 User-facing features

- **Home page**
  - Hero section with CTA to “Book Appointment”
  - Speciality slider to quickly filter doctors
  - “Top Doctors” section showing highlighted doctors
  - Promotional banner for creating an account

- **Doctors listing**
  - `/doctors` shows all doctors
  - `/doctors/:speciality` filters doctors by their speciality  
  - On mobile, there is a **filter toggle** for speciality filters
  - Each doctor card shows:
    - Name
    - Speciality
    - Availability indicator
    - Picture

- **Doctor details & appointment page**
  - Route: `/appoinment/:docId`
  - Shows:
    - Doctor name, degree, speciality, experience
    - About text
    - Appointment fee (using `currencySymbol` from context)
  - **Dynamic booking slots**:
    - Generates 7 days of slots from the current day
    - Each day has 30-minute intervals between 10:00 and 21:00
    - User can:
      - Select a day
      - Select a time slot
  - “Related Doctors” section at the bottom:
    - Suggests other doctors with the same speciality

- **Login / Signup UI**
  - Route: `/login`
  - Toggle between **Sign Up** and **Login** mode using state
  - Form fields:
    - Full name (Sign Up only)
    - Email
    - Password
  - Submit handler is currently a placeholder (ready to connect to backend auth API).

- **User profile**
  - Route: `/my-profile`
  - Shows user basic information:
    - Profile picture
    - Name
    - Email
    - Phone
    - Address (line 1, line 2)
    - Gender
    - Date of birth
  - **Edit mode**:
    - User can edit name, phone, address, gender, and date of birth
    - Toggling “Edit / Save information” updates data in local component state

- **My appointments**
  - Route: `/my-appoinments`
  - Shows a list of sample appointments using doctor data
  - Each appointment shows:
    - Doctor image, name and speciality
    - Address from doctor object
    - Date & time (currently hard-coded)
  - Buttons (UI only for now):
    - “Pay Online”
    - “Cancel Appointment”

- **Static pages**
  - `/about` – explains what Prescripto is and its vision
  - `/contact` – shows office address, contact details, and a “Careers” section

### 3.2 Layout & Navigation

- **NavBar**
  - Logo click → navigates to `/`
  - Links: Home, All Doctors, About, Contact
  - On desktop: horizontal navigation bar
  - On mobile: hamburger menu opens a full-screen menu
  - Simulated auth state with `token`:
    - If logged in (`token === true`):
      - Shows profile picture with dropdown:
        - My Profile
        - My Appointments
        - Logout
    - If logged out:
      - Shows “Create Account” button → `/login`

- **Footer**
  - Simple three-column layout:
    - Logo + short description
    - Company links (Home, About, Contact, Privacy Policy)
    - Contact info

---

## 4. State Management & Data Flow

### 4.1 Context: `AppContext`

`AppContext` provides:

```js
{
  doctors,        // list of all doctors (from assets)
  currencySymbol: '$'
}
