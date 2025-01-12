import { fake_tax_id } from "./fake_tax_id.js";

window.generate = () => {
  const data = new FormData(document.querySelector("form"));
  const result = document.getElementById("result");
  const unzr = document.getElementById("unzr");
  try {
    result.value = fake_tax_id(data.get("gender"), data.get("date"));
    unzr.value =
      data.get("date").split(".").reverse().join("") +
      "-" +
      String(Math.floor(10000 + Math.random() * 90000));
  } catch (e) {
    alert(e);
  }
};

window.copyResult = () => {
  const result = document.getElementById("result");
  result.select();
  document.execCommand("copy");
};

window.clearResult = () => {
  const result = document.getElementById("result");
  result.value = "";
};

window.copyUNZR = () => {
  const result = document.getElementById("unzr");
  const unzr = result.value.split(" ")[0];
  navigator.clipboard.writeText(unzr);
};
