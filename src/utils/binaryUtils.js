function binaryUtils() {
    const getBaseLog = (base, arg) => {
        return Math.log(arg) / Math.log(base);
    }

    const getPerfectWordSize = (byteLength) => {

    }

    const formatHexNumber = (hexAnswer) => {
        
    }

    const formatOctNumber = (octAnswer) => {
        
    }

    const formatAnswer = (answer) => {

        answer = answer.slice();        
        if (answer[0] === '0') {

            switch (answer[1]) {
                case 'x':
                case 'X':
                    return formatHexNumber(answer.slice(2));
                    break;
                
                default:
                    return formatOctNumber(answer.slice(1));
            }
        } else {
            return formatBinaryNum(answer);
        }
    }
    
    const formatBinaryNum = (shortBinaryNumber) => {
        
        let binNumCharArr = [];
        let binNum = parseInt(shortBinaryNumber, 2);
        const sign = shortBinaryNumber >= 0 ? 1 : -1;
    
        // Edge cases,
        // since log isnt defined on argument 0
        // and log(1) is 0, so algorithm incorrectly assignd it 0 bytes
        if (binNum == 0) {
            return "00000000";
        } else if (binNum == 1){
            return "00000001";
        }

        let byteLength = Math.ceil(getBaseLog(2, Math.abs(binNum)) / 8);
        byteLength += sign == -1 ? 1 : 0;
        let wordSize = getPerfectWordSize(byteLength);
        
        do {
            if (binNum % 2 == 0) {
                binNumCharArr.push('0');
            } else {
                binNumCharArr.push('1');
            }
            binNum >>= 1; // Next bit position
        } while (binNum > 0);

        let bitsToFill = (byteLength * 8) - binNumCharArr.length;
        const leading_bit = sign == 1 ? '0' : '1';
        for (bitsToFill; bitsToFill > 0; bitsToFill--){
            binNumCharArr.push(leading_bit);
        }

        let binNumString = binNumCharArr.reverse().join("");
        return binNumString;
    } 

    return {
        formatBinaryNum
    };
}


export default binaryUtils;