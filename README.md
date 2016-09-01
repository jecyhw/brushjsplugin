# ucas简单的刷课脚本
chrome浏览器的刷课插件，支持单个页面刷多课程。在刷课过程中，如果再打开选课页面，该页面也会跟着自动进行刷课。
增加停止刷课(和继续刷课按钮是反操作)，继续刷课，结束刷课(会清除刷课的课程,继续刷课需要重新填写刷课的课程号)按钮。

使用方法：

1. 先下载该脚本插件，并解压
2. 打开chrome浏览器
3. 找到  更多工具->扩展程序
4. 选中“开发者模式”，然后点击“加载扩展程序”，选择第1步解压后的文件夹
5. 进入选课系统，选择院系后，直接输入要刷的课程号

注意事项：刷课的时候要确保所刷的课程和已选课程不冲突，否则刷上课但因为冲突导致刷课不成功并停止其他课程刷课；刷课过程中可能会出现页面刷不出来的现象，需要手动按f5刷新页面，或者返回选择课程页面，就会自动刷课。

不用时在浏览器的扩展程序中，把Enabled的选项的钩去掉，或者移除即可。

可以根据自己的需要修改js脚本和css文件，然后在chrome的扩展程序中重新加载该插件就能使用了

有问题可以发邮件到1147352923@qq.com
