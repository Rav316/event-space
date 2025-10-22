package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

func handler(w http.ResponseWriter, r *http.Request) {
	text := r.URL.Query().Get("text")
	if text == "" {
		text = "Placeholder"
	}

	widthStr := r.URL.Query().Get("w")
	heightStr := r.URL.Query().Get("h")
	width, _ := strconv.Atoi(widthStr)
	height, _ := strconv.Atoi(heightStr)
	if width == 0 {
		width = 300
	}
	if height == 0 {
		height = 300
	}

	bgColor := "#DDDDDD"
	textColor := "#999999"
	fontSize := 22

	svg := fmt.Sprintf(`
		<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d">
			<rect width="100%%" height="100%%" fill="%s"/>
			<text x="50%%" y="50%%"
				text-anchor="middle"
				dominant-baseline="middle"
				fill="%s"
				font-family="Segoe UI, Helvetica, Arial, sans-serif"
				font-size="%d"
				font-weight="bold"
			>%s</text>
		</svg>`, width, height, bgColor, textColor, fontSize, text)

	w.Header().Set("Content-Type", "image/svg+xml; charset=utf-8")
	w.Header().Set("Cache-Control", "no-cache")
	_, _ = w.Write([]byte(svg))
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("Listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
