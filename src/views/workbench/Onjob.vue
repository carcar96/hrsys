<template>
  <div id="onjob" class="onjob">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :rules="searchRule"
          :hide-required-asterisk="true"
          ref="searchForm"
        >
          <ul>
            <li>
              <el-form-item label="姓名" prop="username">
                <el-input
                  size="medium"
                  placeholder="请输入姓名"
                  v-model="searchForm.username"
                  style="width: 120px"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                <el-input
                  size="medium"
                  placeholder="请输入手机号"
                  v-model="searchForm.phone"
                  style="width: 120px"
                ></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idcard">
                <el-input
                  size="medium"
                  placeholder="请输入身份证号"
                  v-model="searchForm.idcard"
                  style="width: 200px"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select
                  v-model="searchForm.sex"
                  placeholder="请选择"
                  style="width: 100px"
                >
                  <el-option label="全部" value="0"> </el-option>
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="微信号" prop="wx">
                <el-select
                  v-model="searchForm.wx"
                  placeholder="请选择"
                  style="width: 120px"
                >
                  <el-option label="全部" value="0"> </el-option>
                  <el-option
                    v-for="item in wxOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="在职企业" prop="company">
                <el-input
                  size="medium"
                  placeholder="请输入企业名称"
                  v-model="searchForm.company"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
              <el-form-item label="在职情况" prop="condition">
                <el-select
                  v-model="searchForm.condition"
                  placeholder="请选择"
                  style="width: 120px"
                >
                  <el-option label="全部" value="0"> </el-option>
                  <el-option
                    v-for="item in situateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="对接盟友" prop="dock_ally">
                <el-select
                  v-model="searchForm.dock_ally"
                  placeholder="请选择对接盟友"
                  style="width: 150px"
                >
                  <el-option label="全部" value="0"> </el-option>
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="对接渠道" prop="dock_channel">
                <el-select
                  v-model="searchForm.dock_channel"
                  placeholder="请选择对接渠道"
                  style="width: 150px"
                >
                  <el-option label="全部" value="0"> </el-option>
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="面试时间" prop="date">
                <el-date-picker
                  v-model="searchForm.date"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  :clearable="false"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 360px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="用工模式" prop="mode">
                <el-select
                  v-model="searchForm.mode"
                  placeholder="请选择用工模式"
                  style="width: 110px"
                >
                  <el-option label="全部" value="0"></el-option>
                  <el-option
                    v-for="item in workmodeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="合同" prop="contract">
                <el-select
                  v-model="searchForm.contract"
                  placeholder="请选择"
                  style="width: 100px"
                >
                  <el-option label="全部" value="0"> </el-option>
                  <el-option
                    v-for="item in contractOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="银行卡" prop="bankcard">
                <el-select
                  v-model="searchForm.bankcard"
                  placeholder="请选择"
                  style="width: 120px"
                >
                  <el-option
                    v-for="item in bankcardOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  @click="submitForm('searchForm')"
                  >搜索</el-button
                >
                <el-button
                  type="warning"
                  size="medium"
                  @click="resetForm('searchForm')"
                  >重置</el-button
                >
              </el-form-item>
            </li>
          </ul>
        </el-form>
      </el-header>
      <el-main class="table-box">
        <el-container>
          <el-header height="auto;" class="table-title">
            <el-divider style="margin: 0"></el-divider>
            <el-space wrap>
              <div class="item" v-for="(item, index) in hList" :key="index">
                <div class="cont">
                  <p class="num">{{ item.num }}</p>
                  <p class="type">{{ item.label }}</p>
                </div>
              </div>
            </el-space>
          </el-header>
          <el-main>
            <el-table
              :data="tableData"
              style="width: 100%"
              height="100%"
              border
              :header-cell-style="{ backgroundColor: '#F7F7F7' }"
              :cell-style="setCellColor"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                type="index"
                width="54"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="date"
                label="入职时间"
                width="101"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="75"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="age"
                label="性别"
                width="75"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeSex(scope.row.sex) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="age"
                label="年龄"
                width="75"
                sortable
                align="center"
              >
                <template #default="scope">
                  <span>{{ scope.row.age }}岁</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contact"
                label="联系方式"
                width="105"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="idcard"
                label="身份证号"
                width="120"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="company"
                label="在职企业"
                width="101"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="dock_ally"
                label="对接盟友"
                width="101"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="dock_channel"
                label="对接渠道"
                width="101"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="mode"
                label="用工模式"
                width="101"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeMode(scope.row.mode) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="workdays"
                label="在职时间"
                width="101"
                sortable
                align="center"
              >
                <template #default="scope">
                  <span>{{ scope.row.workdays }}天</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="contract"
                label="合同"
                width="101"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeContract(scope.row.contract) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="bankcard"
                label="银行卡"
                width="90"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="在职情况"
                width="101"
                sortable
                align="center"
              >
                <template #default="scope">
                  {{ computeSituate(scope.row.situation) }}
                </template>
              </el-table-column>

              <el-table-column
                prop="staff"
                label="驻厂人员"
                width="101"
                sortable
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="routine"
                label="专员例访"
                width="101"
                sortable
                align="center"
              >
                <template #default="scope">
                  <span>{{ scope.row.routine || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="跟进动态"
                width="101"
                sortable
                align="center"
              >
                <template #default="scope">
                  <el-button
                    @click="handleFollow(scope.$index, scope.row)"
                    type="text"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column prop="note" label="备注" sortable align="center">
                <template #default="scope">
                  <span>{{ scope.row.note || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="120" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleDelete(scope.$index, scope.row)"
                      type="text"
                      >删除</el-button
                    >
                    <el-button
                      @click="handleEdit(scope.$index, scope.row)"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      @click="handleOperate(scope.$index, scope.row)"
                      type="text"
                      v-if="
                        scope.row.status == 1 ||
                        scope.row.status == 2 ||
                        scope.row.status == 4 ||
                        scope.row.status == 5
                      "
                    >
                      <span v-if="scope.row.status == 1">完成到厂</span>
                      <span v-else-if="scope.row.status == 2">安排面试</span>
                      <span v-else-if="scope.row.status == 4">安排入职</span>
                      <span v-else-if="scope.row.status == 5">完成入职</span>
                    </el-button>
                  </el-space>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer height="auto;">
            <el-pagination
              class="table-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              :hide-on-single-page="hideOnSinglePage"
            >
            </el-pagination>
          </el-footer>
        </el-container>
      </el-main>
    </el-container>
    <!-- 跟进动态 -->
    <Follow :isShow="showFollow" :info="followUser" @close="closeFollow" />
    <!-- 编辑 -->
    <el-dialog
      title="用户信息"
      v-model="editDialogVisible"
      width="600px"
      @closed="closeEdit('editForm')"
    >
      <el-form
        :model="editForm"
        :rules="editRule"
        ref="editForm"
        label-width="auto"
        size="small"
        class="edit-form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact">
          <el-input v-model="editForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择性别">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wx">
          <el-input v-model="editForm.wx"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idcard">
          <el-input v-model="editForm.idcard"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="editForm.education"></el-input>
        </el-form-item>
        <el-form-item label="在职状态" prop="situation">
          <el-select v-model="editForm.situation" placeholder="请选择在职状态">
            <el-option
              v-for="item in situateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="在职企业" prop="company">
          <el-select v-model="editForm.company" placeholder="请选择面试企业">
            <el-option label="华为" value="1"></el-option>
            <el-option label="阿里" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合作关系" prop="partnership">
          <el-radio v-model="editForm.partnership" label="1">盟友</el-radio>
          <el-radio v-model="editForm.partnership" label="2">渠道</el-radio>
          <p style="font-size: 12px">
            （盟友：劳务工是下游盟友给我们提供的；
            渠道：劳务工是我们给上游人力资源提供）
          </p>
        </el-form-item>
        <el-form-item
          label="对接盟友"
          prop="dock_ally"
          v-show="editForm.partnership == 1"
        >
          <el-select v-model="editForm.dock_ally" placeholder="请选择对接盟友">
            <el-option label="汇睿" value="汇睿"></el-option>
            <el-option label="大众行" value="大众行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="对接渠道"
          prop="dock_channel"
          v-show="editForm.partnership == 2"
        >
          <el-select
            v-model="editForm.dock_channel"
            placeholder="请选择对接渠道"
          >
            <el-option label="汇睿" value="汇睿"></el-option>
            <el-option label="大众行" value="大众行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驻厂人员" prop="staff">
          <el-select v-model="editForm.staff" placeholder="请选择驻厂人员">
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用工模式" prop="mode">
          <el-select v-model="editForm.mode" placeholder="请选择用工模式">
            <el-option
              v-for="item in workmodeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专员例访">
          <el-input
            type="textarea"
            :rows="2"
            show-word-limit
            v-model="editForm.routine"
          ></el-input>
        </el-form-item>
        <el-form-item label="最新沟通">
          <el-input
            type="textarea"
            :rows="2"
            maxlength="50"
            show-word-limit
            v-model="editForm.lastest"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="2"
            maxlength="200"
            show-word-limit
            v-model="editForm.note"
          ></el-input>
        </el-form-item>
        <div
          style="
            background-color: #f5f5f5;
            padding-top: 18px;
            padding-bottom: 1px;
            border-radius: 2px;
          "
        >
          <el-form-item label="合同" prop="contract">
            <el-select v-model="editForm.contract" placeholder="请选择合同状态">
              <el-option
                v-for="item in contractOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="editForm.bankcard"></el-input>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <el-form-item label="同事协作">
          <el-select
            v-model="editForm.partner"
            placeholder="请选择协作同事"
            filterable
          >
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitEditForm('editForm')"
            >确 定</el-button
          >
          <el-button type="warning" @click="submitQuit('editForm')"
            >离职</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  sexOptions,
  wxOptions,
  workmodeOptions,
  entryOptions,
  situateOptions,
  contractOptions,
} from "@/assets/js/dropdown.js";
import Follow from "@/components/dialog/Follow.vue";
export default {
  components: {
    Follow,
  },
  data() {
    const validateDockAlly = (rule, value, callback) => {
      if (this.editForm.partnership == 1 && !value) {
        callback(new Error("请选择对接盟友"));
      } else {
        callback();
      }
    };
    const validateDockChannel = (rule, value, callback) => {
      if (this.editForm.partnership == 2 && !value) {
        callback(new Error("请选择对接渠道"));
      } else {
        callback();
      }
    };
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "吴宣仪",
          sex: "2",
          age: "18",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "已有同事跟进",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "华为",
          partnership: "1",
          dock_ally: "大众行",
          dock_channel: "",
          mode: "1",
          staff: "张三",
          status: "6",
          workdays: "365",
          contract: "1",
          bankcard: "6226263658971412",
          situation: "1",
          routine: "环境不满意",
        },
        {
          date: "2016-05-03",
          name: "吴仪",
          sex: "2",
          age: "18",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "已有同事跟进",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "华为",
          partnership: "2",
          dock_ally: "",
          dock_channel: "大众行",
          mode: "2",
          staff: "张三",
          status: "6",
          workdays: "165",
          contract: "1",
          bankcard: "6226263658971412",
          situation: "1",
          routine: "",
        },
        {
          date: "2016-05-03",
          name: "吴宣",
          sex: "2",
          age: "18",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "已有同事跟进",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "华为",
          partnership: "1",
          dock_ally: "大众行",
          dock_channel: "",
          mode: "3",
          staff: "张三",
          status: "6",
          workdays: "122",
          contract: "2",
          bankcard: "6226263658971412",
          situation: "1",
          routine: "身高不合格",
        },
        {
          date: "2016-05-03",
          name: "宣仪",
          sex: "1",
          age: "18",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "已有同事跟进",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "腾讯",
          partnership: "2",
          dock_ally: "",
          dock_channel: "大众行",
          mode: "1",
          staff: "李四",
          status: "6",
          workdays: "122",
          contract: "2",
          bankcard: "6226263658971412",
          situation: "2",
          routine: "肢体不协调",
        },
        {
          date: "2016-05-03",
          name: "吴发",
          sex: "1",
          age: "28",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "华为",
          partnership: "1",
          dock_ally: "大众行",
          dock_channel: "",
          mode: "1",
          staff: "张三",
          status: "6",
          workdays: "122",
          contract: "2",
          bankcard: "6226263658971412",
          situation: "3",
          routine: "",
        },
        {
          date: "2016-05-03",
          name: "吴宣仪",
          sex: "2",
          age: "18",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "已有同事跟进",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "华为",
          partnership: "1",
          dock_ally: "大众行",
          dock_channel: "",
          mode: "1",
          staff: "张三",
          status: "6",
          workdays: "122",
          contract: "1",
          bankcard: "6226263658971412",
          situation: "2",
          routine: "",
        },
        {
          date: "2016-05-03",
          name: "吴宣仪",
          sex: "2",
          age: "18",
          contact: "13554111308",
          lastest: "2020年6月20几号来武汉",
          wx: "augus003",
          note: "已有同事跟进",
          idcard: "429004199408203243",
          education: "本科",
          partner: "",
          company: "华为",
          partnership: "1",
          dock_ally: "大众行",
          dock_channel: "",
          mode: "1",
          staff: "张三",
          status: "6",
          workdays: "122",
          contract: "2",
          bankcard: "6226263658971412",
          situation: "3",
          routine: "",
        },
      ],
      searchForm: {
        username: "",
        phone: "",
        idcard: "",
        sex: "0",
        wx: "0",
        company: "",
        dock_ally: "0",
        dock_channel: "0",
        company: "",
        date: [
          new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date(),
        ],
        mode: "0",
        condition: "0",
        contract: "0",
        bankcard: "0",
      },
      searchRule: {
        date: [
          {
            type: "array",
            required: true,
            message: "请选择日期区间",
            trigger: "change",
            fields: {
              0: { type: "date", required: true, message: "请选择开始日期" },
              1: { type: "date", required: true, message: "请选择结束日期" },
            },
          },
        ],
      },
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
      sexOptions: sexOptions,
      wxOptions: wxOptions,
      workmodeOptions: workmodeOptions,
      entryOptions: entryOptions,
      situateOptions: situateOptions,
      contractOptions: contractOptions,
      bankcardOptions: [
        {
          value: "0",
          label: "全部",
        },
        {
          value: "1",
          label: "有银行卡",
        },
        {
          value: "2",
          label: "无银行卡",
        },
      ],
      hList: [
        {
          num: 89,
          label: "今天入职",
        },
        {
          num: 829,
          label: "本周入职",
        },
        {
          num: 8229,
          label: "本月入职",
        },
        {
          num: 34,
          label: "今日离职",
        },
        {
          num: 189,
          label: "本周离职",
        },
        {
          num: 1189,
          label: "本月离职",
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
      //跟进动态
      showFollow: false,
      followUser: {},
      //编辑
      editDialogVisible: false,
      editForm: {},
      editRule: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        contact: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          {
            pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
            message: "手机号格式不对",
          },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          {
            pattern: /^\+?[1-9][0-9]*$/,
            message: "年龄必须为数字值",
            trigger: "blur",
          },
        ],
        wx: [
          {
            pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
            message: "6-20个字母、数字、下划线和减号，必须以字母开头",
            trigger: "blur",
          },
        ],
        idcard: [
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式不对",
            trigger: "blur",
          },
        ],
        company: [
          { required: true, message: "请选择面试企业", trigger: "change" },
        ],
        // date: [{ required: true, message: "请选择面试时间", trigger: "blur" }],
        // dock_ally: [
        //   { required: true, validator: validateDockAlly, trigger: "change" },
        // ],
        // dock_channel: [
        //   { required: true, validator: validateDockChannel, trigger: "change" },
        // ],
      },
    };
  },
  methods: {
    computeSex(sex) {
      let sexItem = this.sexOptions.find((item) => item.value == sex);
      return sexItem.label;
    },
    computeMode(mode) {
      let modeItem = this.workmodeOptions.find((item) => item.value == mode);
      return modeItem.label;
    },
    computeContract(contract) {
      let contractItem = this.contractOptions.find(
        (item) => item.value == contract
      );
      return contractItem.label;
    },
    computeSituate(situate) {
      let situatItem = this.situateOptions.find(
        (item) => item.value == situate
      );
      return situatItem.label;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.searchForm);
          console.log(
            this.$moment(this.searchForm.date[0]).format("YYYY-MM-DD"),
            this.$moment(this.searchForm.date[1]).format("YYYY-MM-DD")
          );
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    setCellColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "background-color: #F7F7F7;";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    sortChange(data) {
      console.log(data);
    },
    handleFollow(index, row) {
      console.log(index, row);
      this.showFollow = true;
      this.followUser = row;
    },
    closeFollow() {
      this.showFollow = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("删除后该用户信息返回到“个人资源库”，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除",
          });
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.editForm = row;
      this.editDialogVisible = true;
    },
    handleOperate(index, row) {
      console.log(index, row);
      let message = "";
      switch (row.status) {
        case "1":
          message = "确认到厂？";
          break;
        case "2":
          message = "确认安排面试？";
          break;
        case "4":
          message = "确认安排入职？";
          break;
        case "5":
          message = "确认完成入职？";
          break;
        default:
          break;
      }
      this.$confirm(message, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("已确认");
        })
        .catch(() => {
          console.log("已取消");
        });
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid, data) => {
        if (valid) {
          this.editDialogVisible = false;
        } else {
          console.log("error submit!!", data);
          return false;
        }
      });
    },
    submitQuit(formName) {
      this.$refs[formName].validate((valid, data) => {
        if (valid) {
          this.editDialogVisible = false;
        } else {
          console.log("error submit!!", data);
          return false;
        }
      });
    },
    closeEdit(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style lang="scss" scoped>
.onjob,
.el-container {
  height: 100%;
}

.table-box {
  padding-top: 0;
  padding-bottom: 0;

  .el-container,
  .el-main,
  .el-footer {
    padding: 0;
  }

  .table-title {
    padding-bottom: 15px;
    padding-left: 0;
    padding-right: 0;
    .item {
      width: 144px;
      height: 62px;
      text-align: center;
      border-radius: 5px;
      text-align: center;
      border: 1px solid rgba(187, 187, 187, 100);
      margin-right: 13px;
      margin-top: 15px;
      box-sizing: border-box;
      vertical-align: middle;
      position: relative;

      .cont {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 34px;

        .num {
          font-weight: bold;
        }
        .type {
          font-size: 12px;
          color: #a2a2a2;
        }
      }
    }
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }
}

.edit-form {
  .el-input {
    width: 222px;
  }
  .el-textarea {
    width: 444px;
  }
}
</style>