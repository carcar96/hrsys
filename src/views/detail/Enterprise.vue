<template>
  <el-page-header @back="goBack" content="企业详情"> </el-page-header>
  <div id="detail-enterprise" class="detail-enterprise">
    <div class="header">
      <el-row :gutter="20">
        <el-col :md="24" :lg="12"
          ><h1 class="company">武汉天马微电子有限公司</h1>
          <h4 class="nickname">简称：天马</h4></el-col
        >
        <el-col :md="24" :lg="12"
          ><el-carousel :interval="4000" type="card" height="100px">
            <el-carousel-item v-for="item in 6" :key="item">
              <img src="../../assets/images/bg.jpg" />
            </el-carousel-item> </el-carousel
        ></el-col>
      </el-row>
    </div>
    <div class="templete">
      <h3 class="title">短信模板</h3>
      <p>
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      </p>
    </div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: `<p>科大讯飞股份有限公司成立于1999年，在语音合成、语音识别、口语评测、语言翻译、人脸识别、自然语言处理等智能语音与人工智能核心技术处于国际前沿水平。2008年在深圳证券交易所挂牌上市，股票代码：002230。科大讯飞是我国目前以语音技术为产业化方向的“国家863计划成果产业化基地”、“国家规划布局内重点软件企业”、“国家高技术产业化示范工程”，并被原信息产业部确定为中文语音交互技术标准工作组组长单位，牵头制定中文语音技术标准。科大讯飞入选首批国家新一代人工智能开放创新平台，明确依托公司建设智能语音国家新一代人工智能开放创新平台。“国家智能语音高新技术产业化基地”、“语音及语言信息处理国家工程实验室”先后落户公司，有利于进一步汇聚资源，提升科大讯飞产业龙头地位。</p><br/>
      <h3>职位信息</h3>
      <br/>
<p>职责描述：</p>
<br/>
<p>1、负责产品需求分析、负责WEB前端技术架构、前端界面构建与实现；</p><br/>
<p>2、负责PC端/小程序的开发工作，能独立搭建系统框架，配合后台人员完成功能开发；</p><br/>
<p>3、参与平台项目产品设计与需求分析，给出优化的前端技术解决方案；</p><br/>
<p>4、编写相关技术设计文档与技术规范，参与公司技术管理工作。</p>`,
    };
  },
  created() {
    console.log("id", this.$route.params.id);
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-page-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 0 3px #ddd;
}
.detail-enterprise {
  padding: 20px;
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 80px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .company {
    font-size: 36px;
  }
  .nickname {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .templete {
    width: 60%;
    margin-top: 16px;
    margin-bottom: 24px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 8px 12px;
    .title {
      font-size: 20px;
      margin-bottom: 6px;
    }
  }
  .content {
    font-size: 14px;
  }
}
</style>