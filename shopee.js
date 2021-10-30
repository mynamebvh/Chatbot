const cheerio = require("cheerio");
var FormData = require("form-data");

const axios = require("axios");

const shopee = async (url, page = 0) => {
  try {
    let bodyFormData = new FormData();
    bodyFormData.append(
      "query",
      "https://www.shopeeanalytics.com/vn/ma-giam-gia.html",
    );

    bodyFormData.append("url", url);

    const response = await axios({
      method: "post",
      url: "https://apx.shopeeanalytics.com/voucher/",
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data;boundary=${bodyFormData._boundary}`,
      },
    });

    const price = response.data.data.product_info.price;
    const vouchers = response.data.data.vouchers;
    const listVoucher = [];

    if (!page) page = 0;
    let start = page * 10;
    let end = start + 10;
    vouchers.forEach((voucher, index) => {
      if (voucher.voucher_min_spend <= price) {
        let title = voucher.title.replace(/(<([^>]+)>)/gi, "");
        let timeStart = new Date(
          (voucher.voucher_start_time / 1000) * 1000,
        ).toLocaleString();

        listVoucher.push({
          text: `${title} - Mã là ${voucher.voucher_code} - Thời gian bắt đầu: ${timeStart}`,
        });
      }
    });

    let result = listVoucher.slice(start, end);

    if (result.length == 0) return [{ text: "Hết voucher rùi" }];
    return result;
  } catch (error) {
    console.log(error);
    return [{ text: "Link sản phẩm không hợp lệ" }];
  }
};

module.exports = shopee;
