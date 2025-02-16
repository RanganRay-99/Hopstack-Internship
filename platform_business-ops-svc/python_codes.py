import re
from flask import Flask, request

app = Flask(__name__)
@app.route('/')
def checkNum(num):
    if re.search(r'[0-9]', num):
        return True
    else:
        return False

def incrementValue(value):
    if checkNum(value):
        intValue = int(value)
        nextValue = intValue + 1
        padding = len(value) - len(str(nextValue))
        if padding >= 0:
            return '0' * padding + str(nextValue)
        else:
            return str(nextValue)
    else:
        alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        base = len(alphabet)
        digits = [alphabet.index(c) for c in value]
        carry = 1
        for i in range(len(digits) - 1, -1, -1):
            sum = digits[i] + carry
            digits[i] = sum % base
            carry = sum // base
            if carry == 0:
                break
        if carry > 0:
            digits.insert(0, carry)
        return ''.join([alphabet[i] for i in digits])

@app.route('/')
def index():
    floorStart = str(request.args.get('floorStart', ''))
    floorEnd = str(request.args.get('floorEnd', ''))
    zoneStart = str(request.args.get('zoneStart', ''))
    zoneEnd = str(request.args.get('zoneEnd', ''))
    aislesStart = str(request.args.get('aislesStart', ''))
    aislesEnd = str(request.args.get('aislesEnd', ''))
    rowStart = str(req.query.get('rowStart', ''))
    rowEnd = str(req.query.get('rowEnd', ''))
    columnStart = str(req.query.get('columnStart', ''))
    columnEnd = str(req.query.get('columnEnd', ''))
    subpalletStart = str(req.query.get('subpalletStart', ''))
    subpalletEnd = str(req.query.get('subpalletEnd', ''))
    separator = str(req.query.get('separator', '-'))

    if checkNum(floorEnd):
        floorEnd = int(floorEnd)
    if checkNum(zoneEnd):
        zoneEnd = int(zoneEnd)
    if checkNum(aislesEnd):
        aislesEnd = int(aislesEnd)
    if checkNum(rowEnd):
        rowEnd = int(rowEnd)
    if checkNum(columnEnd):
        columnEnd = int(columnEnd)
    if checkNum(subpalletEnd):
        subpalletEnd = int(subpalletEnd)

    codes = []
    for floor in range(floorStart, floorEnd + 1):
        for zone in range(zoneStart, zoneEnd + 1):
            for aisle in range(aislesStart, aislesEnd + 1):
                for row in range(rowStart, rowEnd + 1):
                    for column in range(columnStart, columnEnd + 1):
                        for(let subpallet = subpalletStart; subpallet <= subpalletEnd ; subpallet = incrementValue(subpallet):
                            let code = ""
                            if floorStart) code += floor + separator
                            if zoneStart) code += zone + separator
                            if aislesStart) code += aisle + separator
                            if rowStart) code += row + separator
                            if columnStart) code += column + separator
                            if subpalletStart) code += subpallet
                            codes.append({ CODE: code })
                        }
                    }
                }
            }
        }
    }

    res.json(codes)
})

module.exports = router;