const express = require('express');
const router = express.Router();

function checkNum(num) {
    if(/[0-9]/.test(num)) {
      return true;
    }
    else {
      return false;
    }
}

function incrementValue(value) {
  if(checkNum(value)) {
    const intValue = parseInt(value);
    const nextValue = intValue + 1;
    const padding = value.length - nextValue.toString().length;
    if (padding >= 0) {
      return '0'.repeat(padding) + nextValue;
    } else {
      return nextValue.toString();
    }
  } else {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const base = alphabet.length;
    const digits = value.split('').map(c => alphabet.indexOf(c));
    let carry = 1;
    for (let i = digits.length - 1; i >= 0; i--) {
      const sum = digits[i] + carry;
      digits[i] = sum % base;
      carry = Math.floor(sum / base);
      if (carry === 0) break;
    }
    if (carry > 0) digits.unshift(carry);
    return digits.map(i => alphabet[i]).join('');
  }
}

router.get('/', (req, res) => {
    const floorStart = req.query.floorStart ? req.query.floorStart.toString() : "";
    let floorEnd = req.query.floorEnd ? req.query.floorEnd.toString() : "";
    const zoneStart = req.query.zoneStart ? req.query.zoneStart.toString() : "";
    let zoneEnd = req.query.zoneEnd ? req.query.zoneEnd.toString() : "";
    const aislesStart = req.query.aislesStart ? req.query.aislesStart.toString() : "";
    let aislesEnd = req.query.aislesEnd ? req.query.aislesEnd.toString() : "";
    const rowStart = req.query.rowStart ? req.query.rowStart.toString() : "";
    let rowEnd = req.query.rowEnd ? req.query.rowEnd.toString() : "";
    const columnStart = req.query.columnStart ? req.query.columnStart.toString() : "";
    let columnEnd = req.query.columnEnd ? req.query.columnEnd.toString() : "";
    const subpalletStart = req.query.subpalletStart ? req.query.subpalletStart.toString() : "";
    let subpalletEnd = req.query.subpalletEnd ? req.query.subpalletEnd.toString() : "";
    const separator = req.query.separator ? req.query.separator.toString() : "-";
  
    if(checkNum(floorEnd)) {
      floorEnd = parseInt(floorEnd);
    }
    if(checkNum(zoneEnd)) {
      zoneEnd = parseInt(zoneEnd);
    }
    if(checkNum(aislesEnd)) {
      aislesEnd = parseInt(aislesEnd);
    }
    if(checkNum(rowEnd)) {
      rowEnd = parseInt(rowEnd);
    }
    if(checkNum(columnEnd)) {
      columnEnd = parseInt(columnEnd);
    }
    if(checkNum(subpalletEnd)) {
      subpalletEnd = parseInt(subpalletEnd);
    }
  
    let codes = [];
    for(let floor = floorStart; floor <= floorEnd; floor = incrementValue(floor)) {
      for(let zone = zoneStart; zone <= zoneEnd; zone = incrementValue(zone)) {
        for(let aisle = aislesStart; aisle <= aislesEnd; aisle = incrementValue(aisle)) {
          for(let row = rowStart; row <= rowEnd; row = incrementValue(row)) {
            for(let column = columnStart; column <= columnEnd; column = incrementValue(column)) {
              for(let subpallet = subpalletStart; subpallet <= subpalletEnd ; subpallet = incrementValue(subpallet)) {
                let code = "";
                if (floorStart) code += floor + separator;
                if (zoneStart) code += zone + separator;
                if (aislesStart) code += aisle + separator;
                if (rowStart) code += row + separator;
                if (columnStart) code += column + separator;
                if (subpalletStart) code += subpallet;
                codes.push({ CODE: code });
              }
            }
          }
        }
      }
    }
  
    res.json(codes);
  });

module.exports = router;