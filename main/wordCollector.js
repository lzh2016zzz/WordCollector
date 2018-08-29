/**
 * Module exports.
 */

module.exports = WordCollector;


function WordCollector() {
}

WordCollector.prototype.substr = function (str) {
    return Object.keys(new Int8Array(str.length)).map(Number);
};

WordCollector.prototype.sort = function (subStrIdxArray, str) {
    if (subStrIdxArray.length <= 0 || !str) return [];
    var pivotIndex = subStrIdxArray[Math.floor(subStrIdxArray.length / 2)];
    var pivot = str.substring(pivotIndex);
    var left = [];
    var right = [];
    var equal = [];
    for (var i = 0; i < subStrIdxArray.length; i++) {
        var compareValue = str.substring(subStrIdxArray[i]).localeCompare(pivot,'zh');
        if (compareValue < 0) left.push(subStrIdxArray[i]);
        else if (compareValue > 0) right.push(subStrIdxArray[i]);
        else equal.push(subStrIdxArray[i]);
    }
    return this.sort(left, str).concat(equal, this.sort(right, str));
} 

WordCollector.prototype.PATArray = function (str) {
    return this.sort(this.substr(str), str);
}

WordCollector.prototype.LCPArray = function (patArray, str) {
    var ret = [];
    if (patArray.length <= 0 || !str) return ret;
    for (var i = 0; i < patArray.length; ++i) {
        let lcp = 0;
        if (i == patArray.length - 1) {
            ret.push(lcp);
            break;
        }
        var str1 = str.substring(patArray[i]);
        var str2 = str.substring(patArray[i + 1]);
        for (var j = 0; j < str1.length; ++j) {
            if (str1.charAt(j) == str2.charAt(j)) lcp++;
            else break;
        }
        ret.push(lcp);
    }
    return ret;
}

WordCollector.prototype.scan = function (lcpArray, patArray, str, idx, minLen, maxLen) {
    var ret = [];
    for (var i = idx; i < lcpArray.length; ++i) {
        var lcp = lcpArray[i];
        var start = i + 1;
        if (lcp < minLen || i > 0 && lcpArray[i-1] == lcp) {
            continue;
        }
        else if(lcp > maxLen){
            lcp = maxLen;
        }
        var text = str.substring(patArray[i]).substring(0, lcp);
        var count = 0;
        var k = start;
        for (; k < lcpArray.length; ++k) {
            if (lcpArray[k] < lcp) {
                count = k - i + 1;
                var x = 1;
                while (i != 0 && lcpArray[i - x] > lcp) {
                    ++count;
                    ++x;
                }
                break;
            }
        }
        ret.push({
            'idx': i,
            'text': text,
            'count': count,
        });
    }
    return ret;
}

WordCollector.prototype.merge = function(){
    
}