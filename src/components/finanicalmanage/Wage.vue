<template>
  <div id="finance-wage" class="finance-wage">
    <el-container>
      <el-header height="auto;">
        <el-form
          :inline="true"
          :model="searchForm"
          :hide-required-asterisk="true"
          ref="searchForm"
          size="medium"
        >
          <el-form-item label="求职者身份证号" prop="idcard">
            <el-input
              size="medium"
              placeholder="请输入身份证号"
              v-model="searchForm.idcard"
            ></el-input>
          </el-form-item>
          <el-form-item label="输送项目" prop="project">
            <el-select v-model="searchForm.project" placeholder="请选择">
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
          <el-form-item label="所属渠道" prop="channel">
            <el-select v-model="searchForm.channel" placeholder="请选择">
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
          <el-form-item>
            <el-button type="primary" @click="submitSearchForm('searchForm')"
              >搜索</el-button
            >
            <el-button type="warning" @click="resetSearchForm('searchForm')"
              >重置</el-button
            >
            <el-button type="success" @click="handleAdd">增加</el-button>
            <!-- <el-button type="danger" @click="handleImport">导入</el-button> -->
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-container>
          <el-main>
            <el-table
              style="width: 100%"
              height="100%"
              size="medium"
              border
              :data="tableData"
              show-summary
              :summary-method="getSummaries"
              :header-cell-style="{ backgroundColor: '#F7F7F7' }"
              :cell-style="setCellColor"
              :default-sort="{ prop: 'percent', order: 'descending' }"
              @sort-change="sortChange"
            >
              <el-table-column
                label="序号"
                type="index"
                width="54"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="project" label="项目" align="center">
              </el-table-column>
              <el-table-column prop="date" label="时间" align="center">
              </el-table-column>
              <el-table-column prop="name" label="姓名" align="center">
              </el-table-column>
              <el-table-column prop="level" label="工资级别" align="center">
              </el-table-column>
              <el-table-column
                prop="basic_wage"
                label="试用期工资"
                width="95"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="merit_pay" label="绩效工资" align="center">
              </el-table-column>
              <el-table-column
                prop="post_subsidy"
                label="岗位补贴"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="overtime_pay"
                label="加班补贴"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="night_subsidy"
                label="夜班补贴"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="full_attendance"
                label="全勤奖"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="meal_stickers" label="餐贴" align="center">
              </el-table-column>
              <el-table-column
                prop="attendance_supplement"
                label="考勤补款"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="total_subsidy"
                label="补贴合计"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="total_pay"
                label="应发合计"
                align="center"
              ></el-table-column>
              <el-table-column prop="absence" label="缺勤扣发" align="center">
              </el-table-column>
              <el-table-column prop="fault" label="过失扣款" align="center">
              </el-table-column>
              <el-table-column
                prop="water_and_electricity"
                label="水电费扣款"
                width="95"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="person_tax"
                label="个税"
                width="70"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="union_fees" label="工会费" align="center">
              </el-table-column>
              <el-table-column
                prop="commercial_insurance"
                label="商业险"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="net_salary"
                label="实发工资"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="note" label="备注" align="center">
                <template #default="scope">
                  {{ scope.row.note || "-" }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="130" align="center">
                <template #default="scope">
                  <el-space spacer="/">
                    <el-button
                      @click="handleEdit(scope.row, scope.$index)"
                      type="text"
                      >编辑</el-button
                    >
                    <el-button
                      @click="handleDelete(scope.row, scope.$index)"
                      type="text"
                      >删除</el-button
                    >
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
    <!-- 模态框 -->
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      @closed="closed('form')"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="auto"
        size="small"
        class="form"
      >
        <div class="module-block">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="工资月份" prop="date">
            <el-date-picker
              v-model="form.date"
              type="month"
              :clearable="false"
              placeholder="请选择"
              style="width: 215px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="所属项目" prop="project">
            <el-select v-model="form.project" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="module-block">
          <el-form-item label="工资级别" prop="level">
            <el-input v-model="form.level" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="试用期小时工资" prop="basic_wage">
            <el-input v-model="form.basic_wage" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="实际绩效工资" prop="merit_pay">
            <el-input v-model="form.merit_pay" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="岗位补贴" prop="post_subsidy">
            <el-input
              v-model="form.post_subsidy"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="加班工资" prop="overtime_pay">
            <el-input
              v-model="form.overtime_pay"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="module-block">
          <el-form-item label="夜班补贴" prop="night_subsidy">
            <el-input
              v-model="form.night_subsidy"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="全勤奖" prop="full_attendance">
            <el-input
              v-model="form.full_attendance"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="餐贴" prop="meal_stickers">
            <el-input
              v-model="form.meal_stickers"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="考勤补款" prop="attendance_supplement">
            <el-input
              v-model="form.attendance_supplement"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="补贴合计" prop="total_subsidy">
            <el-input
              v-model="form.total_subsidy"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="module-block">
          <el-form-item label="应发合计" prop="total_pay">
            <el-input v-model="form.total_pay" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
        <div class="module-block">
          <el-form-item label="缺勤扣发" prop="absence">
            <el-input v-model="form.absence" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="过失扣款" prop="fault">
            <el-input v-model="form.fault" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="水电费扣费" prop="water_and_electricity">
            <el-input
              v-model="form.water_and_electricity"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="个税" prop="person_tax">
            <el-input v-model="form.person_tax" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="工会费" prop="union_fees">
            <el-input v-model="form.union_fees" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商业险" prop="commercial_insurance">
            <el-input
              v-model="form.commercial_insurance"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="module-block">
          <el-form-item label="实发工资" prop="net_salary">
            <el-input v-model="form.net_salary" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
        <div class="module-block">
          <el-form-item label="备注" prop="note">
            <el-input
              v-model="form.note"
              type="textarea"
              :rows="3"
              maxlength="50"
              show-word-limit
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sexOptions: [
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
      ],
      searchForm: {
        idcard: "",
        project: "0",
        channel: "0",
      },
      tableData: [
        {
          project: "友徳",
          date: "2020-05",
          name: "左占义",

          level: "1750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "0",
          night_subsidy: "50",
          full_attendance: "50",
          meal_stickers: "500",
          attendance_supplement: "0",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "0",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "华工",
          date: "2020-05",
          name: "张三",

          level: "0", // (正式)工资级别
          basic_wage: "1750", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "30",
          night_subsidy: "0",
          full_attendance: "50",
          meal_stickers: "600",
          attendance_supplement: "0",

          absence: "10",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "美的",
          date: "2020-05",
          name: "李四",

          level: "2750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "300",
          overtime_pay: "0",
          night_subsidy: "0",
          full_attendance: "0",
          meal_stickers: "400",
          attendance_supplement: "50",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "友徳",
          date: "2020-05",
          name: "左占义",

          level: "1750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "0",
          night_subsidy: "50",
          full_attendance: "50",
          meal_stickers: "500",
          attendance_supplement: "0",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "0",
          union_fees: "5",
          commercial_insurance: "50",

          note: "银行卡号不对",
        },
        {
          project: "华工",
          date: "2020-05",
          name: "张三",

          level: "0", // (正式)工资级别
          basic_wage: "1750", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "30",
          night_subsidy: "0",
          full_attendance: "50",
          meal_stickers: "600",
          attendance_supplement: "0",

          absence: "10",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "友徳",
          date: "2020-05",
          name: "左占义",

          level: "1750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "0",
          night_subsidy: "50",
          full_attendance: "50",
          meal_stickers: "500",
          attendance_supplement: "0",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "0",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "华工",
          date: "2020-05",
          name: "张三",

          level: "0", // (正式)工资级别
          basic_wage: "1750", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "30",
          night_subsidy: "0",
          full_attendance: "50",
          meal_stickers: "600",
          attendance_supplement: "0",

          absence: "10",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "美的",
          date: "2020-05",
          name: "李四",

          level: "2750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "300",
          overtime_pay: "0",
          night_subsidy: "0",
          full_attendance: "0",
          meal_stickers: "400",
          attendance_supplement: "50",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "友徳",
          date: "2020-05",
          name: "左占义",

          level: "1750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "0",
          night_subsidy: "50",
          full_attendance: "50",
          meal_stickers: "500",
          attendance_supplement: "0",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "0",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "华工",
          date: "2020-05",
          name: "张三",

          level: "0", // (正式)工资级别
          basic_wage: "1750", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "30",
          night_subsidy: "0",
          full_attendance: "50",
          meal_stickers: "600",
          attendance_supplement: "0",

          absence: "10",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "美的",
          date: "2020-05",
          name: "李四",

          level: "2750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "300",
          overtime_pay: "0",
          night_subsidy: "0",
          full_attendance: "0",
          meal_stickers: "400",
          attendance_supplement: "50",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "友徳",
          date: "2020-05",
          name: "左占义",

          level: "1750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "0",
          night_subsidy: "50",
          full_attendance: "50",
          meal_stickers: "500",
          attendance_supplement: "0",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "0",
          union_fees: "5",
          commercial_insurance: "50",

          note: "已打款",
        },
        {
          project: "华工",
          date: "2020-05",
          name: "张三",

          level: "0", // (正式)工资级别
          basic_wage: "1750", // 试用期工资
          merit_pay: "300",
          post_subsidy: "123",
          overtime_pay: "30",
          night_subsidy: "0",
          full_attendance: "50",
          meal_stickers: "600",
          attendance_supplement: "0",

          absence: "10",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "",
        },
        {
          project: "美的",
          date: "2020-05",
          name: "李四",

          level: "2750", // (正式)工资级别
          basic_wage: "0", // 试用期工资
          merit_pay: "300",
          post_subsidy: "300",
          overtime_pay: "0",
          night_subsidy: "0",
          full_attendance: "0",
          meal_stickers: "400",
          attendance_supplement: "50",

          absence: "0",
          fault: "0",
          water_and_electricity: "0",
          person_tax: "10",
          union_fees: "5",
          commercial_insurance: "50",

          note: "已打款",
        },
      ],
      currentPage: 4,
      hideOnSinglePage: false,
      dialogVisible: false,
      dialogTitle: "",
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "不能为空",
          },
        ],
        date: [{ required: true, message: "不能为空" }],
        project: [{ required: true, message: "不能为空" }],
        level: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        basic_wage: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        merit_pay: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        post_subsidy: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        overtime_pay: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        night_subsidy: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        full_attendance: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        meal_stickers: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        attendance_supplement: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        total_subsidy: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        total_pay: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        absence: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        fault: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        water_and_electricity: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        person_tax: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        union_fees: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        commercial_insurance: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
        net_salary: [
          { required: true, message: "不能为空" },
          {
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            message: "请输入金额，最多 2 位小数",
          },
        ],
      },
    };
  },
  beforeMount() {
    this.tableData.forEach((item, index) => {
      this.tableData[index].total_subsidy = this.computedTotalSubsidy(item);
      this.tableData[index].total_pay = this.computedTotalPay(item);
      this.tableData[index].net_salary = this.computedNetSalary(item);
    });
  },
  methods: {
    submitSearchForm(formName) {
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
    resetSearchForm(formName) {
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
    computedTotalSubsidy(row) {
      let total =
        Number(row.post_subsidy) +
        Number(row.overtime_pay) +
        Number(row.night_subsidy) +
        Number(row.full_attendance) +
        Number(row.meal_stickers) +
        Number(row.attendance_supplement);
      return total.toFixed(2);
    },
    computedTotalPay(row) {
      let base =
        Number(row.level) + Number(row.basic_wage) + Number(row.merit_pay);
      let subsidy =
        Number(row.overtime_pay) +
        Number(row.night_subsidy) +
        Number(row.full_attendance) +
        Number(row.meal_stickers) +
        Number(row.attendance_supplement);
      let total = base + subsidy;
      return total.toFixed(2);
    },
    computedNetSalary(row) {
      let base =
        Number(row.level) + Number(row.basic_wage) + Number(row.merit_pay);
      let subsidy =
        Number(row.overtime_pay) +
        Number(row.night_subsidy) +
        Number(row.full_attendance) +
        Number(row.meal_stickers) +
        Number(row.attendance_supplement);
      let reduce =
        Number(row.absence) +
        Number(row.fault) +
        Number(row.water_and_electricity) +
        Number(row.person_tax) +
        Number(row.union_fees) +
        Number(row.commercial_insurance);
      let total = base + subsidy - reduce;
      return total.toFixed(2);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }

        let prop = column.property;
        if (
          ["project", "date", "name", "note"].findIndex(
            (item) => item === prop
          ) > -1
        ) {
          sums[index] = "";
          return;
        }

        let values = [];
        switch (prop) {
          case "total_subsidy":
            values = data.map((item) =>
              Number(this.computedTotalSubsidy(item))
            );
            break;
          case "total_pay":
            values = data.map((item) => Number(this.computedTotalPay(item)));
            break;
          case "net_salary":
            values = data.map((item) => Number(this.computedNetSalary(item)));
            break;
          default:
            values = data.map((item) => Number(item[prop]));
            break;
        }

        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + value;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    handleAdd() {
      this.dialogTitle = "增加项目工资";
      this.dialogVisible = true;
    },
    handleImport() {},
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("确认删除？", "提示", {
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
        .catch((err) => {
          console.log(err);
        });
    },
    handleEdit(row, index) {
      console.log(index, row);
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogTitle = "修改项目工资";
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          console.log("submit!", this.form);
          this.dialogVisible = false;
        } else {
          console.log("error submit!!", obj);
          return false;
        }
      });
    },
    closed(formName) {
      this.form = {};
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.finance-wage {
  height: 100%;

  .el-container {
    height: 100%;
  }

  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }

  .table-pagination {
    text-align: center;
    margin-top: 20px;
  }

  .form {
    padding: 0 20px;
    .el-input,
    .el-select,
    .el-textarea {
      width: 215px;
    }

    .module-block {
      border: 1px solid #eee;
      border-radius: 5px;
      background-color: #f7f7f7;
      margin-bottom: 10px;
      padding: 20px 20px 0;
    }
  }
}
</style>