<template>
  <div class="main-container ">
    <div class="body">
        <el-container class="container">
            <div class="container-content auth-main">
                <div class="main">
                    <component :is="'VLoginForm'" />
                </div>
            </div>
        </el-container>
    </div>
  </div>
</template>

<script>
import VLoginForm from '@/modules/Enter/Enter'

export default {
  name: 'Auth',
  components: {
    VLoginForm
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
      height: 100%;
      width: 100%;
      .body {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          .container {
              margin: auto;
              max-width: 500px;
              align-items: center;
              display: flex;
              .container-content {
                  margin: 15px 0;
                  margin-top: 0;
                  width: 100%;
                  .main {
                      padding: 20px;
                      background: #fff;
                      box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.06);
                      border-radius: 5px
                  }
              }
          }
      }
  }
</style>
