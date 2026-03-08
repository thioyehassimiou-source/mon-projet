<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
    <!-- Top Navigation Header -->
    <header class="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-primary/10 px-4 py-3 flex items-center justify-between">
      <button 
        @click="handleBack"
        class="flex items-center justify-center p-2 hover:bg-primary/5 rounded-full transition-colors"
      >
        <span class="material-symbols-outlined text-primary dark:text-slate-100">arrow_back</span>
      </button>
      <h1 class="text-lg font-bold text-primary dark:text-slate-100">Ajouter un logement</h1>
      <div class="w-10"></div> <!-- Spacer for centering title -->
    </header>

    <!-- Progress Stepper -->
    <div class="bg-white dark:bg-slate-900 px-4 py-6 border-b border-primary/5">
      <div class="flex items-center justify-between relative max-w-sm mx-auto">
        <!-- Progress Line Background -->
        <div class="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
        <!-- Progress Line Active -->
        <div 
          class="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
          :style="{ width: ((currentStep - 1) / 3 * 100) + '%' }"
        ></div>
        
        <!-- Steps -->
        <div v-for="step in 4" :key="step" class="relative z-10 flex flex-col items-center gap-1">
          <div 
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900 transition-all duration-300',
              currentStep >= step ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
            ]"
          >
            <span v-if="currentStep > step" class="material-symbols-outlined text-sm">check</span>
            <span v-else>{{ step }}</span>
          </div>
          <span 
            :class="[
              'text-[10px] font-semibold transition-colors duration-300',
              currentStep >= step ? 'text-primary' : 'text-slate-500'
            ]"
          >
            {{ stepLabels[step-1] }}
          </span>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="flex-1 p-4 max-w-md mx-auto w-full mb-40">
      <div class="space-y-8">
        <!-- Step Header -->
        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ currentStepTitle }}</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{{ currentStepSubtitle }}</p>
        </div>

        <!-- Step 1: Infos -->
        <div v-if="currentStep === 1" class="space-y-5">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Type de propriété</label>
            <div class="relative">
              <select 
                v-model="form.property_type"
                class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-all shadow-sm"
              >
                <option value="">Sélectionner un type</option>
                <option value="appartement">Appartement</option>
                <option value="maison">Maison / Villa</option>
                <option value="studio">Studio</option>
                <option value="bureau">Bureau</option>
                <option value="terrain">Terrain</option>
              </select>
              <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Titre de l'annonce</label>
            <input 
              v-model="form.title"
              class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm" 
              placeholder="Ex: Bel appartement moderne à Kaloum" 
              type="text"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
            <textarea 
              v-model="form.description"
              class="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none shadow-sm" 
              placeholder="Décrivez les atouts de votre logement..." 
              rows="4"
            ></textarea>
          </div>
          <div class="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <div class="flex items-start gap-3">
              <span class="material-symbols-outlined text-primary mt-0.5 text-xl">info</span>
              <p class="text-xs text-primary leading-relaxed">
                Un bon titre et une description claire augmentent vos chances de trouver un locataire rapidement.
              </p>
            </div>
          </div>
        </div>

        <!-- Step 2: Localisation -->
        <div v-if="currentStep === 2" class="space-y-5">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Ville</label>
            <div class="relative">
              <select 
                v-model="form.city"
                class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-all shadow-sm"
              >
                <option value="Conakry">Conakry</option>
                <option value="Kindia">Kindia</option>
                <option value="Labé">Labé</option>
                <option value="Kankan">Kankan</option>
                <option value="Nzérékoré">Nzérékoré</option>
              </select>
              <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Quartier</label>
            <input 
              v-model="form.neighborhood"
              class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm" 
              placeholder="Ex: Kipé, Kaloum, Lambanyi..." 
              type="text"
            />
          </div>
          <div class="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="absolute inset-0 grayscale opacity-40 bg-cover bg-center" style="background-image: url('https://w0.peakpx.com/wallpaper/32/984/HD-wallpaper-minimalist-map-conakry-guinea.jpg')"></div>
            <div class="relative z-10 flex flex-col items-center gap-2">
              <div class="bg-white/80 dark:bg-slate-900/80 p-3 rounded-full shadow-lg backdrop-blur-sm">
                <span class="material-symbols-outlined text-primary text-3xl">location_on</span>
              </div>
              <span class="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full backdrop-blur-sm">Aperçu Carte</span>
            </div>
          </div>
        </div>

        <!-- Step 3: Détails -->
        <div v-if="currentStep === 3" class="space-y-5">
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Prix mensuel (GNF)</label>
            <input 
              v-model.number="form.price"
              class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm" 
              placeholder="Ex: 2 500 000" 
              type="number"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Chambres</label>
              <input 
                v-model.number="form.bedrooms"
                class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm" 
                placeholder="0" 
                type="number"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Salles de bain</label>
              <input 
                v-model.number="form.bathrooms"
                class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm" 
                placeholder="0" 
                type="number"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Surface (m²)</label>
              <input 
                v-model.number="form.surface_area"
                class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm" 
                placeholder="Ex: 120" 
                type="number"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">État du bien</label>
              <div class="relative">
                <select 
                  v-model="form.status_bien"
                  class="w-full h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 focus:ring-2 focus:ring-primary focus:border-primary appearance-none transition-all shadow-sm"
                >
                  <option value="neuf">Neuf</option>
                  <option value="excellent">Excellent état</option>
                  <option value="renove">Rénové</option>
                  <option value="a_rafraichir">À rafraîchir</option>
                </select>
                <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Équipements</label>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <label 
                v-for="(val, key) in { furnished: 'Meublé', ac: 'Climatisé', parking: 'Parking' }" 
                :key="key"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                :class="form.amenities[key] ? 'border-primary/30 bg-primary/5' : ''"
              >
                <input v-model="form.amenities[key]" type="checkbox" class="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"/>
                <span class="text-xs font-bold">{{ val }}</span>
              </label>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Conditions (Caution, avance...)</label>
            <textarea 
              v-model="form.requirements"
              class="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none shadow-sm" 
              placeholder="Ex: 3 mois de caution, 1 mois d'avance..." 
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Step 4: Photos -->
        <div v-if="currentStep === 4" class="space-y-6">
          <div 
            @click="$refs.fileInput.click()"
            class="border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl p-8 text-center transition-all hover:bg-primary/10 group cursor-pointer shadow-sm focus-within:ring-2 focus-within:ring-primary/20"
          >
            <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileChange" />
            <div class="flex flex-col items-center">
              <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
              </div>
              <h4 class="text-lg font-bold mb-1">Ajouter des photos</h4>
              <p class="text-xs text-slate-500 leading-relaxed max-w-[200px] mx-auto">Min. 3 photos recommandées pour attirer plus de locataires.</p>
            </div>
          </div>

          <div v-if="previews.length > 0" class="grid grid-cols-2 gap-3 pb-4">
            <div v-for="(src, idx) in previews" :key="idx" class="aspect-square bg-slate-100 rounded-2xl relative overflow-hidden group shadow-sm">
              <img :src="src" class="w-full h-full object-cover" />
              <button @click.stop="removePhoto(idx)" class="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div 
              @click="$refs.fileInput.click()"
              class="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <span class="material-symbols-outlined text-slate-400 text-3xl">add_a_photo</span>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl text-center font-bold text-sm">
          {{ error }}
        </div>
      </div>
    </main>

    <!-- Bottom Action & Navigation Bar -->
    <div class="fixed bottom-0 left-0 right-0 z-50">
      <!-- Next Button Container -->
      <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-4 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <button 
          @click="handleNext"
          :disabled="isSubmitting"
          class="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <span v-if="isSubmitting" class="animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></span>
          <span v-else>{{ currentStep === 4 ? 'Publier l\'annonce' : 'Suivant' }}</span>
          <span v-if="!isSubmitting" class="material-symbols-outlined">{{ currentStep === 4 ? 'publish' : 'arrow_forward' }}</span>
        </button>
      </div>

      <!-- Bottom Tab Bar -->
      <nav class="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pb-2 pt-2 flex justify-between items-center">
        <router-link to="/" class="flex flex-col items-center gap-1 flex-1 py-1 text-slate-400">
          <span class="material-symbols-outlined">home</span>
          <span class="text-[10px] font-medium">Accueil</span>
        </router-link>
        <router-link to="/listings" class="flex flex-col items-center gap-1 flex-1 py-1 text-slate-400">
          <span class="material-symbols-outlined">list_alt</span>
          <span class="text-[10px] font-medium">Mes Biens</span>
        </router-link>
        <div class="flex flex-col items-center gap-1 flex-1 py-1 text-primary">
          <div class="bg-primary/10 rounded-full p-2 mb-[-4px]">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">add_circle</span>
          </div>
          <span class="text-[10px] font-bold">Ajouter</span>
        </div>
        <router-link to="/messages" class="flex flex-col items-center gap-1 flex-1 py-1 text-slate-400">
          <span class="material-symbols-outlined">chat_bubble</span>
          <span class="text-[10px] font-medium">Messages</span>
        </router-link>
        <router-link to="/mon-profil" class="flex flex-col items-center gap-1 flex-1 py-1 text-slate-400">
          <span class="material-symbols-outlined">person</span>
          <span class="text-[10px] font-medium">Profil</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useListingsStore } from '@/stores/listings';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const listingsStore = useListingsStore();
