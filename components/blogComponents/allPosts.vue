<script setup lang="ts">
const blog = useBlog();
let idPost = ref();
let searchInput = ref("");
const idPostStorage = parseInt(useCookie("idPost").value || "0", 10);
async function handleGetId(id: number | string) {
  idPost.value = id;
  useCookie("idPost").value = idPost.value;
}
if (searchInput.value == "" || searchInput.value.length <= 2) {
  blog.getStrapiData();
} else {
  blog.posts = [];
  blog.getPostByHashtag(searchInput.value);
}
function handleSearchInput() {
  if (searchInput.value.trim() === "") {
    blog.getStrapiData();
  } else {
    blog.getPostByHashtag(searchInput.value.trim());
  }
}

onMounted(() => {
  blog.getPostById(idPostStorage);
});
// Я сделал debounce КЛЯНУСЬ!!! НО ПОТОМ Я УВИДЕЛ ЧТО ОН УБИРАЕТ МНЕ ПЛАВНУЮ АНИМАЦИЮ И Я РЕШИЛ УБРАТЬ ЕГО!!!!
</script>
<template v-auto-animate>
  <div>
    <div class="p-10">
      <div class="flex flex-wrap justify-between items-center">
        <h2 class="text-3xl font-bold md:mb-0 sm:mb-8 dark:text-ghostWhiteText">
          Все статьи
        </h2>

        <div class="relative">
          <img src="/search.svg" class="absolute left-3 top-3" alt="" />
          <input
            type="text"
            placeholder="Поиск по хэштегу"
            class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 dark:border-none dark:bg-mainDark dark:text-ghostWhiteText"
            v-model="searchInput"
            @input="handleSearchInput"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div
        class="flex gap-3 flex-row flex-wrap p-2 mt-5 max-w-[80%] justify-center"
      >
        <div
          v-for="(post, index) in blog.posts"
          :key="index"
          class="flex gap-2 flex-row flex-wrap"
        >
          <div
            v-for="(hashtag, index) in post.attributes.hashtags.data.slice()"
            :key="index"
          >
            <p
              class="text-black text-sm font-medium bg-[#f8f32a] p-2 rounded-lg"
            >
              {{ hashtag.attributes.hashtagName }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="p-5">
      <div
        v-if="blog.posts && blog.posts.length > 0"
        class="flex w-full flex-row gap-5 flex-wrap md:justify-start sm:justify-center mt-5 m-auto"
        v-auto-animate
      >
        <div v-for="(post, index) in blog.posts" :key="index">
          <NuxtLink
            to="/post"
            @click="handleGetId(post.id), blog.getPostById(post.id)"
          >
            <firstPostComponent
              v-if="index == 0"
              :titleCover="post.attributes.titleToCover"
              :coverImage="post.attributes.coverImage.data.attributes.url"
              :shortDescription="post.attributes.shortDescriptionCover"
              :hashtags="
              post.attributes.hashtags.data.map(
                (hashtag: any) => hashtag.attributes.hashtagName
              )
            "
              @click.native="handleGetId(post.id)"
            />

            <coverTemplate
              v-else
              :titleCover="post.attributes.titleToCover"
              :coverImage="post.attributes.coverImage.data.attributes.url"
              :shortDescription="post.attributes.shortDescriptionCover"
              :hashtags="
              post.attributes.hashtags.data.map(
                (hashtag: any) => hashtag.attributes.hashtagName
              )
            "
              @click.native="handleGetId(post.id)"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
