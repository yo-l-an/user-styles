// alpha(c.accent, 38.4)    -> '#25438562'  opacity in percent, 0-100 (decimals allowed)
// alpha(c.accent, '0x62')  -> '#25438562'  opacity as a hex byte, 0x00-0xff
function alpha(color, amount) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) throw new Error(`alpha() needs a 6-digit color, got ${color}`);
  let byte;
  if (typeof amount === 'string') {
    if (!/^0x[0-9a-f]{2}$/i.test(amount)) throw new Error(`alpha() hex opacity must look like '0x62', got '${amount}'`);
    byte = parseInt(amount.slice(2), 16);
  } else {
    if (typeof amount !== 'number' || !(amount >= 0 && amount <= 100)) throw new Error(`alpha() percent must be 0-100, got ${amount}`);
    byte = Math.round((amount / 100) * 255);
  }
  return color + byte.toString(16).padStart(2, '0');
}

module.exports = { alpha };