const authStore = useAuthStore();

const currentStep = ref(1);
const isSubmitting = ref(false);
const error = ref('');
const fileInput = ref(null);
const previews = ref([]);
const photos = ref([]);

const stepLabels = ['Infos', 'Localisation', 'Détails', 'Photos'];

const currentStepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Infos de base';
    case 2: return 'Localisation';
    case 3: return 'Détails & Prix';
    case 4: return 'Photos';
    default: return '';
  }
});

const currentStepSubtitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Commencez par les informations essentielles de votre propriété.';
    case 2: return 'Où se situe votre bien ?';
    case 3: return 'Renseignez les caractéristiques et le prix.';
    case 4: return 'Une belle photo attire plus de locataires.';
    default: return '';
  }
});

const form = reactive({
  title: '',
  description: '',
  requirements: '',
  price: null,
  property_type: '',
  status_bien: 'neuf',
  city: 'Conakry',
  neighborhood: '',
  bedrooms: null,
  bathrooms: null,
  surface_area: null,
  amenities: {
    furnished: false,
    ac: false,
    parking: false
  }
});

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    photos.value.push(file);
    const reader = new FileReader();
    reader.onload = (ev) => previews.value.push(ev.target.result);
    reader.readAsDataURL(file);
  });
};

const removePhoto = (idx) => {
  photos.value.splice(idx, 1);
  previews.value.splice(idx, 1);
};

