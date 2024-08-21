<template>
  <div>
    <!-- Organization Settings -->
    <div class="px-4 space-y-6 w-full items-center mt-4" v-if="forms === 'general' || forms === 'all'">
      <section class="w-full md:w-1/3">
        <h2 class="text-base font-bold text-zinc-900 font-noto">Organization Settings</h2>
        <h4 class="text-sm mb-5 text-zinc-400">Configure career site's home page.</h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="flex items-end">
          <div class="mr-4">
            <img class="w-16 h-16 md:w-20 md:h-20 rounded-xl" :src="logoURL" width="80" height="80" alt="User upload" />
          </div>
          <AdminSettingsGeneralUpdateOrgLogo @update="logoUpdated" />
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="name">
              Organization Name <span class="text-xs ml-1 text-rose-500">{{ errors['organization.name'] }}</span>
            </label>
            <input class="input-custom" type="text" placeholder="Organization Name" v-model="organizationName">
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="location">
              Location <span class="text-xs ml-1 text-rose-500">{{ errors['organization.location'] }}</span>
            </label>
            <input id="location" class="input-custom" type="text" placeholder="Boston, MA" v-model="organizationLocation" />
          </div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="bio">
            Bio <span class="text-xs ml-1 text-rose-500">{{ errors['organization.bio'] }}</span>
          </label>
          <input type="text" class="input-custom" placeholder="Join us in building next generation space technology.." v-model="organizationBio" />
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="description">
            Description <span class="text-xs ml-1 text-rose-500">{{ errors['organization.description'] }}</span>
          </label>
          <Editor placeholder="We started as a group of mad scientists, curious about space..." v-model="organizationDescription" />
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="featured-links">
            Featured Links
          </label>
          <div v-for="(link, index) in organizationLinks" :key="index" class="flex space-x-2 mb-2 w-full">
            <input v-model="link.title" class="input-custom-vlen w-5/12" type="text" placeholder="Mars Mission Docs" />
            <input v-model="link.href" class="input-custom-vlen w-5/12" type="url" placeholder="https://big-space-tech.com/missions/mars" />
            <button class="btn-sm flex items-center space-x-2 w-1/12 text-red-500" @click="removeFeaturedLink(index)">
              <Icon name="mdi:minus" class="w-4 h-4" />
              Remove
            </button>
          </div>
          <div class="flex space-x-2 items-center">
            <button class="btn-sm flex items-center space-x-2" @click="organizationLinks?.push({ title: '', href: '' })">
              <Icon name="mdi:plus" class="w-5 h-5" />
              Add Link
            </button>
            <span class="text-sm text-rose-500">{{ errors[`organization.links`] }}</span>
          </div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="featured-links">
            Social Handles
          </label>
          <div v-for="(social, index) in organizationOverviewSocials" :key="index" class="flex space-x-2 mb-2 w-full">
            <AbstractSocialSelector v-model="social.handle"/>
            <input v-model="social.href" class="input-custom-vlen w-5/12" type="url" placeholder="https://big-space-tech.com/missions/mars" />
            <button class="btn-sm flex items-center space-x-2 w-1/12 text-red-500" @click="removeSocialHandle(index)">
              <Icon name="mdi:minus" class="w-4 h-4" />
              Remove
            </button>
          </div>
          <div class="flex space-x-2 items-center">
            <button class="btn-sm flex items-center space-x-2" @click="organizationOverviewSocials?.push({ handle: '', href: '' })">
              <Icon name="mdi:plus" class="w-5 h-5" />
              Add Handle
            </button>
            <span class="text-sm text-rose-500">{{ errors[`organization.overview.socials`] }}</span>
          </div>
        </div>
        <div class="md:flex gap-4 items-center mt-5">
          <div>
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="companySize">
              Company Size <span class="text-xs ml-1 text-rose-500">{{ errors['organization.overview.companySize'] }}</span>
            </label>
            <AbstractCompanySizeSelector v-model="organizationOverviewCompanySize"/>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="totalRaised">
              Total Raised <span class="text-xs ml-1 text-rose-500">{{ errors['organization.overview.totalRaised'] }}</span>
            </label>
            <input class="input-custom" type="text" placeholder="$220k Pre Seed" v-model="organizationOverviewTotalRaised" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto w-full" for="markets">
              Markets (CSV) <span class="text-xs ml-1 text-rose-500">{{ errors['organization.overview.markets'] }}</span>
            </label>
            <input class="input-custom" type="text" placeholder="space, astrology, humankind" v-model="organizationOverviewMarkets" />
          </div>
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <AbstractAsyncAction :is-loading="isSubmitting">
              <template #default="{ startAction }">
                <button class="btn btn-primary" @click="startAction(onSubmit)" :disabled="isSubmitting">
                 <span>
                  Save
                 </span> 
                </button>
              </template>
            </AbstractAsyncAction>
          </div>
        </footer>
      </section>
    </div>
    <div class="border-b my-8" v-if="forms === 'all'"></div>
    <!-- SEO Settings -->
    <div class="px-4 space-y-6 w-full items-center mt-4" v-if="forms === 'seo' || forms === 'all'">
      <section class="w-full md:w-1/3">
        <h2 class="text-base font-bold text-zinc-900 font-noto">SEO Settings</h2>
        <h4 class="text-sm mb-5 text-zinc-400">
          These settings help your website rank better and enable better device previews.
        </h4>
      </section>
      <section class="w-full md:w-2/3">
        <div class="md:flex gap-4 items-center mt-5">
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto" for="name">Website Title</label>
            <input class="input-custom" type="text" placeholder="Organization Name" v-model="seoTitle">
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.title'] }}</div>
          </div>
          <div class="w-full md:w-2/3">
            <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Website Description</label>
            <input class="input-custom" type="text" placeholder="We build space tech" v-model="seoDescription" />
            <div class="text-xs mt-1 text-rose-500">{{ errors['seo.description'] }}</div>
          </div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Facebook Share Image</label>
          <img class="w-24 h-24 md:w-32 md:h-32 rounded-xl" :src="seoFacebookShareImageURL" width="80" height="80" alt="Facebook Share Image">
          <AdminSettingsGeneralUpdateFacebookImage @update="facebookImageUpdated" />
          <div class="text-xs mt-1 text-rose-500">{{ errors['seo.facebookShareImage'] }}</div>
        </div>
        <div class="w-full mt-5">
          <label class="block text-sm font-medium mb-1 text-zinc-900 font-noto">Twitter Share Image</label>
          <img class="w-24 h-24 md:w-32 md:h-32 rounded-xl" :src="seoTwitterShareImageURL" width="80" height="80" alt="Twitter Share Image">
          <AdminSettingsGeneralUpdateTwitterImage @update="twitterImageUpdated" />
          <div class="text-xs mt-1 text-rose-500">{{ errors['seo.twitterShareImage'] }}</div>
        </div>
        <!-- Panel footer -->
        <footer>
          <div class="flex w-full justify-start mb-10 mt-4">
            <AbstractAsyncAction :is-loading="isSubmitting">
              <template #default="{ startAction }">
                <button class="btn btn-primary" @click="startAction(onSubmit)" :disabled="isSubmitting">
                 <span>
                  Save
                 </span> 
                </button>
              </template>
            </AbstractAsyncAction>
          </div>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AbstractAsyncAction from '@/components/AbstractAsyncAction.vue';
