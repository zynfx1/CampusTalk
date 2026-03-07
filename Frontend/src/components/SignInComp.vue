<template>
  <Teleport to="body">
    <div class="bg-dark-khaki-300 font-poppins fixed min-h-screen max-w-full rounded-xl">
      <div class="my-5 flex w-full flex-col items-center justify-center">
        <img src="../assets/img/logo4.png" alt="" class="w-3/9" />
        <p class="text-gray-800/50">Drop your campus experience.</p>
      </div>
      <div class="flex w-full flex-col items-center justify-center gap-5">
        <input
          class="h-15 w-100 rounded-xl border-2 border-black/10 px-10 shadow-lg shadow-black/15 focus:border-sky-500/50 focus:outline-none"
          type="text"
          placeholder="Email"
        />
        <input
          class="h-15 w-100 rounded-xl border-2 border-black/10 px-10 shadow-lg shadow-black/15 focus:border-sky-500/50 focus:outline-none"
          type="text"
          placeholder="Password"
        />
        <button class="bg-jungle-green-900 h-15 w-100 rounded-xl text-white">Sign In</button>
      </div>
    </div>
  </Teleport>
</template>
