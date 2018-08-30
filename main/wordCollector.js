/**
 * Module exports.
 */

module.exports = WordCollector;


function WordCollector() {
}

/**
 * 获取后缀数组
 * @param {*} str 源文本
 */
WordCollector.prototype.substr = function (str) {
    return Object.keys(new Int8Array(str.length)).map(Number);
};

/**
 * 对后缀数组进行字典序排序
 * @param {*} subStrIdxArray 后缀数组 
 * @param {*} str 源文本
 */
WordCollector.prototype.sort = function (subStrIdxArray, str) {
    if (subStrIdxArray.length <= 0 || !str) return [];
    let pivotIndex = subStrIdxArray[Math.floor(subStrIdxArray.length / 2)];
    let pivot = str.substring(pivotIndex);
    let left = [];
    let right = [];
    let equal = [];
    for (let i = 0; i < subStrIdxArray.length; i++) {
        let compareValue = str.substring(subStrIdxArray[i]).localeCompare(pivot,'zh');
        if (compareValue < 0) left.push(subStrIdxArray[i]);
        else if (compareValue > 0) right.push(subStrIdxArray[i]);
        else equal.push(subStrIdxArray[i]);
    }
    return this.sort(left, str).concat(equal, this.sort(right, str));
} 

/**
 * 获取pat数组
 * @param {*} str 源文本
 */
WordCollector.prototype.PATArray = function (str) {
    return this.sort(this.substr(str), str);
}

/**
 * 
 * @param {*} patArray pat数组
 * @param {*} str 源文本
 */
WordCollector.prototype.LCPArray = function (patArray, str) {
    let ret = [];
    if (patArray.length <= 0 || !str) return ret;
    for (let i = 0; i < patArray.length; ++i) {
        let lcp = 0;
        if (i == patArray.length - 1) {
            ret.push(lcp);
            break;
        }
        let str1 = str.substring(patArray[i]);
        let str2 = str.substring(patArray[i + 1]);
        for (let j = 0; j < str1.length; ++j) {
            if (str1.charAt(j) == str2.charAt(j)) lcp++;
            else break;
        }
        ret.push(lcp);
    }
    return ret;
}

/**
 * 抽取高频词   
 * @param {} lcpArray lcp数组
 * @param {*} patArray pat数组
 * @param {*} str 源文本
 * @param {*} idx 起始位置
 * @param {*} minLen 最小长度
 * @param {*} maxLen 最大长度
 */
WordCollector.prototype.scan = function (lcpArray, patArray, str, idx, minLen, maxLen) {
    let ret = [];
    for (let i = idx; i < lcpArray.length; ++i) {
        let lcp = lcpArray[i] > maxLen ? maxLen : lcpArray[i];
        let last = lcpArray[i-1] > maxLen ? maxLen : lcpArray[i-1];
        let start = i + 1;
        if (lcp < minLen || i > 0 && lcp <= last) {
            continue;
        }
        let text = str.substring(patArray[i]).substring(0, lcp);
        let count = 0;
        let k = start;
        for (; k < lcpArray.length; ++k) {
            let next = lcpArray[k] > maxLen ? maxLen : lcpArray[k];
            if (next < lcp) {
                count = k - i + 1;
                let x = 1;
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