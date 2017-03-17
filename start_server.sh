if [[ ! -e out/ ]];
		then
			mkdir out/
		fi 

		go build -o out/build app/priceWeb/main.go; ./out/build
