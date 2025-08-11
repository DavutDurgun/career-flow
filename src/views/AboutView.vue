<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {{ $t("about.title") }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t("about.description") }}
        </p>
      </div>

      <!-- Mission & Vision -->
      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ $t("about.mission.title") }}
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ $t("about.mission.description") }}
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
              {{ $t("about.vision.title") }}
            </h2>
          </div>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ $t("about.vision.description") }}
          </p>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-16">
        <h2
          class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
        >
          {{ $t("about.whyUs.title") }}
        </h2>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ $t("about.features.quality.title") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t("about.features.quality.description") }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ $t("about.features.matching.title") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t("about.features.matching.description") }}
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {{ $t("about.features.userFriendly.title") }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ $t("about.features.userFriendly.description") }}
            </p>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm mb-16">
        <h2
          class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8"
        >
          {{ $t("about.stats.title") }}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div
              class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
            >
              10K+
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("about.stats.activeJobs") }}
            </div>
          </div>
          <div>
            <div
              class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
            >
              50K+
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("about.stats.registeredUsers") }}
            </div>
          </div>
          <div>
            <div
              class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
            >
              2K+
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("about.stats.partnerCompanies") }}
            </div>
          </div>
          <div>
            <div
              class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2"
            >
              95%
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              {{ $t("about.stats.satisfactionRate") }}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div
        class="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white"
      >
        <h2 class="text-3xl font-bold mb-4">
          {{ $t("about.cta.title") }}
        </h2>
        <p class="text-xl mb-6 opacity-90">
          {{ $t("about.cta.description") }}
        </p>

        <router-link
          to="/jobs"
          class="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {{ $t("about.cta.button") }}
        </router-link>
      </div>
    </div>
  </div>
</template>
