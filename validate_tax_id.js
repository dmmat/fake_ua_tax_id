export function validate_tax_id(tax_id, birthday, gender) {
  tax_id = tax_id.replace(/[^0-9+]/gi, '');
  gender = (gender === "MALE" || gender === 1 || gender === "1") ? 1 : 0;
  let errors = [];
  let d, h, tax_id_gender, f, c, b, e;
  if (10 === tax_id.length) {
    d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    tax_id_gender = tax_id.substr(8, 1) % 2 ? 1 : 0;
    if (tax_id_gender !== gender) errors.push('invalid gender');
    for (c = tax_id.substr(0, 5), e = 1900, f = h = 1; 0 < c;) {
      b = 0 === e % 4 && 0 !== e % 100 || 0 === e % 400 ? 366 : 365;
      if (c > b) {
        c -= b;
        e++;
      } else {
        for (366 === b && (d[1] = 29), b = 0; 12 > b; b++) if (c > d[b]) {
          c -= d[b];
          f++
        } else {
          h = c;
          c = 0;
          break
        }
      }
    }
    d = f;
    c = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
    for (b = f = 0; 9 > b; b++) f += Number(tax_id[b]) * c[b];
    let v_tax_id = Number(tax_id[9]) === f % 11 % 10;
    if (!v_tax_id) errors = ['invalid code'];
    else {
      let tax_birthday = (10 > h ? "0" : "") + h + "." + (10 > d ? "0" : "") + d + "." + e;
      if (tax_birthday !== birthday) errors.push('invalid birth date');
    }
    return errors.length ? {errors: errors, valid: false} : {valid: true}

  } else return {valid: false, errors: ''}
}