/**
 * Created with IntelliJ IDEA.
 * User: smclean
 * Date: 9/22/12
 * Time: 11:42 AM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    var value=window.dialogArguments;
    // 1. Compile template function
    var tempFn = doT.template("<h1>Here is a sample template {{=it.foo}}</h1>");
// 2. Use template function as many times as you like
    var resultText = tempFn({foo: 'with doT'});
});