<template>
  <div id="upload-image">
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :file-list="fileList"
      :on-change="handleChange"
    >
      <template #default>
        <i class="el-icon-plus"></i>
      </template>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file, fileList)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img :src="dialogImageUrl" alt="preview" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["files"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  beforeMount() {
    console.log(this.files, this.fileList);
    this.fileList = this.files;
  },
  watch: {
    files(newData) {
      console.log(newData);
      this.fileList = newData || [];
    },
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList.filter((item) => item.url != file.url);
      this.$emit("update", this.fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      console.log(file, fileList);
      this.$emit("update", fileList);
    },
  },
};
</script>

<style lang="scss">
#upload-image {
  .el-upload-list__item {
    transition: none !important;
  }
  .el-dialog__body {
    text-align: center;
    img {
      width: auto;
      max-width: 100%;
    }
  }
}
</style>