const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    router.back();
  }
};

const validateStep = () => {
  error.value = '';
  if (currentStep.value === 1) {
    if (!form.property_type) return 'Veuillez choisir un type de propriété.';
    if (!form.title) return 'Un titre est requis.';
    if (form.title.length < 10) return 'Le titre doit faire au moins 10 caractères.';
  }
  if (currentStep.value === 2) {
    if (!form.neighborhood) return 'Veuillez préciser le quartier.';
  }
  if (currentStep.value === 3) {
    if (!form.price || form.price <= 0) return 'Le prix doit être supérieur à 0.';
  }
  return null;
};

const handleNext = () => {
  const validationError = validateStep();
  if (validationError) {
    error.value = validationError;
    return;
  }

  if (currentStep.value < 4) {
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    handleSubmit();
  }
};

const handleSubmit = async () => {
  if (photos.value.length < 1) {
    error.value = 'Veuillez ajouter au moins une photo.';
    return;
  }

  isSubmitting.value = true;
  error.value = '';

  try {
    const payload = {
      titre: form.title,
      description: form.description,
      price: form.price,
      localisation: `${form.neighborhood}, ${form.city}`,
      exigences: {
        type: form.property_type,
        chambres: form.bedrooms,
        salles_de_bain: form.bathrooms,
        surface: form.surface_area,
        conditions: form.requirements,
        amenities: form.amenities
      },
      owner_id: authStore.user?.id,
      images: previews.value.length > 0 ? previews.value : ['https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
    };

    const result = await listingsStore.createNewListing(payload);
    
    if (result.success) {
      router.push('/mon-profil');
    } else {
      error.value = result.error || 'Une erreur est survenue';
    }
  } catch (err) {
    error.value = 'Erreur lors de la publication';
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
