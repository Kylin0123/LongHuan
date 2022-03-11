# !/bin/bash
version="1.0"
ARGS=`getopt -a -o APUhV -l all,package,upload,help,version -- "$@"`
function usage() {
    echo "选项：
 -A, -all                   一条龙服务
 -U, --upload             上传到服务器
 -h, --help               输出帮助信息
 -V, --version            输出版本信息"
}
[ $? -ne 0 ] && usage
#set -- "${ARGS}"
eval set -- "${ARGS}"
while true
do
      case "$1" in
       -A|--all)
       	mvn package
       	scp -P 123 target/longhuan-0.0.1-SNAPSHOT.jar czq@114.212.83.55:/home/czq/apps/longhuan
       	;;
	  -P|--package)
	          mvn package
			  ;;
      -U|--upload)
			  scp -P 123 target/longhuan-0.0.1-SNAPSHOT.jar czq@114.212.83.55:/home/czq/apps/longhuan
			  ;;
      -h|--help)
              usage
              ;;
	  -V|--version)
	          echo "version: v${version}"
			  ;;
      --)
              shift
              break
              ;;
      esac
shift
done