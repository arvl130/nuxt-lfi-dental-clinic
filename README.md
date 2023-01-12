# Clinic Management System for LFI Dental Clinic using Nuxt

This is a project I've been working on to help our team iterate faster in
developing this website.

There are two main reasons why I've decided to go with [Nuxt](https://nuxt.com/)
for this experiment:

1. The original project is built with Vue.

2. It supports both the frontend and backend functionality of the website through
   its `/pages` and `/server` directories, respectively.

3. There is built-in support for Typescript, which is important for any
   large-scale project.

Currently, only the backend REST API has been implemented here. The original site is
already using this new backend REST API, but there is still a lot of work that needs
to be done in order to also migrate the frontend.

As always, this is free software. Anyone is free to inspect, copy, and modify the code
that is published here. See the sections below for more information on the licensing and
how to setup this project.

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

```
Copyright 2023 Angelo Geulin

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
