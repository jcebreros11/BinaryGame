

function binaryUtils(){
    const getBaseLog = (base, arg)  => {
        return Math.log(arg) / Math.log(base);
    }
    
    const  formatBinaryNum = (shortBinaryNumber) => {
        let binNumCharArr = [];
        let binNum = parseInt(shortBinaryNumber, 2);
    
        if (binNum == 0) {
            return "00000000";
        } else if (binNum == 1){
            return "00000001";
        }


        let byteSize = Math.ceil(getBaseLog(256, binNum));
        
        do {
            if (binNum % 2 == 0) {
                binNumCharArr.push('0');
            } else {
                binNumCharArr.push('1');
            }
            binNum >>= 1; // Next bit position
        } while (binNum > 0);

        let bitsToFill = (byteSize * 8) - binNumCharArr.length;
        for (bitsToFill; bitsToFill > 0; bitsToFill--){
            binNumCharArr.push('0');
        }

        let binNumString = binNumCharArr.reverse().join("");
        return binNumString;

    } 

    return {
        formatBinaryNum
    };


}


export default binaryUtils;