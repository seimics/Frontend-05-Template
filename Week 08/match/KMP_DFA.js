// DFA算法参考了  @link http://www.cnblogs.com/courtier/p/4273193.html
let dfa = [];

function KMP(pat) {
    let R = 256;
    let pattern = pat;
    let M = pattern.length;
    for (let i = 0; i < R; i++) {
        dfa[i] = [];
        for (let j = 0; j < M; j++) {
            dfa[i][j] = 0;
        }
    }
    let res = [];

    dfa[parseInt(pattern.charCodeAt(0))][0] = 1;
    for (let X = 0, j = 1; j < M; j++) {
        for (let c of pattern) {
            dfa[c.charCodeAt()][j] = dfa[c.charCodeAt()][X];
        }
        dfa[pattern.charCodeAt(j)][j] = j + 1;
        X = dfa[pattern.charCodeAt(j)][X];
        res[j] = X;
    }
    //console.log(res.toString());
}


function match(string, pattern) {
    KMP(pattern);
    let start = 0;
    let end = pattern.length;
    let state = start;
    for (let c of string) {
        state = dfa[c.charCodeAt()][state];
    }
    return state === end;
}

console.log(match("abcdabababx", "abababx"));