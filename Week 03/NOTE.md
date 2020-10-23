# 学习笔记 

AST 抽象语法树的第一个特点为:不依赖于具体的文法。无论是LL(1)文法，还是LR(1)，或者还是其它的方法，都要求在语法分析时候，构造出相同的语法树，这样可以给编译器后端提供了清晰，统一的接口。即使是前端采用了不同的文法，都只需要改变前端代码，而不用连累到后端。即减少了工作量，也提高的编译器的可维护性。

抽象语法树的第二个特点为:不依赖于语言的细节。在编译器家族中，大名鼎鼎的gcc算得上是一个老大哥了，它可以编译多种语言，例如c，c＋＋，java，ADA，Object C， FORTRAN， PASCAL， COBOL等等。在前端gcc对不同的语言进行词法，语法分析和语义分析后，产生抽象语法树形成中间代码作为输出，供后端处理。要做到这一点，就必须在构造语法树时，不依赖于语言的细节，例如在不同的语言中，类似于if－condition－then这样的语句有不同的表示方法

LL 第一个“L”：left to right，按照从左到右的顺序处理输入的token序列
第二个“L”：leftmost derivation，从文法的最左边开始进行推导

```
<Expression>::=
    <AdditiveExpression><EOF>

<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

regexp.exec()
result[0]：匹配值。 
result[1],…[n]：根据正则表达式中对应捕获组，在匹配值中出现的值。

末尾添加一个EOF
使用递归分析每个node
在遇到AdditiveExpression时加减号后的MultiplicativeExpression需要调用一次MultiplicativeExpression(source);
最终结果时单节点的Object

