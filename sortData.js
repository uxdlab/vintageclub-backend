import { parse } from "node-html-parser";

export default function SortData(data, category) {
  var obj = [];
  const arr = data.products;

  arr.forEach((e) => {
    const product_id = e.id;
    const name = e.title;
    const url = `https://vintage-club-uk.myshopify.com/admin/products/${e.id}`;
    const img = e.image.src;
    var code = "";

    // Product Code Extraction Happens Here
    const text = e.body_html;
    var arr2 = text.split('<br data-mce-fragment="1">').join("<br>");
    arr2 = arr2.split("<p>").join("<br>");
    arr2 = arr2.split("<br>");

    arr2.forEach((el) => {
      switch (category) {
        case "Vintage":
          if (el.includes("VCUK")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          } else if (el.includes("RRUK")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          } else if (el.includes("TMUK")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          } else if (el.includes("VC")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          } else if (el.includes("TV")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          }

          break;

        case "Teddys":
          if (el.includes("TV")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          }

          break;

        case "Rework":
          if (el.includes("VCUK")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          } else if (el.includes("RWUK")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          } else if (el.includes("VC")) {
            const temp1 = parse(el);
            code = temp1.innerText;
          }

          break;
      }
    });

    // Removed Product Code Blank Spaces
    code = code.replace(/\s+/g, "");

    // Teddy's Products Flagged Uncategorized
    if (code === "TV") code = "Uncategorized";

    // Rework Products Flagged Uncategorized
    if (code === "RWUK" || code === "RWUK:") code = "Uncategorized";

    // Products Flagged as Uncategorized
    if (code === "") code = "Uncategorized";

    obj.push({
      product_id,
      name,
      url,
      img,
      code,
      category,
    });
  });

  return obj;
}
