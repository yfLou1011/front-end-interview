# 在macOS里安装Python3

## 安装homebrew
    ```git
	/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
    ```
## 安装软件包python pkg
    1. brew install python3
    2. 官网下载 https://www.python.org/
   
## 进入终端，配置Python3 环境变量 
    1. 修改 .bash_profile 文件

        vi ~/.bash_profile   //编辑bash_profile
 
        ``` javascript
            # Setting PATH for Python 3.7
            # The orginal version is saved in .bash_profile.pysave

            PATH="/Library/Frameworks/Python.framework/Versions/3.7/bin:${PATH}"
            export PATH     

            //增加这几行内容（如果不是通过brew,而是通过官网下载安装，这里会默认已经添加了，就退出不用修改了   
        ```

    2. 修改 .bashrc 文件

        sudo vi ~/.bashrc  

        ``` javascript
            alias python2='/System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7'

            alias python3='/Library/Frameworks/Python.framework/Versions/3.9/bin/python3.9'

            alias python=python3     
        ```
    3. 使以上修改文件生效
        source ~/.bash_profile
        source ~/.bashrc
        
    4. 然后查看当前python版本
        python -V