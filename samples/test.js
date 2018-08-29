var WordCollector = require("../main/wordCollector");//test

var collector = new WordCollector();
var str = "人民日报(People Daily)是中国共产党中央委员会机关报。1948年6月15日在河北省平山县里庄创刊，由《晋察冀日报》和晋冀鲁豫《人民日报》合并而成，为华北中央局机关报，同时担负党中央机关报职能。毛泽东同志亲笔为人民日报题写报名。l949年3月15日，人民日报随中央机关迁入北平。同年8月1日，中共中央决定人民日报为中国共产党中央委员会机关报，并沿用l948年6月l5日的期号";
var pat = collector.PATArray(str);
var lcp = collector.LCPArray(pat, str);
var res = collector.scan(lcp, pat, str, 0, 2, 4);
console.log("patArray:" + pat);
// pat.forEach((e, i, a) => {
//     console.log("pat_" + i + "_:" + str.substring(e));
// })

// lcp.forEach((e, i, a) => {
//     console.log("lcp_" + i + "_:" + e);
// })

res.forEach((e, i, a) => {
    console.log("res_" + i + "_:" + JSON.stringify(e));
});
/**
 * 
output:
res_0_:{"idx":17,"text":"15日","count":2}
res_1_:{"idx":25,"text":"5日","count":3}
res_2_:{"idx":28,"text":"6月","count":2}
res_3_:{"idx":30,"text":"8年6月","count":2}
res_4_:{"idx":34,"text":"94","count":3}
res_5_:{"idx":43,"text":"l94","count":2}
res_6_:{"idx":55,"text":"中央","count":6}
res_7_:{"idx":57,"text":"中央","count":5}
res_8_:{"idx":59,"text":"中央机关","count":2}
res_9_:{"idx":67,"text":"人民日报","count":5}
res_10_:{"idx":72,"text":"会机关报","count":2}
res_11_:{"idx":75,"text":"党中央","count":3}
res_12_:{"idx":81,"text":"关报，","count":2}
res_13_:{"idx":82,"text":"关报","count":4}
res_14_:{"idx":113,"text":"央机关","count":2}
res_15_:{"idx":124,"text":"年6月","count":2}
res_16_:{"idx":132,"text":"报，","count":2}
res_17_:{"idx":136,"text":"报》","count":2}
res_18_:{"idx":144,"text":"日，","count":2}
res_19_:{"idx":147,"text":"日报","count":6}
res_20_:{"idx":148,"text":"日报》","count":2}
res_21_:{"idx":149,"text":"日报","count":5}
res_22_:{"idx":158,"text":"月15日","count":2}
res_23_:{"idx":159,"text":"月1","count":3}
res_24_:{"idx":163,"text":"机关报，","count":2}
res_25_:{"idx":164,"text":"机关报","count":4}
res_26_:{"idx":166,"text":"机关","count":5}
res_27_:{"idx":169,"text":"民日报","count":5} 
*/