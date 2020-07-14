// ==UserScript==
// @name         Akuvox Gitlab AutoComplete Template
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       phoenixylf
// @match        http://192.168.13.20/*
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    // Your code here...

    window.onload = function(){
        //1、PR提交 模板
        var prStr ="# StoryXXX 或 BugXXX 或 一句话说明原因\n"+
            "\n"+
            "## 修改原因描述\n"+
            "**[需求设计]:**\n"+
            "\n"+
            "请在这里写需求设计, 可直接贴wiki地址(如果有), 简单的也可以直接描述\n"+
            "\n"+
            "**[问题修复描述]:** \n"+
            "\n"+
            "请在这里写问题分析, 可直接贴wiki地址(如果有), 简单的也可以直接描述\n"+
            "\n"+
            "## 自测范围描述\n"+
            "请在这里简要描述自己的自测流程\n"+
            "\n";
        //alert(1);
        var element_merge_request = document.getElementById("merge_request_description")
        if(element_merge_request != null){
            element_merge_request.value=prStr;
            element_merge_request.style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 305px;"
        }else{
            // alert("null merge request")
        }


//2、普通需求或bug commit 模板
        var commitStr = "# 标题, 最简洁的描述具体提交的原因, 每次提交只允许写一个,\n"+
            "# M: 修复了啥\n"+
            "# O: 优化了啥\n"+
            "# A: 新增了啥\n"+
            "# C: 定制了啥\n"+
            "# R: 回退了啥\n"+
            "# 如S-XXX-A, B-XXX-M\n"+
            "# 请控制在一行以内, 即不允许多个需求/bug一起提交\n"+
            "\n"+
            "# 提交的备注, 描述原因, 修改文件等, 如有多个, 请用1. 2.序号标出\n"+
            "Modified:\n"+
            "\n"

        //alert(2)
        function getCommitId(){
            var elements = document.getElementsByName("commit_message"), item;
            for (var i = 0, len = elements.length; i < len; i++) {
                item = elements[i];
                if (item.id && item.id.indexOf("commit_message-") == 0) {
                    // item.id starts with commit_message-
                    //alert(item.id)
                    return item.id;
                }
            }
        }
        var commitId = getCommitId();
        var element_commit = document.getElementById(commitId)
        if(element_commit != null){
            element_commit.value=commitStr;
            element_commit.rows=12;
        }else{
            //alert("commit is null");
        }


//3、展开PR合并请求中的（相当于点击按钮展开）
        var prCommitExpandButton = document.getElementsByClassName("commit-edit-toggle")[0];
        var isRight = document.getElementsByClassName("s16 ic-chevron-right").length;
        //存在按钮且图标是向右，则表示为未展开时进行点击达到展开的效果。
        // alert(isRight);
        if(prCommitExpandButton != null && isRight == 1){
            //alert(prCommitExpandButton.aria-label)
            prCommitExpandButton.click()
        }

        var prCommitMsgTextArea = document.getElementById("merge-message-edit")

        var timer = null;
        var defaultPrCommitMsg
        function startTimer(){
            timer = setInterval(checkChange,100)
        }

        function closeTimer(){
            //alert("timer is close")
            if(timer != null){
                clearInterval(timer);
                timer = null
            }
        }

        function checkChange() {
            //alert("timer is start")
            if(prCommitMsgTextArea.value != defaultPrCommitMsg){
                //alert(prCommitMsgTextArea.value)
                prCommitMsgTextArea.value = defaultPrCommitMsg;
            }
        }

        if(prCommitMsgTextArea != null){

            var msg = prCommitMsgTextArea.value
            if(msg != null){
                //返回一个数组，判断数组的长度，大于3，取第三行数据为title
                var msg_split_lists = msg.split("\n");
                //alert(msg_split_lists.length)
                if(msg_split_lists.length > 3){
                    var title = msg_split_lists[2];
                    //重新组装成一个填充模板
                    var prCommitMsg = title +"\n"+
                        "\n"+
                        "Modified:\n"+
                        "1. PR审核通过\n";
                    //再次填充内容
                    prCommitMsgTextArea.value = prCommitMsg;
                    defaultPrCommitMsg = prCommitMsg
                    startTimer(prCommitMsgTextArea)
                }

            }
            //alert("title = "+title);

        }else{
            //alert("pr commit msg is null")
            closeTimer()
        }

//4、PR 审核模板
        var prExamineAndVerifyStr="| PR检查项目 | 是否具备 |\n"+
            "| :------------: | :------------: |\n"+
            "| 修改原因描述 | √/× |\n"+
            "| 自测范围描述 | √/× |\n"+
            "| 代码命名规范 | √/× |\n"+
            "| 逻辑检查 | √/× |\n"+
            "\n"+
            "结论: PR审核通过/PR审核不通过\n"+
            "\n";

        var element_pr_examine_and_verify = document.getElementById("note-body")
        if(element_pr_examine_and_verify != null){
            element_pr_examine_and_verify.value=prExamineAndVerifyStr;
            element_pr_examine_and_verify.style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 210px;"
        }else{

            // alert("null merge request")
        }

    }

})();

