<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 hidden items-center justify-center bg-black/0 sm:flex">
      <div
        class="bg-dark-khaki-400 font-poppins relative flex h-50 w-100 flex-col items-center justify-center gap-6 rounded-lg text-white"
      >
        <h1 class="w-full text-center text-2xl font-semibold">
          Are you sure you want <br />
          to log out?
        </h1>
        <div class="flex w-full items-center justify-center gap-5">
          <button
            class="bg-dark-khaki-300 hover:bg-dark-khaki-500 rounded-lg px-12 py-4 text-xl transition duration-200"
          >
            Cancel
          </button>
          <button
            class="bg-dark-khaki-300 rounded-lg border-2 border-red-500/80 px-12 py-4 text-xl text-red-500/80 transition duration-200 hover:bg-red-800/10"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
