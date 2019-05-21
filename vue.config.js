const bgColor = process.env.VUE_APP_BG_COLOR
  ? process.env.VUE_APP_BG_COLOR
  : '#F9F9F9';

const logo = process.env.VUE_APP_LOGO
  ? process.env.VUE_APP_LOGO
  : 'https://s3.us-east-2.amazonaws.com/airpay-network/fourcoop_logo.png';

const mainColor = process.env.VUE_APP_MAIN_COLOR
  ? process.env.VUE_APP_MAIN_COLOR
  : '#107CFF';

const name = process.env.VUE_APP_NAME ? process.env.VUE_APP_NAME : 'fourcoop';
const network = process.env.VUE_APP_NETWORK
  ? process.env.VUE_APP_NETWORK
  : 'ropsten';

const fav = process.env.VUE_APP_FAV
  ? process.env.VUE_APP_FAV
  : 'https://s3.us-east-2.amazonaws.com/airpay-network/fourcoop_fav.png';
const kycApi = process.env.VUE_APP_KYCAPI
  ? process.env.VUE_APP_KYCAPI
  : 'https://kyc.airpay.network';
module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0].VUE_APP_NAME = JSON.stringify(name);
      args[0].VUE_APP_KYCAPI = JSON.stringify(kycApi);
      args[0].VUE_APP_FAV = JSON.stringify(fav);
      args[0].VUE_APP_NETWORK = JSON.stringify(network);
      args[0].VUE_APP_LOGO = JSON.stringify(logo);
      args[0].VUE_APP_MAIN_COLOR = JSON.stringify(mainColor);
      args[0].VUE_APP_BG_COLOR = JSON.stringify(bgColor);
      args[0].SIGNATURE_UPLOAD_KYC = JSON.stringify('upload kyc');
      args[0].SIGNATURE_STATUS_KYC = JSON.stringify('get status');
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        data: `$--color-primary: ${mainColor}; $bg-color: ${bgColor};`
      }
    }
  }
};