import AdminSettingsGeneralUpdateOrgLogo from '@/components/AdminSettingsGeneralUpdateOrgLogo.vue';
import Editor from '@/components/Editor.vue';
import AbstractSocialSelector from '@/components/AbstractSocialSelector.vue';
import AbstractCompanySizeSelector from '@/components/AbstractCompanySizeSelector.vue';
import Icon from '@mdi/vue/Icon';

const props = defineProps({
  forms: String,
  logoURL: String,
  seoTitle: String,
  seoDescription: String,
  seoFacebookShareImageURL: String,
  seoTwitterShareImageURL: String,
  organizationName: String,
  organizationLocation: String,
  organizationBio: String,
  organizationDescription: String,
  organizationLinks: Array,
  organizationOverviewSocials: Array,
  organizationOverviewCompanySize: String,
  organizationOverviewTotalRaised: String,
  organizationOverviewMarkets: String,
  errors: Object
});

const emit = defineEmits(['update']);

const isSubmitting = ref(false);

const organizationName = ref(props.organizationName);
const organizationLocation = ref(props.organizationLocation);
const organizationBio = ref(props.organizationBio);
const organizationDescription = ref(props.organizationDescription);
const organizationLinks = ref(props.organizationLinks);
const organizationOverviewSocials = ref(props.organizationOverviewSocials);
const organizationOverviewCompanySize = ref(props.organizationOverviewCompanySize);
const organizationOverviewTotalRaised = ref(props.organizationOverviewTotalRaised);
const organizationOverviewMarkets = ref(props.organizationOverviewMarkets);
const seoTitle = ref(props.seoTitle);
const seoDescription = ref(props.seoDescription);
const seoFacebookShareImageURL = ref(props.seoFacebookShareImageURL);
const seoTwitterShareImageURL = ref(props.seoTwitterShareImageURL);

function logoUpdated(newLogoURL) {
  emit('update', { logoURL: newLogoURL });
}

function facebookImageUpdated(newImageURL) {
  emit('update', { seoFacebookShareImageURL: newImageURL });
}

function twitterImageUpdated(newImageURL) {
  emit('update', { seoTwitterShareImageURL: newImageURL });
}

function removeFeaturedLink(index) {
  organizationLinks.value.splice(index, 1);
}

function removeSocialHandle(index) {
  organizationOverviewSocials.value.splice(index, 1);
}

function onSubmit() {
  // Your submission logic here
}

onMounted(() => {
  watch(props, (newProps) => {
    organizationName.value = newProps.organizationName;
    organizationLocation.value = newProps.organizationLocation;
    organizationBio.value = newProps.organizationBio;
    organizationDescription.value = newProps.organizationDescription;
    organizationLinks.value = newProps.organizationLinks;
    organizationOverviewSocials.value = newProps.organizationOverviewSocials;
    organizationOverviewCompanySize.value = newProps.organizationOverviewCompanySize;
    organizationOverviewTotalRaised.value = newProps.organizationOverviewTotalRaised;
    organizationOverviewMarkets.value = newProps.organizationOverviewMarkets;
    seoTitle.value = newProps.seoTitle;
    seoDescription.value = newProps.seoDescription;
    seoFacebookShareImageURL.value = newProps.seoFacebookShareImageURL;
    seoTwitterShareImageURL.value = newProps.seoTwitterShareImageURL;
  });
});
</script>

<style scoped>
/* Your CSS here */
</style>
