import {fake_tax_id} from "./fake_tax_id.js";

window.generate = () => {
  const data = new FormData(document.querySelector('form'));
  const result = document.getElementById('result');
  try {
    result.value = fake_tax_id(data.get('gender'), data.get('date'));
  } catch (e) {
    alert(e)
  }
};