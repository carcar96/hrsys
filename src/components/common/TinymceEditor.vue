<template>
  <div class="tinymce-editor">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    >
    </editor>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
// import "tinymce/themes/silver";
// // 编辑器插件plugins
// // 更多插件参考：https://www.tiny.cloud/docs/plugins/
// import "tinymce/plugins/image"; // 插入上传图片插件
// import "tinymce/plugins/media"; // 插入视频插件
// import "tinymce/plugins/table"; // 插入表格插件
// import "tinymce/plugins/lists"; // 列表插件
// import "tinymce/plugins/wordcount"; // 字数统计插件
// import "tinymce/skins/ui/oxide/skin.css";
// import "tinymce/icons/default/icons"; //解决了icons.js 报错Unexpected token '<'

export default {
  components: {
    Editor,
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    baseUrl: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table ",
    },
  },
  data() {
    const publicPath = process.env.BASE_URL;
    return {
      //初始化配置
      init: {
        language_url: `${publicPath}lib/tinymce/langs/zh_CN.js`,
        language: "zh_CN",
        skin_url: `${publicPath}lib/tinymce/skins/ui/oxide`,
        // skin_url: `https://cdn.jsdelivr.net/npm/tinymce@5.7.1/skins/ui/oxide`,
        content_css: `${publicPath}lib/tinymce/skins/content/default/content.min.css`,
        // content_css: `https://cdn.jsdelivr.net/npm/tinymce@5.7.1/skins/content/default/content.min.css`,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        },
      },
      myValue: this.value,
    };
  },
  mounted() {
    this.$tinymce.init({});
  },
  methods: {
    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    //需要什么事件可以自己增加
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    },
  },
  watch: {
    value(newValue) {
      console.log(newValue);
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
<style scoped>
</style>