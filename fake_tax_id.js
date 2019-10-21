import {validate_tax_id} from './validate_tax_id.js'

export function fake_tax_id(gender, date) {

  const generate = (gender, date) => {
    let result;
    let t_date = date.match(/(\d{2})\.(\d{2})\.(\d{4})/);
    if (!t_date) throw new Error('enter valid date in format dd.mm.yyyy');
    const birth_date = new Date(t_date[3], t_date[2] - 1, t_date[1]);
    if (format_date(birth_date) !== date) throw new Error('enter valid date');
    const diffTime = Math.abs(birth_date - new Date('1900-01-01'));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const _tax_id = {
      part1: diffDays + 1 + "",
      part2: getRandomInt(10, 99) + "",
      part3: getRandomInt(0, 9) + "",
      part4: gender === "MALE" ? "1" : "2"
    };
    _tax_id.part5 = _tax_id.part1[0] * (-1) + _tax_id.part1[1] * 5 + _tax_id.part1[2] * 7 + _tax_id.part1[3] * 9 + _tax_id.part1[4] * 4 + _tax_id.part2[0] * 6 + _tax_id.part2[1] * 10 + _tax_id.part3[0] * 5 + _tax_id.part4[0] * 7;

    result = _tax_id.part1 + _tax_id.part2 + _tax_id.part3 + _tax_id.part4 + Math.abs((_tax_id.part5 - Math.round(_tax_id.part5 / 11) * 11)) + '';
    if (validate_tax_id(result, date, gender).valid) return result;
    else return generate(gender, date);
  };

  return generate(gender, date);

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function format_date(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let yyyy = date.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return dd + '.' + mm + '.' + yyyy;
}