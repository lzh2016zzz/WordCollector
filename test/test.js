var WordCollector = require("./wordCollector");//test

var collector = new WordCollector();
var str = "近日，习近平总书记作出重要指示指出，我国学生近视呈现高发、低龄化趋势，严重影响孩子们的身心健康，这是一个关系国家和民族未来的大问题，必须高度重视，不能任其发展。全社会都要行动起来，共同呵护好孩子的眼睛，让他们拥有一个光明的未来。";
var pat = collector.PATArray(str);
var lcp = collector.LCPArray(pat, str);
var res = collector.scan(lcp, pat, str, 0, 2, 10);
console.log("patArray:" + pat);
pat.forEach((e, i, a) => {
    console.log("pat_" + i + "_:" + str.substring(e));
})

lcp.forEach((e, i, a) => {
    console.log("lcp_" + i + "_:" + e);
})

res.forEach((e, i, a) => {
    console.log("res_" + i + "_:" + JSON.stringify(e));
});