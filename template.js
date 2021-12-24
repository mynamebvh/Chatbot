module.exports = (arr, cre = "Nguồn báo dantri") => {
  let arrElement = [];

  arr.map((v) => {
    arrElement.push({
      title: v.title,
      image_url: v.img,
      subtitle: cre,
      buttons: [
        {
          type: "web_url",
          url: v.link,
          title: "Xem thêm",
        },
      ],
    });
  });

  return {
    messages: [
      {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            image_aspect_ratio: "square",
            elements: arrElement,
          },
        },
      },
    ],
  };
};
