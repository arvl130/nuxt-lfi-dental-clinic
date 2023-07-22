# 🦷Clinic Management System for LFI Dental Clinic

![Screenshot of the home page](https://raw.githubusercontent.com/arvl130/nuxt-lfi-dental-clinic/master/preview-2.png)
![Screenshot of the appointments scheduling page](https://raw.githubusercontent.com/arvl130/nuxt-lfi-dental-clinic/master/preview-1.png)

This is a clinic management system for LFI Dental Clinic developed in compliance to the requirements of SE101, IPT101, HCI101, IM101, and SIA101 subject of the Bachelor of Science in Information Technology program of Quezon City University.

Originally, this project was built with Vue + Vite, but later on it was migrated to Nuxt for easier maintenance. The original Vue frontend project can be found [here](https://gitlab.com/arvl/vue-lfi-dental-clinic). The original Node backend project can be found [here](https://gitlab.com/arvl/node-lfi-dental-clinic).

## Features

- Responsive frontend design
- Email-based sign in with verification
- Streamlined appointment scheduling and management
- Feature-rich dentist forms
- Efficient patient record system
- Automated reminders

## Tech stack

- [Vue](https://vuejs.org) and [Nuxt](https://nuxt.com) for frontend and backend
- [Tailwind CSS](tailwindcss.com) for styling
- [Firebase](https://firebase.google.com) for storage, database, and authentication
- [CloudWatch Events](https://aws.amazon.com/cloudwatch) for automated reminders

## Setup

This project uses Node.js with NPM or Yarn for project management. For authentication and
the database, we utilize Firebase Auth and Firestore with the Admin SDK.

Make sure to [generate a private key](https://firebase.google.com/docs/admin/setup#initialize-sdk)
file in Firebase that you can use for this project.

For sending email, we utilize Nodemailer with Gmail's SMTP support. You will need to provide
a Google [app password](https://support.google.com/accounts/answer/185833).

Run the following command to pull down the project dependencies.

```sh
$ yarn install # or npm install
```

Create a `.env` file using the `.env.example` template.

```sh
$ cp .env.example .env
$ vi .env # remember to press :wq to quit!
```

Run the project with the following command:

```sh
$ yarn run dev
```

## License

This project is licensed under the MIT License.

Copyright (c) 2023 Angelo Geulin, Mike Gester Sabuga, Eddie Jay Castuera, Marichelle Casbadillo, Mariel Elaine Lopez, Anne Clarisse Gonzales, Winchell Castillo
