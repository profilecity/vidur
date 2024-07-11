<template>
  <div class="px-4">
    <h2 class="text-lg text-zinc-800 font-bold font-noto">
      Create your first hook in minutes!
    </h2>
    <h4 class="text-md text-zinc-500 mb-2">
      Hooks are a way to send events to external systems via an API request.<br>
      Primary aim for this is to facilitate creation of custom plugins.
    </h4>
    <div class="flex w-full">
      <ul class="">
        <!-- List item -->
        <li class="relative py-2">
          <div class="flex items-center mb-1">
            <div class="absolute left-0 h-full w-0.5 bg-zinc-200 self-start ml-2.5 -tranzinc-x-1/2 tranzinc-y-3"
              aria-hidden="true"></div>
            <div class="absolute left-0 rounded-full bg-zinc-600" aria-hidden="true">
              <Icon name="mdi:number-1" class="w-5 h-5 fill-current text-white" />
            </div>
            <h3 class="text-base text-zinc-800 pl-6">Receive events via POST request.</h3>
          </div>
        </li>
        <!-- List item -->
        <li class="relative py-2">
          <div class="flex items-center mb-1">
            <div class="absolute left-0 h-full w-0.5 bg-zinc-200 self-start ml-2.5 -tranzinc-x-1/2 tranzinc-y-3"
              aria-hidden="true"></div>
            <div class="absolute left-0 rounded-full bg-zinc-600" aria-hidden="true">
              <Icon name="mdi:number-2" class="w-5 h-5 fill-current text-white" />
            </div>
            <h3 class="text-base text-zinc-800 pl-6">
              Validate authority using
              <a class="underline text-blue-500" href="https://atlas.thenirvanalabs.com/oauth2/jwks" target="_blank">
                this
              </a>
              JWKS-RSA key.
            </h3>
          </div>
        </li>
        <!-- List item -->
        <li class="relative py-2">
          <div class="flex items-center mb-1">
            <div class="absolute left-0 w-7 h-7 rounded-full bg-zinc-800" aria-hidden="true">
              <Icon name="mdi:number-3" class="w-5 h-5 fill-current text-white" />
            </div>
            <h3 class="text-base text-zinc-600 pl-6">Create custom actions!</h3>
          </div>
        </li>
      </ul>
    </div>
    <AdminIntegrationHooksNewAction input-label="Create First Hook" />
  </div>
</template>