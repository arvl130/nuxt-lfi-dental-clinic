<template>
  <!-- Footer -->
  <footer
    id="footer"
    class="h-full py-6 pt-16 mb-10 bg-white border md:mb-0 mt-50 sm:p-6 border-t-sky-700"
    style="background-color: rgba(20, 184, 166, 0.4)"
  >
    <div class="md:flex md:justify-center md:items-center">
      <div class="">
        <a href="#">
          <div>
            <img
              src="~/assets/img/lfi-logo-transparent.png"
              class="w-24 h-24 px-1 mx-auto"
            />
          </div>
          <div
            class="px-5 mb-10 text-2xl font-bold text-center md:mb-0 text-sky-700"
          >
            LFI Dental Clinic
          </div>
        </a>
      </div>

      <div
        class="grid grid-cols-1 gap-8 sm:ml-20 sm:mr-20 sm:gap-20 sm:grid-cols-3 sm:justify-items-center"
      >
        <div class="text-center">
          <h2
            class="mb-4 text-lg font-bold uppercase text-sky-700 lg:text-left"
          >
            Services
          </h2>
          <ul class="text-center text-gray-600 md:text-left dark:text-gray-400">
            <li class="font-semibold text-sky-700">Whitening</li>
            <li class="font-semibold text-sky-700">Oral Prophylaxis</li>
            <li class="font-semibold text-sky-700">Tooth Restoration</li>
            <li class="font-semibold text-sky-700">Flouride Treatment</li>
            <li class="font-semibold text-sky-700">Orthodontic Braces</li>
            <li class="font-semibold text-sky-700">Complete Denture</li>
            <li class="font-semibold text-sky-700">Tooth Extraction</li>
            <li class="font-semibold text-sky-700">Partial Denture</li>
            <li class="font-semibold text-sky-700">Jacket Crown</li>
            <li class="font-semibold text-sky-700">Fixed Bridge</li>
          </ul>
        </div>

        <div class="justify-center text-center">
          <h2
            class="mb-4 text-lg font-bold uppercase text-sky-700 lg:text-left"
          >
            Quick Links
          </h2>
          <ul class="text-center text-gray-600 md:text-left">
            <li>
              <a href="/" class="font-semibold hover:underline text-sky-700"
                >Home</a
              >
            </li>

            <li>
              <NuxtLink
                to="/services"
                class="font-semibold hover:underline text-sky-700"
              >
                Dental Services
              </NuxtLink>
            </li>
            <li>
              <a
                href="/Appointments"
                class="font-semibold hover:underline text-sky-700"
                >Appointments</a
              >
            </li>
            <li>
              <a
                href="/About"
                class="font-semibold hover:underline text-sky-700"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="/Contact"
                class="font-semibold hover:underline text-sky-700"
                >Contact Us</a
              >
            </li>
            <li>
              <a
                href="/accountsettings"
                class="font-semibold hover:underline text-sky-700"
                >My Account</a
              >
            </li>
            <li>
              <NuxtLink
                to="/faqs"
                class="font-semibold hover:underline text-sky-700"
              >
                FAQs
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="justify-center pb-5 text-center">
          <h2
            class="mb-4 text-lg font-bold uppercase text-sky-700 lg:text-left"
          >
            Stay CONNECTED
          </h2>

          <ul
            class="flex items-center justify-center text-center text-gray-600 dark:text-gray-400"
          >
            <a
              target="_blank"
              href="https://www.facebook.com/profile.php?id=100087848344472"
              class="p-1 border border-transparent text-sky-700 hover:border hover:border-sky-700 hover:rounded-full hover:text-sky-700 dark:hover:text-white"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Facebook page</span>
            </a>
            <NuxtLink
              to="/contact"
              class="p-1 text-sky-700 hover:border hover:border-sky-700 hover:rounded-full hover:text-sky-700 dark:hover:text-white"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                ></path>
              </svg>
              <span class="sr-only">Book an Appointment Now!</span>
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="p-1 text-sky-700 hover:border hover:border-sky-700 hover:rounded-full hover:text-sky-700 dark:hover:text-white"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                ></path>
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                ></path>
              </svg>
              <span class="sr-only">Email</span>
            </NuxtLink>
          </ul>
        </div>
      </div>
    </div>
    <hr class="my-4 border-sky-700 sm:mx-auto dark:border-sky-700 lg:mt-10" />

    <div class="flex items-center justify-center p-2 mx-0">
      <span
        class="text-sm font-semibold text-center text-gray-500 dark:text-gray-400"
        >© 2022.
        <NuxtLink to="/" class="font-semibold hover:underline text-sky-700">
          LFI Dental Clinic</NuxtLink
        >.
        <div>All Rights Reserved.</div>
      </span>
      <span class="sticky right-0 bottom-64 lg:right-10 md:right-10">
        <BackToTop class="flex bottom-64">
          <button
            type="button"
            class="text-sky-700 border z-10 sticky bottom-64 mb-8 -mr-5 justify-end border-sky-700 hover:bg-gradient-to-br from-sky-700 to-teal-500 hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center items-center md:-mb-4 md:mr-2"
          >
            <NuxtLink to="/" class="font-semibold hover:underline text-sky-700">
            </NuxtLink>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Go to top button</span>
          </button>
        </BackToTop>
      </span>
    </div>
  </footer>
  <!-- End of Footer -->
</template>
