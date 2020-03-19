until node bin/main.js; do
	echo "Crashed with exit code $?"
	sleep 1
done
